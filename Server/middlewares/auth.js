const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require("../models/User")

///auth
exports.auth= async(req,res,next)=>{
    try{
        //extract token

        const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer ","");
        //if token missing then return res

        if(!token){
            return res.status(401).json({
                message:"token not found",
                success:false
            })
        }

        //verify token
        try{
            const decode= jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);

            req.user= decode;
        }catch(err){
            return res.status(401).json({
                message:"token not valid",
                success:false
            })
        }
        next();

    }catch(err){
        return res.status(401).json({
            message:"something went wrong while validatinf",
            success:false
        })
    }
}

//isStudent
exports.isStudent = async(req,res,next)=>{
try{
     if(req.user.accountType!=="Student"){
        return res.status(401).json({
            message:"this is a protected route for students only",
            success:false
        })
     }

     next();

}catch(err){
return res.status(500).json({
            message:"User role cannot be verfied",
            success:false
        })
}
}

//isInstructor
exports.isInstructor = async(req,res,next)=>{
    try{
         if(req.user.accountType!=="isInstructor"){
            return res.status(401).json({
                message:"this is a protected route for isInstructor only",
                success:false
            })
         }
    
         next();
    
    }catch(err){
    return res.status(500).json({
                message:"User role cannot be verfied",
                success:false
            })
    }
    }
//isadmin

exports.isAdmin = async(req,res,next)=>{
    try{
         if(req.user.accountType!=="Admin"){
            return res.status(401).json({
                message:"this is a protected route for Admin only",
                success:false
            })
         }
    
         next();
    
    }catch(err){
    return res.status(500).json({
                message:"User role cannot be verfied",
                success:false
            })
    }
    }