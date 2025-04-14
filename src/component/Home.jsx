import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlightText from './core/HomePage/HighlightText';
import CTAButton from './core/HomePage/Button'
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from './core/HomePage/CodeBlocks';
import TimelineSection from './core/HomePage/TimelineSection';
import ExploreMore from './core/HomePage/ExploreMore';
import InstructorSection from './core/HomePage/InstructorSection';
import LearningLangauageSection from './core/HomePage/LearningLangauageSection';
const Home = () => {
  return (
    <div >
     {/* section 1 */}
     <div className=' relative mx-auto flex flex-col w-11/12 justify-center max-w-maxContent items-center text-white h-full '>
      <Link to ={"/signup"}>
        <div className=' group mt-16 p-2  mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 
         transition-all duration-200 hover:scale-95 w-fit  hover:shadow-sm hover:shadow-richblack-400 '>
          <div className='flex flex-row items-center gap-1 rounded-full px-7 py-[5px] transition-all duration-200  group-hover:bg-richblack-900   '>
            <p>Become An Instructor </p>
            <FaLongArrowAltRight />
          </div>
        </div>
      </Link>

    <div className=' text-center text-4xl font-semibold mt-7  ' >
      Empower Your Future with 
      <HighlightText text={"Coding Skills"} ></HighlightText>
    </div>
    <div className=' w-[90%] text-center text-lg font-bold text-richblack-300 ' >
    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
    </div>
    
     
     <div className='flex flex-row gap-7 mt-8'>
      <CTAButton active={ true} linkto={"/signup"} >
        Learn More
      </CTAButton>
      <CTAButton active={ false} linkto={"/login"} >
        Book a Demo
      </CTAButton>
     </div>
    
    <div className= 'mx-3 my-10 shadow-blue-200' >
       <video   
          muted
          loop
          autoPlay>
            <source src={Banner} type="video/mp4" ></source>
       </video>
       </div>
   

    {/* code section 1  */}
    <div>
    <CodeBlocks   

          position={"lg:flex-row"}
            heading={
              <div className='text-4xl font-bold' > 
                Unlock Your  
                <HighlightText text={"coding potential"}  ></HighlightText>
                 {" "}with our online courses
              </div>
            }
          subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
            ctabtn1={{
              active:true,
              linkto:"/signup",
              btnText:"try it yourself"
            }}
            ctabtn2={{
              active:false,
              linkto:"/login",
              btnText:"learn more"
            }}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
       
    codeColor={"text-yellow-25"}
    ></CodeBlocks>
    </div>
      
    {/* {code section 2} */}
    <div>
    <CodeBlocks   

          position={"lg:flex-row-reverse"}
            heading={
              <div className='text-4xl font-bold' > 
                Unlock Your  
                <HighlightText text={"coding potential"}  ></HighlightText>
                 {" "}with our online courses
              </div>
            }
          subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
            ctabtn1={{
              active:true,
              linkto:"/signup",
              btnText:"try it yourself"
            }}
            ctabtn2={{
              active:false,
              linkto:"/login",
              btnText:"learn more"
            }}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
       
    codeColor={"text-yellow-25"}
    ></CodeBlocks>
    </div>

              <ExploreMore></ExploreMore>

    </div>

    
     {/* section 2 */}
            <div className='bg-pure-greys-5 text-richblack-700' >
              <div className='homepage_bg h-[310px]' >
                <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto' >
                  <div className='h-[150px]' ></div>
                  <div className='flex flex-row gap-7 text-white' >
                    <CTAButton active={true} linkto={"/signup"} >
                    <div className='flex items-center gap-3' >
                      Explore Full Catalog 
                      <FaLongArrowAltRight></FaLongArrowAltRight>
                      </div>
                      </CTAButton>

                      <CTAButton active={false} linkto={"/signup"} >
                    <div className='flex items-center gap-3' >
                     Learn more 
                      </div>
                      </CTAButton>

                    
                  </div>
                </div>
              </div>

            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7' >
             
                <div className='flex flex-row gap-5 mb-10 mt-[95px] ' >
                    <div className='text-4xl font-semibold w-[45%] '>
                      Get the Skills you need for a 
                      <HighlightText text={"Job that is in demand"} >

                      </HighlightText>
                    </div>
                    <div className='flex flex-col gap-10 w-[40%] items-start' >
                  <div className='text-[16px]' >
                  The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                  </div>
                  <CTAButton active={true} linkto={"/signup"} >Learn more</CTAButton>
                </div>
                </div>
                <TimelineSection></TimelineSection>

                <LearningLangauageSection></LearningLangauageSection>     
             </div>
            </div>



     {/* section 3 */}
          <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 first-letter: bg-richblack-900 text-white' > 
            <InstructorSection></InstructorSection>

            <h2 className='text-center text-4xl font-semibold mt-10' >review from other Learners</h2>
            {/* review slider h yaha pe  */}



            </div>  



     {/* section 4 */}
    </div>
  )
}

export default Home
 