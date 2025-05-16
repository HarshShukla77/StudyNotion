const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUploader')
const RatingAndReview = require("../models/RatingAndReview");

const Section = require("../models/Section")
const SubSection = require("../models/SubSection")

exports.createCourse = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id

    // Get all required fields from request body
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
    //   tag: _tag,
      category,
      status,
      instructions: _instructions,
    } = req.body
    // Get thumbnail image from request files
    const thumbnail = req.files.thumbnailImage

    // Convert the tag and instructions from stringified Array to Array
    // const tag = JSON.parse(_tag)
    const instructions = JSON.parse(_instructions)

    // console.log("tag", tag)
    console.log("instructions", instructions)

    // Check if any of the required fields are missing
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
    //   !tag.length ||
      !thumbnail ||
    //   !category ||
      !instructions.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }
    if (!status || status === undefined) {
      status = "Draft"
    }
    // Check if the user is an instructor
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    })

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      })
    }

    // Check if the tag given is valid
    // const categoryDetails = await Category.findById(category)
    // if (!categoryDetails) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Category Details Not Found",
    //   })
    // }
    // Upload the Thumbnail to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    )
    console.log(thumbnailImage)
    // Create a new course with the given details
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
    //   tag,
    //   category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions,
    })

    // Add the new course to the User Schema of the Instructor
    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    )
    // Add the new course to the Categories
    // const categoryDetails2 = await Category.findByIdAndUpdate(
    //   { _id: category },
    //   {
    //     $push: {
    //       courses: newCourse._id,
    //     },
    //   },
    //   { new: true }
    // )
    // console.log("HEREEEEEEEE", categoryDetails2)
    // Return the new course and a success message
    res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    })
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    })
  }
}
// exports.createCourse = async(req,res)=>{
//     try{
//         const {courseName,courseDescription,price,whatYouWillLearn,Category}= req.body;

//         const thumbnail = req.files.thumbnailImage;

//          //validation

//          if(!courseName || !courseDescription || !price || !whatYouWillLearn || !Category || !thumbnail){
//             return res.status(400).json({
//                 message:"all fields required",
//                 success:false
//             })
//          }

//          const userId= req.user.id;
         
//          const instructorDetails = await User.findById(userId);
//          console.log(instructorDetails);


//          if(!instructorDetails){
//             return res.status(400).json({
//                 message:"instructor details not found",
//                 success:false
//             })
//          }

//          //checl Category valid?


//          const CategoryDetails = await Category.findById(Category);

//          if(!CategoryDetails){
//             return res.status(400).json({
//                 message:"Category details not found",
//                 success:false
//             })
//          }

//          const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);



//          //create emtry for new course 


//          const newCourse = new Course.create({
//               courseName,
//               courseDescription,
//               instructor:instructorDetails.id,
//               whatYouWillLearn,
//               price,
//               Category:CategoryDetails.id,
//               thumbnail:thumbnailImage.secure_url
//          })


//          //add new course to the user schema of insta

//          await User.findByIdAndUpdate({_id:instructorDetails.id},
//                                        {
//                                         $push:{
//                                             courses: newCourse.id
//                                         },
//                                     },
//                                         {new:true},
//                                        )


//     }catch(err){
//         return res.status(400).json({
//             message:"failed to create course",
//             success:false
//         })
//     }
// }

// exports.createCourse = async (req, res) => {
//   try {
//     // Get user ID from request object
//     const userId = req.user.id

//     // Get all required fields from request body
//     let {
//       courseName,
//       courseDescription,
//       whatYouWillLearn,
//       price,
//     //   tag: _tag,
//     category,
//       status,
//       instructions: _instructions,
//     } = req.body
//     // Get thumbnail image from request files
//     // const thumbnail = req.files.thumbnailImage

//     // Convert the tag and instructions from stringified Array to Array
//     // const tag = JSON.parse(_tag)
//     const instructions = JSON.parse(_instructions)

//     console.log("tag", tag)
//     console.log("instructions", instructions)

