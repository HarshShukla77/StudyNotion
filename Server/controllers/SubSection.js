const SubSection = require("../models/SubSection")
const Section = require("../models/Section")
const cloudinary= require("cloudinary");
const {uploadImageToCloudinary} = require("../utils/imageUploader")
exports.createSubSection = async(req,res)=>{
    try{
        const {sectionId,title,timeDuration,description}= req.body;
        //extract file/vidoe
        const video = req.files.video;

        if(!sectionId ||!timeDuration||!description || !video){
            return res.status(400).json({
                message:"all fields are requirwed ",
                success:false
            })
        }

     
        //upload to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
     
        //updaye sectio  with sub section id

        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},{
            $push:{
                subSection:subSectionDetails._id
            }
        },
    {new:true})
        //return
        return res.status(200).json({
            message:"subsection created sucesfuly suucessfully",
            success:true,
            updatedSection
         
        })
    }catch(err){
        return res.status(400).json({
            message:err.message,
            success:false
        })
    }
};


exports.deleteSubSection = async(req,res)=>{
    try{
        const {SubSectionId} = req.body;
        if(!SubSectionId){
            return res.status(400).json({
                message:"all fields req",
                success:false
            })
        }

        const deletedSubSection = await SubSection.findByIdAndDelete({_id:SubSectionId},{new:true});
        return res.status(200).json({
            message:"subsection deleted sucesfuly suucessfully",
            success:true,
         
        })
    }catch(err){
        return res.status(400).json({
            message:"failed to delete subsection",
            success:false
        })
    }
}

exports.updateSubSection = async(req,res)=>{
    try{
        const {SubSectionId} = req.body;
        if(!SubSectionId){
            return res.status(400).json({
                message:"all fields req",
                success:false
            })
        }

        const updatedSubSection = await SubSection.findByIdAndUpdate({_id:SubSectionId},req.body,{new:true});
        return res.status(200).json({
            message:"subsection updated successfully",
            success: true 
        })
    }catch(err){
        return res.status(400).json({
            message:err.message,
            success:false
        })
    }
}