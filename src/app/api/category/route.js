import dbConnect from "@/backend/db";
import { Category } from "@/backend/models";
import { NextResponse } from "next/server";



export async function POST(req) {
    await dbConnect()
    try {
        const data = await req.json()
        const Categories = await Category.create(data)
        return NextResponse.json({
            Categories,
            success:true
        },{status:201})
    } catch (error) {
        return NextResponse.json({
            error:error,
            success:false
        },{status:500})
    }
    
}
export async function GET(req) {
    await dbConnect()
    try {
        const CategoryGet = await Category.find()
        return NextResponse.json({
            CategoryGet,
            success:true
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            error:error,
            success:false
        },{status:500})
    }
    
}


export async function DELETE(req,id) {
    await dbConnect()
    try {
        const CategoryGet = await Category.findByIdAndDelete(id)
        return NextResponse.json({
            CategoryGet,
            success:true
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            error:error,
            success:false
        },{status:500})
    }
    
}

