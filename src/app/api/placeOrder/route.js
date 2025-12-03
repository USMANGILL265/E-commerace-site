// app/api/placeOrder/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json(); // get order details
    console.log("Order received:", data);

 
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
