// const { User } = require("../model/userModel");
const mongoose = require("mongoose");
const { Inventory } = require("../model/inventoryModel");
const model = require("../model/userModel");
const User = model.User;


exports.createInventory = async(req,res)=>{
    try{
        const {email} = req.body;

        const user = await User.findOne({email});

        if(!user){
            throw new Error("User not Found");
        }
        // if(inventoryType === "in" && user.role !== "donor"){
        //     throw new Error("Not a donor account")
        // }
        // if(inventoryType === "out" && user.role !== "hospital"){
        //     throw new Error("Not a Not a hospital")
        // }

        if (req.body.inventoryType == "out") {
            const requestedBloodGroup = req.body.bloodGroup;
            const requestedQuantityOfBlood = req.body.quantity;
            const organisation = new mongoose.Types.ObjectId(req.body.userId);
            //calculate Blood Quanitity
            const totalInOfRequestedBlood = await Inventory.aggregate([
              {
                $match: {
                  organisation,
                  inventoryType: "in",
                  bloodGroup: requestedBloodGroup,
                },
              },
              {
                $group: {
                  _id: "$bloodGroup",
                  total: { $sum: "$quantity" },
                },
              },
            ]);
            // console.log("Total In", totalInOfRequestedBlood);
            const totalIn = totalInOfRequestedBlood[0]?.total || 0;
            //calculate OUT Blood Quanitity
      
            const totalOutOfRequestedBloodGroup = await Inventory.aggregate([
              {
                $match: {
                  organisation,
                  inventoryType: "out",
                  bloodGroup: requestedBloodGroup,
                },
              },
              {
                $group: {
                  _id: "$bloodGroup",
                  total: { $sum: "$quantity" },
                },
              },
            ]);
            const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;
      
            //in & Out Calc
            const availableQuanityOfBloodGroup = totalIn - totalOut;
            //quantity validation
            if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
              return res.status(500).send({
                success: false,
                message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
              });
            }
            req.body.hospital = user?._id;
          } else {
            req.body.donor = user?._id;
          }

        

        const inventory = new Inventory(req.body);
        await inventory.save();
        return res.status(201).send({
            success:true,
            message:"New Blood Record Added"
        })
    } catch(err){
        console.log(err)
        return res.status(500).send({
            success:false,
            message:"Error in Create Inventory API"
        })
    }
}

// Get All Blood Records
exports.getInventory = async(req,res)=>{
    try{
        // const inventory = await inventoryModel.find({organisation: req.body.userId,})
        const inventory = await Inventory.find().populate("donor")
        .populate("hospital")
        .sort({ createdAt: -1 })
        // .sort({ createdAt: -1 })

        return res.status(200).send({
            success:true,
            message:"Get all records successfully",
            inventory
        })
    } catch(err){
        console.log(err)
        return res.status(500).send({
            success:false,
            message:"Error in Get Inventory API",
            err
        })
    }
}

//Get Hospital Blood records 

exports.getInventoryHospital = async(req,res)=>{
  try{
      // const inventory = await inventoryModel.find({organisation: req.body.userId,})
      const inventory = await Inventory.find(req.body.filters).populate("donor")
      .populate("hospital")
      .sort({ createdAt: -1 })
      // .sort({ createdAt: -1 })

      return res.status(200).send({
          success:true,
          message:"Get hospital consumer records successfully",
          inventory
      })
  } catch(err){
      console.log(err)
      return res.status(500).send({
          success:false,
          message:"Error in Get Consumer Inventory API",
          err
      })
  }
}

//Get Donors Records
exports.getDonors = async(req,res)=>{
  try{
    const organisation = req.body.userId;
    // find donors
    const donorId = await Inventory.distinct("donor",{
      organisation,
    })
    const donors = await User.find({_id:{$in: donorId}})

    return res.status(200).send({
      success:true,
      message:"Donor Record fetched successfully",
      donors
    })
  } catch(err){
    console.log(err);
    return res.status(500).send({
      success:false,
      message:"Error in Donor Records",
      err
    })
  }
}

exports.getHospitals = async(req,res)=>{
  try{
    const organisation = req.body.userId;
    //Get hospital id

    const hospitalId = await Inventory.distinct("hospital",{organisation})

    // Find hospital 

    const hospitals = await User.find({
      _id:{$in: hospitalId}
    })
    return res.status(200).send({
      success:true,
      message:"Hospitals Data fetched successfully",
      hospitals
    })
    
  } catch(err){
    console.log(err)
    return res.status(500).send({
      success:false,
      message:"Error in get Hospital API",
      err
    })
  }
}


//Get Org Profiles
exports.getOrgnaisationController = async (req, res) => {
  try {
    const donor = req.body.userId;
    const orgId = await Inventory.distinct("organisation", { donor });
    //find org
    const organisations = await User.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ORG API",
      error,
    });
  }
};

// Get Org for Hospitals 

exports.getOrgnaisationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await Inventory.distinct("organisation", { hospital });
    //find org
    const organisations = await User.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospitals Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital ORG API",
      error,
    });
  }
};

// Get Blood records of 3 

exports.getRecentInventory = async(req,res)=>{
  try{
    const inventory = await Inventory.find({
      organisation:req.body.userId
    }).limit(3).sort({createdAt:-1})

    return res.status(200).send({
      success:true,
      message:"Fetched successfully recent data inventory",
      inventory
    })
  }catch(err){
    console.log(err);
    return res.status(500).send({
      success:false,
      message:"Error in recent inventory API",
      err
    })
  }
}