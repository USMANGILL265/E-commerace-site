import dbConnect from "@/backend/db";
import { User } from "@/backend/models";
import { JWTVerify } from "@/helper/jwt";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  try {
    const token = req.cookies.get("GillToken")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "No token" }, { status: 401 });
    }

    const payload = await JWTVerify(token);

    if (!payload?.id || typeof payload.id !== "string") {
      return NextResponse.json({ success: false, message: "Invalid token structure" }, { status: 403 });
    }

    const user = await User.findById(payload.id).select("-password");

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const respUser = {
      _id: user._id,
      username: user.userName || user.username || user.name,
      email: user.email,
      isAdmin: !!user.isAdmin,
    };

    return NextResponse.json({ success: true, message: respUser });
  } catch (error) {
    console.error("Profile route error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
