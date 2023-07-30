const mongoose = require("mongoose");

exports.connectDb = async()=>{
    
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected")
    } catch(err){
        console.log(err)
    }
}