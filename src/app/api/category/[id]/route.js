import dbConnect from "@/backend/db";
import { Category } from "@/backend/models";
import { NextResponse } from "next/server";


export async function DELETE(req,{params}) {
    await dbConnect()
    try {
        const { id } = params
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

