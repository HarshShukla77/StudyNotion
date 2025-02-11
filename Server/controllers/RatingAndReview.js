const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

//createRting 

exports.createRating = async (req,res)=>{
    try{
        const userId = req.user.id ;


        //fetchdata from rq body 
        const {rating , review , courseId} = req.body;
        //check if user i enrolled or not 
        const courseDetils = await Course.findbyOne({_id:courseId,
                                                    studentsEnrolled:{$eleMatch:{$eq:userId}},}
        );

        if(!courseDetils){
            return res.status(400).json({
                success:false,
                message:"student not enollred in your course "  
            })
        }
        //chjeck if user alreayd reviews the course
        const alreadyReviewed = await RatingAndReview.findOne({
                    user:userId,
                    course:courseId
        })

        if(alreadyReviewed){
            return res.status(500).json({
                success:false,
                message:"ciurse is already review by the user"  
            })
        }

        const ratingReview = await RatingAndReview.create({
            user:userId,
            course:courseId,
            rating,review
            
                    });
        //upate course  with this rating / reviiew 
        const updatedCourseDetails =await Course.findByIdAndUpdate({_id:courseId},
            {
                $push:{
                    ratingAndReviews:ratingReview._id,
                }
            },
            {new:true}
        )
        console.log(updatedCourseDetails);
        //eturn krd 
        return res.status(200).sjoon({
            success:true,
            message:"rating and reviw created succesffulyy"
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"error in creating rating and review " 
        })
    }
}



//average rating 
exports.getAverageRating= async (req,res)=>{
    try{
        //get course id
        const courseId = req.body.courseId;
        //calucalte avrage rating 
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    //string ko object me convert kiya h niche 
                    course: new mongoose.Types.ObjectId(courseId)
                },
            },
            {
                $group:{
                    _id: null,
                    averageRating:{$avg:"$rating"}
                }
            }
        ] )
        //return aveage rating 
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
                message:"average rating fetched succesfully"
            })
        }
        return res.status(200).json({
            success:true,
            averageRating:0,
            message:"average rating is zero"
        })
        
    }catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}
//get all rating and review 
exports.getAllRating = async(req,res)=>{
    try{
        const allReviews = await RatingAndReview.find().sort({rating:"desc"}).populate(
                {
                    path:"User",
                    select:"firstName lastName email, image"
                }
        ).populate({
            path:"Course",
            select:"courseName"
        });


        return res.status(200).json({
            success:true,
            message:"all reviews fetched succesfully"
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"could not fetched reviews"
        })
    }
}