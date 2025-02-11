const mongoose = require('mongoose');
const mailSender = require('../utils/mailSend')
const OTPSchema= new mongoose.Schema({
email:{
    type:String,
    required:true,
 },
otp:{
    type:String,
 },
 createdAt:{
    type:Date,
    default:Date.now(),
    expires:5*60
 },
 
})


//a function -> to send email

async function sednVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email,"Verfication Email from StudyNotion ",otp);
        console.log("Email send Successsfully ", mailResponse);
    }catch(err){
        console.log("error occured while sending email",err);
        throw err;
    }
}


OTPSchema.pre("save",async function(next){
    await sednVerificationEmail(this.email,this.otp);
    next();
})




module.exports=mongoose.model("OTP",OTPSchema);