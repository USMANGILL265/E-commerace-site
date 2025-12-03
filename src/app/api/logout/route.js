import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  try {
    // Clear the cookie
    const cookie = serialize("GillToken", "", {
      path: "/",
      httpOnly: true,
      maxAge: 0, // âŒ expires immediately
    });

    const response = NextResponse.json({
      success: true,
      message: "Logout successful",
    });

    response.headers.set("Set-Cookie", cookie); // ðŸ‘ˆ set removal on client

    return response;
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong!",
    }, { status: 500 });
  }
}