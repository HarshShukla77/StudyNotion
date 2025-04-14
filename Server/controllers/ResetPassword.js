const User = require("../models/User")
const crypto = require('crypto')
const mailSender = require('../utils/mailSend');
const bcrypt = require('bcrypt')

exports.resetPasswordToken = async (req,res) => {

   try {
       const {email} = req.body;

       if(!email){
           return res.status(400).json({
               success:false,
               message:"Email is empty"
           })
       }
   
       const existingUser = await User.findOne({email})
   
       if(!existingUser){
           return res.status(400).json({
               success:false,
               message:"Email doesn't exist"
           })
       }
   
       const token = crypto.randomUUID()
   
       const updatedUser = await User.findOneAndUpdate({email},
                                                    {
                                                    token:token,
                                                    resetPasswordExpires: Date.now() + 5*60*1000
                                                    },
                                                    {new:true}) 

       const url = `http://localhost:5173/update-password/${token}`

       await mailSender(email, "Password Reset Link", `Password reset link: ${url}`);

       return res.status(200).json({
           success:true,
           message:'Reset link sent'
       })
   } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending reset pwd mail'
        })
   }
}

exports.resetPassword = async (req, res) => {
    try {
      const { password, confirmPassword, token } = req.body;
  
      console.log("Request body:", req.body);
  
      if (!password || !confirmPassword || !token) {
        console.log("Missing fields in request");
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      if (password !== confirmPassword) {
        console.log("Passwords do not match");
        return res.status(400).json({
          success: false,
          message: "Passwords do not match",
        });
      }
  
      const user = await User.findOne({ token });
      console.log("User found:", user);
  
      if (!user) {
        console.log("Invalid or expired token");
        return res.status(400).json({
          success: false,
          message: "Invalid or expired token",
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.token = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      console.log("Password reset successfully for user:", user.email);
  
      return res.status(200).json({
        success: true,
        message: "Password reset successfully",
      });
    } catch (error) {
      console.error("Error in resetPassword:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };