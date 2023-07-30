const { User } = require("../model/userModel");

//Get Donor List
exports.getDonorList = async(req,res)=>{
    try{
        const donorData = await User.find({role:"donor"}).sort({createdAt: -1});

        return res.status(200).send({
            success:true,
            TotalCount: donorData.length,
            message:"Donor data fetched successfully!",
            donorData
        })
    }catch(err){
        console.log(err);
        return res.status(500).send({
            success:false,
            message:"Error in Donor List API",
            err
        })
    }
}

//Get Hospital List 

exports.getHospitalList = async(req,res)=>{
    try{
        const hospitalData = await User.find({role:"hospital"}).sort({createdAt: -1});

        return res.status(200).send({
            success:true,
            TotalCount: hospitalData.length,
            message:"Hospital data fetched successfully!",
            hospitalData
        })
    }catch(err){
        console.log(err);
        return res.status(500).send({
            success:false,
            message:"Error in Hospital List API",
            err
        })
    }
}

//Get Organization List

exports.getOrganisationList = async(req,res)=>{
    try{
        const organisationData = await User.find({role:"organisation"}).sort({createdAt: -1});

        return res.status(200).send({
            success:true,
            TotalCount: organisationData.length,
            message:"Organisation data fetched successfully!",
            organisationData
        })
    }catch(err){
        console.log(err);
        return res.status(500).send({
            success:false,
            message:"Error in Hospital List API",
            err
        })
    }
}


//Delete Donor

exports.deleteDonor = async(req,res)=>{
    try{
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).send({
        success:true,
        message:"Donor Record deleted successfully!"
    })
    } catch(err){
        console.log(err);
        return res.status(500).send({
            success:false,
            message:"Error in Deleting Donor",
            err
        })
    }
}

//Delete Hospital

exports.deleteHospital = async(req,res)=>{
    try{
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).send({
        success:true,
        message:"Hospital Record deleted successfully!"
    })
    } catch(err){
        console.log(err);
        return res.status(500).send({
            success:false,
            message:"Error in Deleting Hospital",
            err
        })
    }
}

//Delete Hospital

exports.deleteOrganisation = async(req,res)=>{
    try{
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).send({
        success:true,
        message:"Organisation Record deleted successfully!"
    })
    } catch(err){
        console.log(err);
        return res.status(500).send({
            success:false,
            message:"Error in Deleting Organisation",
            err
        })
    }
}