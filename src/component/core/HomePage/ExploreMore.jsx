import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';
const tabsName=[
    "Free",
    "New to Coding",
    "Most Popular",
    "Skills Path",
    "Career Path"
];
const ExploreMore = () => {
    const [currentTab , setCurrentTab] = useState(tabsName[0]);
    const [courses,setCourses] = useState(
                    HomePageExplore[0].courses
    )
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)
    const setMyCards =(value)=>{
    setCurrentTab(value);
    const result = HomePageExplore.filter((course)=> course.tag===value)
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading)
  }
    return (
    <div>
        <div className='text-4xl font-semibold text-center ' >
            Unlock the <HighlightText text={"Power of Code"} ></HighlightText>
        </div>

        < p className='text-center text-richblack-300 text-medium font-semibold mt-3' >
            Learn to build anything you can imagine 
        </p>

        <div className='flex flex-row bg-richblack-800 rounded-full items-center justify-center mb-3 mt-3 px-1 py-1 ' >
            {
                tabsName.map((element,index)=>{
                    return (
                        <div className={`text-[16px] flex flex-row items-center gap-2 ${currentTab===element? "bg-richblack-900 text-richblack-5 font-medium ":"text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer hover:ring-richblack-900 hover:text-richblack-5 px-7 py-2 `} key={index} onClick={()=>setMyCards(element)} >
                            {
                                element 
                            }
                        </div>
                    )
                })
            }
        </div>
            <div className='lg:h-[150px]   ' ></div>
            <div  className=' absolute flex flex-row gap-10 justify-center w-full items-center w-[1150px]  -translate-x-52' >
                {
                    courses.map((course,index)=>{
                        return (                                                              
                            <CourseCard key={index} course = {course} currentCard={currentCard}  setCurrentCard={setCurrentCard} ></CourseCard>
                        )
                    })
                }
            </div>
    </div>
  )
}
export default ExploreMore
