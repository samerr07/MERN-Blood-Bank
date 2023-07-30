const model = require("../model/userModel");
const User = model.User;

exports.adminAuth = async(req,res,next)=>{
    try{
        const user = await User.findById(req.body.userId);
        // check role
        if(user?.role !== "admin"){
            return res.status(401).send({
                success:false,
                message:"Auth Failed",
            })
        }else{
            next();
        }
    }catch(err){
        console.log(err);
        return res.status(401).send({
            success:false,
            message:"Auth Failed, ADMIN API",
            err
        })
    }
}
