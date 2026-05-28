import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { name, email, password, phone, address } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, password)" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email console link already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = hashPassword(password);

    // If first user, make them Admin for testing purposes
    const userCount = await db.user.count();
    const shouldBeAdmin = userCount === 0;

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        isAdmin: shouldBeAdmin,
      },
    });

    return NextResponse.json(
      {
        message: "Registration successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Internal Server Error during registration" },
      { status: 500 }
    );
  }
}
