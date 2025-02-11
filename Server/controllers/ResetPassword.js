const User = require('../models/User');
const nodemailer = require("nodemailer");
const mailSender = require('../utils/mailSend');
const bcrypt=require('bcrypt');
//resetPasswordToken

exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                message: "user not found",
                success: false
            })
        }

        const token = crypto.randomUUID();

        await user.findOneAndUpdate({ email: email },
            {
                token: token
                , resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true })





        const url = `http://localhost:300/update-password/${token}`

        await mailSender(email, "Password Reset Link",
            `Password Reset Link: ${url}`
        )

        return res.status(200).json({
            message: "Email send succesfullt , Please check email and change password "
        })
    } catch (err) {
        return res.status(500).json({
            message: "some went wrong while reseting the pass",
            success: false
        })
    }
}

//resetPassword

exports.resetPassword = async (req, res) => {
    try{
        const {password,confirmPassword,token}= req.body;

        if(password!== confirmPassword){
            return res.status(400).json({
                message:"password and confirm doest match",
                success:false
            })
        }
    
        const userDetails = await User.findOne({token:token})
    
        if(!userDetails){
            return res.status(400).json({
                message:"token not found",
                success:false
            })
        }
        if(userDetails.resetPasswordExpires<Date.now()){
            return res.status(400).json({
                message:"token is expired  ",
                success:false
            })
        }
    
    
    
        const hashedPassword= await bcrypt.hash(password,10);
        await User.findOneAndUpdate({token:token},{password:hashedPassword},{new:true});
    
      return res.status(200).json({
            message:"password reset succesfully",
            success:true
        })
    }catch(err){
        return res.status(400).json({
            message:"reset password failed ",
            success:false
        })
    }

}