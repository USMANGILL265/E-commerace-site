import dbConnect from "@/backend/db";
import { Product } from "@/backend/models";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { id } = params;

    const product = await Product.findById(id).populate("category", "title");

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, product },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    const body = await req.json();
    const product = await Product.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json(
      { success: true, product },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    const product = await Product.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, product },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