//     // Check if any of the required fields are missing
//     if (
//       !courseName ||
//       !courseDescription ||
//       !whatYouWillLearn ||
//       !price ||
//     //   !tag.length ||
//     //   !thumbnail ||
//       !category ||
//       !instructions.length
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All Fields are Mandatory",
//       })
//     }
//     if (!status || status === undefined) {
//       status = "Draft"
//     }
//     // Check if the user is an instructor
//     const instructorDetails = await User.findById(userId, {
//       accountType: "Instructor",
//     })

//     if (!instructorDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Instructor Details Not Found",
//       })
//     }

//     // Check if the tag given is valid
//     const categoryDetails = await Category.findById(category)
//     if (!categoryDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Category Details Not Found",
//       })
//     }
//     // Upload the Thumbnail to Cloudinary
//     // const thumbnailImage = await uploadImageToCloudinary(
//     //   thumbnail,
//     //   process.env.FOLDER_NAME
//     // )
//     // console.log(thumbnailImage)
//     // Create a new course with the given details
//     const newCourse = await Course.create({
//       courseName,
//       courseDescription,
//       instructor: instructorDetails._id,
//       whatYouWillLearn: whatYouWillLearn,
//       price,
//     //   tag,
//       category: categoryDetails._id,
//     //   thumbnail: thumbnailImage.secure_url,
//       status: status,
//       instructions,
//     })

//     // Add the new course to the User Schema of the Instructor
//     await User.findByIdAndUpdate(
//       {
//         _id: instructorDetails._id,
//       },
//       {
//         $push: {
//           courses: newCourse._id,
//         },
//       },
//       { new: true }
//     )
//     // Add the new course to the Categories
//     const categoryDetails2 = await Category.findByIdAndUpdate(
//       { _id: category },
//       {
//         $push: {
//           courses: newCourse._id,
//         },
//       },
//       { new: true }
//     )
//     console.log("HEREEEEEEEE", categoryDetails2)
//     // Return the new course and a success message
//     res.status(200).json({
//       success: true,
//       data: newCourse,
//       message: "Course Created Successfully",
//     })
//   } catch (error) {
//     // Handle any errors that occur during the creation of the course
//     console.error("yeh rhi bhai",error)
//     res.status(500).json({
//       success: false,
//       message: "Failed to create course",
//       error: error.message,
//     })
//   }
// }
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
// exports.editCourse = async (req, res) => {
//   try {
//     const { courseId } = req.body
//     const updates = req.body
//     const course = await Course.findById(courseId)

//     if (!course) {
//       return res.status(404).json({ error: "Course not found" })
//     }

//     // If Thumbnail Image is found, update it
//     if (req.files) {
//       console.log("thumbnail update")
//       const thumbnail = req.files.thumbnailImage
//       const thumbnailImage = await uploadImageToCloudinary(
//         thumbnail,
//         process.env.FOLDER_NAME
//       )
//       course.thumbnail = thumbnailImage.secure_url
//     }

//     // Update only the fields that are present in the request body
//     for (const key in updates) {
//       if (updates.hasOwnProperty(key)) {
//         if (key === "tag" || key === "instructions") {
//           course[key] = JSON.parse(updates[key])
//         } else {
//           course[key] = updates[key]
//         }
//       }
//     }

//     await course.save()

//     const updatedCourse = await Course.findOne({
//       _id: courseId,
//     })
//       .populate({
//         path: "instructor",
//         populate: {
//           path: "additionalDetails",
//         },
//       })
//       .populate("category")
//       .populate("ratingAndReviews")
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection",
//         },
//       })
//       .exec()

//     res.json({
//       success: true,
//       message: "Course updated successfully",
//       data: updatedCourse,
//     })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     })
//   }
// }





exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}
// Get Course List
exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      { status: "Published" },
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec()

    return res.status(200).json({
      success: true,
      data: allCourses,
    })
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Course Data`,
      error: error.message,
    })
  }
}
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })
    console.log("yeh rha instru ka course",instructorCourses)
    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section 
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}