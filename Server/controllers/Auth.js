const User= require('../models/User');
const OTP = require('../models/OTP');
const otpGenerator= require("otp-generator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Profile = require('../models/Profile');
const mailSender = require("../utils/mailSend");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

//send otp
exports.sendOTP= async (req,res)=>{
   try{ const {email}= req.body;

    const checkUserPresent = await User.findOne({email});
    if(checkUserPresent){
        return res.status(400).json({
            message:"user already present",
            success:false
        })
    }

            //genrate otp
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            specialChars:false,
            lowerCaseAlphabets:false
        });
        console.log("OTP -",otp);

            //check kr unique

            const result = await OTP.findOne({otp:otp});

            while(result){
                otp = otpGenerator.generate(6,{
                    upperCaseAlphabets:false,
                    specialChars:false,
                    lowerCaseAlphabets:false
                });
                result= await OTP.findOne({otp:otp});
            }

            const otpPayload= {
                email,
                otp
            }

            const otpBody = await OTP.create(otpPayload);
            console.log(otpBody);
            try {
              await mailSender(email, "Verify Your Email", emailTemplate(otp));
              console.log("✅ Email sent successfully to:", email);
            } catch (error) {
              console.error("❌ Failed to send email:", error);
            }
           
           
           
            res.status(200).json({
                message:"otp sent",
                success:true,
                data:otpBody
            })

}catch(err){
    res.status(401).json({
        message:"otp failed",
        success:false
    })
}
}

//signup

exports.signUp = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp
      } = req.body;
  
      if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
        return res.status(403).json({
          message: "All fields are required",
          success: false
        });
      }
  
      // Match passwords
      if (password !== confirmPassword) {
        return res.status(400).json({
          message: "Passwords do not match",
          success: false
        }); 
      }
  
      // Check unique email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "User is already registered",
          success: false
        });
      }
  
      // Find recent OTP
      const recentOTP = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
      console.log(recentOTP);
  
      if (recentOTP.length === 0) {
        return res.status(400).json({
          message: "OTP not found",
          success: false
        });
      } else if (otp !== recentOTP[0].otp) {
        return res.status(400).json({
          message: "Invalid OTP",
          success: false
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null
      });
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        accountType,
        contactNumber,
        additionalDetails: profileDetails._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
      });
  
      return res.status(200).json({
        success: true,
        message: "User created successfully"
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Failed to sign up, please try again",
        success: false
      });
    }
  };

//login//

exports.login = async(req,res)=>{
    try{
            //get data from req body
            const {email, password} = req.body;

            //validate kro 
            if(!email || !password){
              return  res.status(403).json({
                    message:"all fields required",
                    success:false
                })
            }
            // user exist krta ?
            const user = await User.findOne({email}).populate("additionalDetails");
            if(!user){
                res.status(403).json({
                    message:"user not ecist",
                    success:false
                })
            }
            // token banao jwt after password matching 
            if(await bcrypt.compare(password,user.password)){
             const payload ={
                email:user.email,                                       
                id:user._id,
                accountType:user.accountType
             }        
                const token = jwt.sign(payload,process.env.JWT_SECRET,{
                    expiresIn:"1d"
                });
                user.token=token;
                user.password=undefined;

                options={
                    expires:new Date(Date.now()+3*24*60*60*1000),
                    httpOnly:true,
                }
                res.cookie("token",token,options).status(200).json({
                    success:true,
                    token,
                    user,
                    message:"logged in successfully"
                })
            }
            else{
               return res.status(403).json({
                    message:"password is incoorect",
                    success:false
                })
            }
           
            

            //create cookiw send res
    }catch(err){
        res.status(500).json({
            message:"login failure",
            success:false
        })
    }
}



//changepassword
exports.changePassword = async(req,res)=>{
        try{
            const {oldPassword,newPassword}=req.body;
            if(!oldPassword || !newPassword){
                res.status(403).json({
                    message:"all fields are quired",
                    success:false
                })
            }
            if(newPassword===oldPassword){
                res.status(403).json({
                    message:"You entered the same password",
                    success:false
                })
            }
            let hashedPassword = await bcrypt.hash(newPassword,10);
            const user = await User.findByIdAndUpdate(req.user._id,{password:hashedPassword},{new:true});

            res.status(200).json({
                success:true,
                message:"password changed successfully"
            })
        }catch(err){
            res.status(403).json({
                message:"errror in changing the passwrd",
                success:false
            })
        }
}