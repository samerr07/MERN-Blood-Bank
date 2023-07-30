const mongoose = require("mongoose");
const {Schema} = mongoose;

const inventorySchema = new Schema({
    inventoryType:{
        type:String,
        required:[true,"Inventory are required"],
        enum:["in","out"]
    },
    bloodGroup:{
        type:String,
        required:[true,"Blood group is required"],
        enum:["O+","O-","AB+","AB-","A+","A-","B+","B-"]
    },
    quantity:{
        type:Number,
        required:[true,"Blood quantity is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"]
    },
    organisation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"Organisation is required"]
    },
    hospital:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:function(){
            return this.inventoryType === "out"
        }
    },
    donor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:function(){
            return this.inventoryType === "in"
        }
    } 
},
    {timestamps:true}
)

exports.Inventory = mongoose.model('Inventory', inventorySchema);