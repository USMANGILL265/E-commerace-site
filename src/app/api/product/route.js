import dbConnect from "@/backend/db";
import { NextResponse } from "next/server";
import { Product } from "@/backend/models";


export async function POST(req) {
    await dbConnect();
    try {
        const data =  await req.json()
        const Products = await Product.create(data)
        return NextResponse.json({
            Products,
            success:true,
            
        },{status:201})
    } catch (error) {
        return NextResponse.json({
            error:error,
            success: false
        },{status:500})
    }
}
export async function GET(req) {
    await dbConnect();
    try {
        const ProductsGet = await Product.find().populate("category")
        return NextResponse.json({
            ProductsGet,
            success:true
        },{status:201})
    } catch (error) {
        return NextResponse.json({
            error:error,
            success: false
        },{status:500})
    }
}