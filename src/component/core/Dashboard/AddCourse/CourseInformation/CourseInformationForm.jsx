import React, { useEffect,useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, fetchCourseCategories,editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import Upload from '../Upload';
import ChipInput from './ChipInput';
import RequirementFields from './RequirementField';
import Iconbtn from '../../../../common/iconbtn';
import { toast } from 'react-toastify';
import { setStep,setCourse } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
const CourseInformationForm = () => {
  const {
    register,handleSubmit,setValue,getValues,formState:{errors},}=useForm();

  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth);
  const{course,editCourse}= useSelector((state)=>state.course);
  const [loading, setLoading] = useState(false)
  const [courseCategory,setCourseCategory] = useState([]);
   
  useEffect(()=>{
    const getCategories = async ()=>{
      setLoading(true);
      const categories = await fetchCourseCategories();
      if(categories.length>0){
        setCourseCategory(categories);
       
      }
       setLoading(false)
    }
    if(editCourse){
      setValue("courseTitle",course.courseName);
      setValue("courseShortDesc",course.courseDescription);
      setValue("coursePrice",course.price);
      setValue("courseTags",course.tag);
      setValue("courseBenefits",course.whatYouWillLearn);
      setValue("courseCategory",course.category);
      setValue("courseImage",course.thumbnail);

    }
    getCategories();
  },[])

  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==course.instructions.toString() ||
       currentValues.courseImage !== course.thumbnail 
      ) {
      return true
    }
    return false
  }

  // handle next button click
  const onSubmit = async(data)=>{
        if(editCourse){
          
          if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()

          formData.append("courseId",course._id);
          if(currentValues.courseTitle!==course.courseName){
            formData.append("courseName" ,data.courseTitle);
          }
             if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        // if (currentValues.courseTags.toString() !== course.tag.toString()) {
        //   formData.append("tag", JSON.stringify(data.courseTags))
        // }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage) 
        }
        setLoading(true);
        const result = await editCourseDetails(formData,token);
        setLoading(false);
        console.log("yeh rha result ",result)
        if(result){
         
          dispatch(setStep(2))
          dispatch(setCourse(result));
        }
        }
        else{
          toast.error("No cahnge mode to the form");
        }
        return;
      }
      
      const formData = new FormData();
       formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    // formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)

    setLoading(true);
    const result = await addCourseDetails(formData,token);
    if(result ){
      console.log(result)
       dispatch(setStep(2))
      dispatch(setCourse(result));
    }
    setLoading(false)
    console.log("printig form data", formData);
  }
  return (
   <form onSubmit={handleSubmit(onSubmit)} className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8' >

    <div>
      <label htmlFor='courseTitle'>Course Title <sup>*</sup></label>
      <input  id='courseTitle' placeholder='Enter Course Title' {...register("courseTitle",{required:true})} className='w-full p-2 rounded-md  bg-richblack-300' />
      {
        errors.courseTitle && (
          <span>Course Title is Required**</span>
        )
      }

    </div>
    <div>
      <label htmlFor='courseShortDesc'>Curse Short Description <sup>*</sup></label>
      <textarea name="" id="courseShortDesc" placeholder='Enter Description' {...register("courseShortDesc",{required:true})} className='min-h-[140px] p-2 bg-richblack-300  rounded-md w-full' >
        {
          errors.courseShortDesc && (<span>
            Course Description is Required**
          </span>)
        }
      </textarea>
    </div>
       <div className='relative'>
      <label htmlFor='coursePirce'>Course Price <sup>*</sup></label>
      <input  id='coursePrice'  {...register("coursePrice",{required:true,valueAsNumber:true})} className='w-full rounded-md bg-richblack-300 pl-[40px] p-2' />
      <HiOutlineCurrencyRupee  size={30} className='absolute bottom-2       text-richblack-400' ></HiOutlineCurrencyRupee>
      {
        errors.coursePrice && (
          <span>Course Price is Required**</span>
        )
      }


    </div>
    {/* <div>
      <label htmlFor="courseCategory"  >Course Category <sup>*</sup>
      </label>
      <select name="" id="courseCategory" defaultValue="" {...register("courseCategory",{required:true})} >
        <option value="" disabled >Choose a Category</option>
        {
          !loading && courseCategory.map((category,index)=>(
            <option key={index} value={category?.id} >{category?.name}</option>
          ))
        }
      </select>
    {
      errors.courseCategory &&(
        <span>Course Category is Required**</span>
      )
    }
    </div> */} 




    {/* create a scustm component for  tags input */}
    {/* <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      /> */}

       <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      <div>
        <label htmlFor="">Benefits of the Course <sup>*</sup></label>
        <textarea name="" id="courseBenefits" placeholder='Enter Benefits of the course' {...register("courseBenefits",{required:true})} className='min-h-[130px] p-2 rounded-md bg-richblack-400 w-full' ></textarea>
        {
          errors.courseBenefits && (
            <span>Course Benefits is Required**</span>
          )
        }
      </div>

      <RequirementFields name="courseRequirements" label="requirements/Instructions" register={register} errors={errors} setValue={setValue} getValues={getValues} ></RequirementFields>
       <div>
        {
          editCourse && (
            <button onClick={()=>dispatch(setStep(2))} className='flex items-center gap-x-2  bg-richblack-300 ' >
              Continue Without Saving
            </button>
          )
        }
        <Iconbtn text={!editCourse ? "Next":"Save Changes"} ></Iconbtn>
       </div>
   </form>
  )
}

export default CourseInformationForm
