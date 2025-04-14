import React from 'react';
import { HomePageExplore } from '../../../data/homepage-explore';

const CourseCard = ({ course, currentCard, setCurrentCard }) => {


  return (
    <div
      onClick={() => setCurrentCard(course.heading)}
      className={` w-[590px]  cursor-pointer p-4 relative -translate-y-24 ${
        currentCard === course.heading
          ? 'bg-white text-black  shadow-[12px_012px_4px_2px] shadow-yellow-50'
          : 'bg-richblack-700 text-white  '
      }`}
    >
      <div className="flex flex-col gap-4 justify-center">
        <div className="flex flex-col gap-6">
          <p className="text-xl font-bold">{course.heading}</p>
          <span>{course.description}</span>
        </div>
        <div className="flex flex-row justify-between items-center border-white border-t-2 pt-4">
          <p>{course.level}</p>
          <p>{course.lessionNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;