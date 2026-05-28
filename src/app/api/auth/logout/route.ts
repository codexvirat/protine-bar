import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logout successful" });
    
    // Clear session cookie by setting its expiry to past
    response.cookies.set("session_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });
    
    return response;
  } catch (error) {
    return NextResponse.json({ error: "Logout execution failed" }, { status: 500 });
  }
}
