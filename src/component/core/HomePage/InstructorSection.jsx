import React from 'react'
import CTAButton from './Button'
import aunty from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import { FaArrowRight } from 'react-icons/fa'
const InstructorSection = () => {
  return (
    <div className='mt-14'>
      <div className='flex flex-row gap-20 items-center ' >
        <div className='w-[50%]' >
            <img src={aunty} alt="" className='shadow-white w-[900px]' />
        </div>


          <div className=' w-[50%]  flex flex-col gap-10' >
            <div className='text-4xl font-semibold w-[50%] ' >
                Become an 
                <HighlightText text={"Instructor"} ></HighlightText>
            </div>
            
            <p className='text-pure-greys-100 w-[90%] font-medium  '>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
            <div className='w-fit' >
            <CTAButton active={true} linkto={"/signup"} >

            <div className='flex flex-row gap-2 items-center ' >
             Start Learning Today  
             <FaArrowRight></FaArrowRight> </div></CTAButton>
            </div>  
            </div>
           

          
      </div>
    </div>
  )
}

export default InstructorSection
