import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: "Access Denied: Admin role required" }, { status: 403 });
    }

    // 1. Total sales & revenue (Paid orders only)
    const paidOrders = await db.order.findMany({
      where: { paymentStatus: "Paid" },
      include: { items: true },
    });

    const totalSales = paidOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrdersCount = paidOrders.length;

    // 2. Active subscriptions
    const activeSubsCount = await db.subscription.count({
      where: { status: "Active" },
    });

    // 3. Monthly revenue (orders in the current calendar month)
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const monthlyOrders = await db.order.findMany({
      where: {
        paymentStatus: "Paid",
        createdAt: {
          gte: firstDayOfMonth,
        },
      },
    });

    const monthlyRevenue = monthlyOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    // 4. Product sale popularities (total quantities sold per product)
    const orderItems = await db.orderItem.findMany({
      where: {
        order: {
          paymentStatus: "Paid",
        },
      },
      include: {
        product: true,
      },
    });

    const salesMap: { [key: string]: { name: string; count: number; color: string } } = {};
    
    // Seed with our default products in case no sales are recorded yet
    salesMap["aesthetic-blueprint"] = { name: "Aesthetic Blueprint", count: 0, color: "#00C2FF" };
    salesMap["collagen-glow"] = { name: "Collagen Glow", count: 0, color: "#FF3366" };

    for (const item of orderItems) {
      if (salesMap[item.productId]) {
        salesMap[item.productId].count += item.quantity;
      } else {
        salesMap[item.productId] = {
          name: item.product?.name || item.productId,
          count: item.quantity,
          color: item.productId === "collagen-glow" ? "#FF3366" : "#00C2FF",
        };
      }
    }

    const topProducts = Object.values(salesMap).sort((a, b) => b.count - a.count);

    return NextResponse.json({
      totalSales,
      totalOrdersCount,
      activeSubsCount,
      monthlyRevenue,
      topProducts,
    });
  } catch (error) {
    console.error("Admin analytics error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
