const mongoose = require("mongoose")
const model = require("../model/userModel");
const User = model.User;
const jwt = require("jsonwebtoken")
const bycrypt = require("bcryptjs");

//Register

exports.registerController = async(req,res)=>{
    try{
        const existingUser = await User.findOne({email:req.body.email});
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"User Already Exists"
            })
        }

        //hash password
        const salt = await bycrypt.genSaltSync(10);
        const hashedPassword = await bycrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword

        const user = new User(req.body);
        await user.save();
        return res.status(201).send({
            success:true,
            message:"User Registered Successfully",
            user
        })
    } catch(err){
        console.log(err)
        return res.status(500).send({
            success:false,
            message:"Error in Register API",
            err
        })
    }
}

exports.loginUser = async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Invalid Credentials"
            })
        }

        //check roles(j hmne enum diye h usermodel m)
        if(user.role !== req.body.role){
            return res.status(500).send({
                success:false,
                message:"Role does not match"
            })
        }

        //compare password
        const comparePassword = await bycrypt.compare(req.body.password,user.password);

        if(!comparePassword){
            return res.status(500).send({
                success:false,
                message:"Invalid Credentials"
            })
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{
            expiresIn :"1d",
        })

        return res.status(200).send({
            "success":true,
            message:"Login Succesfully",
            token,
            user
        })
    } catch(err){
        console.log(err)
        return res.status(500).send({
            success:false,
            message:"Error in Login API",
            err
        })
    }
}

exports.currentUser = async(req,res)=>{
    try{
        const user = await User.findOne({_id:req.body.userId})
        return res.status(200).send({
            success:true,
            message:"User fetched Sucessfully",
            user
        })
    } catch(err){
        console.log(err)
        return res.status(500).send({
            success:false,
            message:"Unable to get current user",
            err
        })
    }
}