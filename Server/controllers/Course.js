const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUploader')

exports.createCourse = async(req,res)=>{
    try{
        const {courseName,courseDescription,price,whatYouWillLearn,Category}= req.body;

        const thumbnail = req.files.thumbnailImage;

         //validation

         if(!courseName || !courseDescription || !price || !whatYouWillLearn || !Category || !thumbnail){
            return res.status(400).json({
                message:"all fields required",
                success:false
            })
         }

         const userId= req.user.id;
         
         const instructorDetails = await User.findById(userId);
         console.log(instructorDetails);


         if(!instructorDetails){
            return res.status(400).json({
                message:"instructor details not found",
                success:false
            })
         }

         //checl Category valid?


         const CategoryDetails = await Category.findById(Category);

         if(!CategoryDetails){
            return res.status(400).json({
                message:"Category details not found",
                success:false
            })
         }

         const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);



         //create emtry for new course 


         const newCourse = new Course.create({
              courseName,
              courseDescription,
              instructor:instructorDetails.id,
              whatYouWillLearn,
              price,
              Category:CategoryDetails.id,
              thumbnail:thumbnailImage.secure_url
         })


         //add new course to the user schema of insta

         await User.findByIdAndUpdate({_id:instructorDetails.id},
                                       {
                                        $push:{
                                            courses: newCourse.id
                                        },
                                    },
                                        {new:true},
                                       )


    }catch(err){
        return res.status(400).json({
            message:"failed to create course",
            success:false
        })
    }
}

exports.getAllCourses= async(req,res)=>{
    try{
        const allCourses = await Course.find({},{courseName:true,
                                                 price:true,
                                                 thumbnail:true,
                                                 instructor:true,
                                                 ratingAndReviews:true,
                                                 studentEnrolled:true,
                                            }).populate("instructor")
                                              .exec();  



                                   return res.status(200).json({
                                    message: "all courses fetched succefully",
                                    success: true,
                                    data: allCourses
                                   })         

    }catch(err){
        return res.status(400).json({
            message:"cannot fetch course data ",
            success:false
        })
    }
}

//getCourswDETAILS

exports.getCourseDetails=  async(req,res)=>{
    try{
        //get id
        const {courseId} = req.body;
        //find copurse details

        const courseDetails = await Course.find({_id:courseId})
                                           .populate(
                                            {
                                                path:"instructor",
                                                populate:{
                                                    path:"additionalDetails"
                                                },
                                            }
                                           ) 
                                           .populate("Category")
                                           .populate("ratingAndReviews.user")
                                           .populate({
                                            path:"courseContent",
                                            populate:{
                                                path:"subSection",
                                            },
                                           })
                                           .exec();

                            if(!courseDetails){
                                return res.status(400).json({
                                    success:false,
                                    message:` could not the course with ${courseId}`  
                                })
                            }
                        }

                                                        
    catch(err){
        return res.status(500).json({
            success:false,
            message:` cfailed to get course detials`  
        })
    
}
}