import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PATCH(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: "Access Denied: Admin role required" }, { status: 403 });
    }

    const { orderId, orderStatus, trackingId } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: "orderId is required" }, { status: 400 });
    }

    // Verify valid status options
    const validStatuses = [
      "Pending",
      "Confirmed",
      "Processing",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (orderStatus && !validStatuses.includes(orderStatus)) {
      return NextResponse.json({ error: "Invalid status code" }, { status: 400 });
    }

    // Prepare update parameters
    const updateData: any = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (typeof trackingId === "string") updateData.trackingId = trackingId;

    const updatedOrder = await db.order.update({
      where: { id: orderId },
      data: updateData,
    });

    return NextResponse.json({
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Admin status update error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
