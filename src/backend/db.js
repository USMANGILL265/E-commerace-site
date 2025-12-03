import mongoose from "mongoose"
const dbConnect = async ()=>{

    if(mongoose.connection.readyState >= 1){
        return
    }

    try {
        await mongoose.connect("mongodb+srv://usmangill:usmangil@usmangill.ba9vxlz.mongodb.net/gillcart")
        console.log("db connect!")
    } catch (error) {
        console.log(error)
    }
}

export default dbConnect