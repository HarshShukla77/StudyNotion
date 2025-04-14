import React from 'react'
import CTAButton from './Button'
import HighlightText from './HighlightText'
import img1 from "../../../assets/Images/Know_your_progress.png"
import img2 from  "../../../assets/Images/Compare_with_others.svg"
import img3 from "../../../assets/Images/Plan_your_lessons.svg"
const LearningLangauageSection = () => {
  return (
    <div>
      <div className='flex mb-10 flex-col gap-5 mt-20 items-center '  >
        <div className='text-4xl font-semibold text-center' >
          Your Swiss Knife for <HighlightText text={"learning any language"} ></HighlightText>
        </div>
      <div className='text-center text-richblack-600 mx-auto text-base mt-1 font-medium w-[70%]' >
      Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
      </div>

        <div className='flex flex-row items-center justify-center mt-5' >
              <img className='object-contain -mr-32' src={img1} alt="" />
              <img src={img2} alt="" />
              <img className='object-contain -ml-36' src={img3} alt="" />
        </div>
       <div className='w-fit'>
          <CTAButton active={true} linkto={'/signup'} >
          Learn more</CTAButton>
       </div>
      </div>
     
    </div>
  )
}

export default LearningLangauageSection
