const Section = require("../models/Section")
const Course = require("../models/Course")
exports.createSection = async(req,res)=>{
    try{
        //data fetch
        const {sectionName,CourseId} = req.body;

        // data valiidatte
        if(!sectionName|| !CourseId){
            return  res.status(400).json({
                message:"all fields required",
                success:false
            })
        }

        //create section
            const newSection = await Section.create({
                sectionName,
            })
        //update course with section objectID
        const updateCourse = await Course.findByIdAndUpdate(CourseId,{
            $push:{
                courseContent:newSection._id,
            },
        },
        {new:true},
        )
        //HW: upar populate krde pending h 


        return res.status(200).json({
            message:"section created suucessfully",
            success:true,
            updateCourse,
        })
    }catch(err){
        return res.status(400).json({
            message:"failed to create section",
            success:false
        })
    }
}


exports.updateSection= async(req,res)=>{
    try{
        const {sectionName,sectionId}= req.body;

        if(!sectionName|| !sectionId){
            return  res.status(400).json({
                message:"all fields required",
                success:false
            })
        }

        const updateSection= await Section.findByIdAndUpdate(sectionId,{
            sectionName,
        }
    ,{new:true})
    
    return res.status(200).json({
        message:"section  updated suucessfully",
        success:true,
        updateCourse,
    })
    }catch(err){
        return res.status(400).json({
            message:"failed to update section",
            success:false
        })
    }
}

exports.deleteSection = async(req,res)=>{
    try{
        const {sectionId}= req.body;
        if(!sectionId){
            return res.status(400).json({
                message:"require all field",
                success:false
            })
        }
        const deleteSection = await Section.findByIdAndDelete(sectionId,{new:true});
        
        
        return res.status(200).json({
            message:"section deleted sucesfuly suucessfully",
            success:true,
         
        })
    }catch(err){
        return res.status(500).json({
            message:"failed to delete section",
            success:false
        })
    }
}