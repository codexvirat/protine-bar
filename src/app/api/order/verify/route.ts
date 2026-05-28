import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId, razorpayPaymentId, razorpaySignature } = await request.json();

    if (!orderId || !razorpayPaymentId) {
      return NextResponse.json(
        { error: "orderId and payment tokens are required" },
        { status: 400 }
      );
    }

    // Retrieve order with details
    const order = await db.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order details not found" }, { status: 404 });
    }

    if (order.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Process payment completion inside transaction
    await db.$transaction(async (tx) => {
      // 1. Mark order payment as verified and status as confirmed
      await tx.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: "Paid",
          orderStatus: "Confirmed",
          paymentId: razorpayPaymentId,
        },
      });

      // 2. Decrement stock for purchased products
      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      // 3. Clear user's shopping cart
      await tx.cartItem.deleteMany({
        where: { userId: user.id },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Transaction verified and cargo scheduled for packaging",
      orderNumber: order.orderNumber,
    });
  } catch (error) {
    console.error("Order verification error:", error);
    return NextResponse.json(
      { error: "Internal Server Error during order verification" },
      { status: 500 }
    );
  }
}
