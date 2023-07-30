const { Inventory } = require("../model/inventoryModel");
const mongoose = require("mongoose");

exports.bloodGroupDetails = async(req,res)=>{
    try{
        const bloodGroups = ["O+","O-","AB+","AB-","A+","A-","B+","B-"]
        const bloodGroupData = [];
        const organisation = new mongoose.Types.ObjectId(req.body.userId);


        // Get single blood group 
        await Promise.all(bloodGroups.map(async(bloodGroup)=>{
            //Count total in
            const totalIn = await Inventory.aggregate([
                {
                    $match:{
                        bloodGroup:bloodGroup,
                        inventoryType:"in",
                        organisation
                    },
                },
                {
                    $group:{
                        _id:null,
                        total:{$sum:"$quantity"},
                    },
                },
            ]);

            //Count out
            const totalOut = await Inventory.aggregate([
                {
                    $match:{
                        bloodGroup:bloodGroup,
                        inventoryType:"out",
                        organisation
                    },
                },
                {
                    $group:{
                        _id:null,
                        total:{$sum:"$quantity"},
                    },
                },
            ]);
            //Calculate total
            const availableBlood = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

            // Push Data 
            bloodGroupData.push({
                bloodGroup,
                totalIn:totalIn[0]?.total || 0,
                totalOut:totalOut[0]?.total || 0,
                availableBlood
            })
        }))

        

          return res.status(200).send({
            success: true,
            message: "Blood Group Data Fetch Successfully",
            bloodGroupData,
          });

    }catch(err){
        console.log(err);
        return res.status(500).send({
            success:false,
            message:"Error in Blood Group Data Analytics API",
            err
        })
    }
}