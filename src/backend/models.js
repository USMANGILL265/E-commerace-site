import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,

    }
},{timestamps:true})


const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    desc: String,
    stock: Number,
    images: Array,
    price: String,
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Categories",
        required:true
    }
})


const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required: true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: String,
        isAdmin: {
      type:Boolean,
      default: "false",   
    },

},{timestamps:true})


export const Category = mongoose.models.Categories || mongoose.model("Categories",categorySchema)
export const Product = mongoose.models.Products || mongoose.model("Products",productSchema)
export const User = mongoose.models.Users || mongoose.model("Users",userSchema)