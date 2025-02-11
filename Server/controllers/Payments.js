const {instance}= require("../config/razorpay")
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSend")
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail")

exports.capturePayment = async(req,res)=>{
    try{
        // get courseId and userID
        const{course_id}= req.body;
        const userId = req.user.id;


        //validation
        if(!course_id){
            return res.json({
                success:false,
                messaage:"courseId is required"
            })
        };
       
        //valid courseDetails
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.json({
                    success:false,
                    message:"course not found"
                })
            }

            //user already pay for thr same course

            const uid = new mongoose.Types.ObjectId(userId);

            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"user already enrolled"
                })
            }
        }catch(err){
            console.error(err);
            return res.status(500).json({
                success:false,
                message:err.messaage,
            })
        }
       
        //order create
        const amount = course.price;
        const currency = "INR";

        const options= {
            amount:amount*100,
            currency,
            receipt:Math.random(Date.now()).toString(),
            notes:{
                courseId:course_id,
                userId,
            }

        }

            try{
                //initiate the payment using razorpay
                 const paymentResponse = await instance.orders.create(options);
                 console.log(paymentResponse);
                 return res.status(200).json({
                    success:true,
                    courseName:course.courseName,
                    courseDescription:course.courseDescription,
                    thumbnail:course.thumbnail,
                    orderId:paymentResponse.id,
                    currency:paymentResponse.currency,
                    amount:paymentResponse.amount,

                 })
            }catch(err){
                 return res.status(500).json({
                success:false,
                message:err.messaage,
            })
            }



    }catch(err){
        return res.status(500).json({
            success:false,
            message:"could not initiate order",
        })
    }
};


exports.verifySignature= async(req,res)=>{
        const webhookSecret="12345678";

        const signature = req.headers("x-razorpay-signature");


        const shasum = crypto.createHmac("sha256",webhookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        if(digest===signature){
            console.log("payment is autherized");

            const {courseId,userId} = req.body.payload.payment.entity.notes;

            try{
                //fullfill the actio 
                //student ko enroll kro 
                    //find the course and enroll student in it 
                    const enrolledCourse = await Course.findByIdAndUpdate({_id:courseId},{$push:{studentsEnrolled:userId}},
                    {new:true}
                )

                if(!enrolledCourse){
                    return res.status(500).json({
                        success:false,
                        message:"could not enroll student "
                    })
                }

                console.log(enrolledCourse);

                //find tbhe student and add the course to thweir list oif enreolled course

                const enrolledStudent = await User.findByIdAndUpdate({_id:userId},{$push:{
                    courses:courseId,
                }                },{new:true})


                console.log(enrolledStudent);

                //mail send krdo student ko confirmation ka 
                const emailResponse  = await mailSender(
                                        enrolledStudent.email,
                                        "Congratulations from CodeHelp ",
                                        "Congratulatiob , you are onboarded into new codehelp cousrw",


                )
                console.log(emailResponse);

                return res.status(200).json({
                    success:true,
                    message:"paymebnt is autherized "
                })
 

            }
            catch(err){
                return res.status(500).json({
                    success:false,
                    message:"paymebnt is failed  "
                })
            }

        }
        else{
            return res.status(500).json({
                success:false,
                message:"inavlid req   "
            })
        }






}