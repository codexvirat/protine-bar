import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { db } from "@/lib/db";

// Fetch user's cart
export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await db.cartItem.findMany({
      where: { userId: user.id },
      include: {
        product: true,
      },
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Fetch cart error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Add/Update cart item
export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, quantity } = await request.json();

    if (!productId || typeof quantity !== "number") {
      return NextResponse.json(
        { error: "productId and quantity are required" },
        { status: 400 }
      );
    }

    // Verify product exists and is in stock
    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      await db.cartItem.deleteMany({
        where: { userId: user.id, productId },
      });
      return NextResponse.json({ message: "Cart item removed" });
    }

    // Check stock limit
    if (quantity > product.stock) {
      return NextResponse.json(
        { error: `Insufficient stock. Only ${product.stock} available.` },
        { status: 400 }
      );
    }

    // Upsert cart item
    const cartItem = await db.cartItem.upsert({
      where: {
        userId_productId: {
          userId: user.id,
          productId,
        },
      },
      update: {
        quantity,
      },
      create: {
        userId: user.id,
        productId,
        quantity,
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json({ cartItem });
  } catch (error) {
    console.error("Update cart error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Remove item or clear cart
export async function DELETE(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const productId = url.searchParams.get("productId");

    if (productId) {
      // Delete specific item
      await db.cartItem.deleteMany({
        where: { userId: user.id, productId },
      });
      return NextResponse.json({ message: "Cart item deleted" });
    } else {
      // Clear entire cart
      await db.cartItem.deleteMany({
        where: { userId: user.id },
      });
      return NextResponse.json({ message: "Cart cleared successfully" });
    }
  } catch (error) {
    console.error("Delete cart error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
