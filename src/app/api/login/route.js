import { NextResponse } from "next/server";
import dbConnect from "@/backend/db";
import bcrypt from "bcrypt";
import { User } from "@/backend/models";
import { GenAccessToken } from "@/helper/jwt";

export async function POST(req) {
  await dbConnect();
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ success: false, message: "Fill all fields!" }, { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
  }

  const token = await GenAccessToken({
    userName: user.userName,
    fullName: user.fullName,
    id: user._id.toString(),
    isAdmin: user.isAdmin,
  });

  const respUser = {
    _id: user._id,
    username: user.userName || user.username || user.name,
    email: user.email,
    isAdmin: !!user.isAdmin,
  };

  const response = NextResponse.json({
    success: true,
    message: respUser, // frontend can immediately consume this if desired
  });

  response.cookies.set("GillToken", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
