import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, phone, email, address, city, state, pincode, biomarkerToken, promoCode } = await request.json();

    if (!name || !phone || !email || !address || !city || !state || !pincode) {
      return NextResponse.json(
        { error: "All shipping credentials must be declared" },
        { status: 400 }
      );
    }

    // Retrieve active cart items
    const cartItems = await db.cartItem.findMany({
      where: { userId: user.id },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return NextResponse.json({ error: "No active cargo in cart bay" }, { status: 400 });
    }

    // Verify stock availability
    for (const item of cartItems) {
      if (item.quantity > item.product.stock) {
        return NextResponse.json(
          { error: `Formula ${item.product.name} is low in lab stock. Limit is ${item.product.stock} units.` },
          { status: 400 }
        );
      }
    }

    // Calculate subtotal
    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const discount = promoCode === "BIO-UPGRADE" ? 0.15 : 0.0;
    const totalAmount = subtotal * (1 - discount);

    // Generate unique order reference code
    const orderNumber = `AEST-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    // Create Order and associated Items inside a transaction
    const order = await db.$transaction(async (tx) => {
      // 1. Create main order record
      const newOrder = await tx.order.create({
        data: {
          userId: user.id,
          orderNumber,
          totalAmount,
          paymentStatus: "Pending",
          orderStatus: "Pending",
          shippingAddress: address,
          name,
          phone,
          email,
          city,
          state,
          pincode,
        },
      });

      // 2. Map items to order
      for (const item of cartItems) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            productPrice: item.product.price,
          },
        });
      }

      return newOrder;
    });

    // Package simulated Razorpay payment parameters (amount is in Paise for INR)
    return NextResponse.json({
      message: "Order initialized successfully",
      orderId: order.id,
      orderNumber: order.orderNumber,
      totalAmount: order.totalAmount,
      razorpayConfig: {
        key: "rzp_test_aesthetix_simulation",
        amount: Math.round(order.totalAmount * 100),
        currency: "INR",
        name: "AESTHETIX NUTRITION LABS",
        description: `Cargo Loadout ${order.orderNumber}`,
        order_id: `rzp_sim_${order.id.slice(0, 12)}`,
        prefill: {
          name: order.name,
          email: order.email,
          contact: order.phone,
        },
        theme: {
          color: "#00C2FF",
        },
      },
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Internal Server Error during order initialization" },
      { status: 500 }
    );
  }
}
