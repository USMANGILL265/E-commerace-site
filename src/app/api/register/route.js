import dbConnect from "@/backend/db";
import { NextResponse } from "next/server";
import { User } from "@/backend/models";
import bcrypt from "bcrypt";

export async function POST(req) {
  await dbConnect();

  try {
    const data = await req.json();

    if (!data.name || !data.email || !data.password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists with this email" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // Save using DB's field (userName) but respond with 'username'
    const newUser = await User.create({
      userName: data.name,
      email: data.email,
      password: hashedPassword,
    });

    const respUser = {
      _id: newUser._id,
      username: newUser.userName || newUser.username || data.name,
      email: newUser.email,
      isAdmin: !!newUser.isAdmin,
    };

    // Return user under "message" so AuthContext.fetchUser can use it
    return NextResponse.json(
      { success: true, message: respUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Registration error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
