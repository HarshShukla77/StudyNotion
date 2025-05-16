import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import Iconbtn from '../../common/iconbtn';
import CoursesTable from './InstructorCourses/CoursesTable';

const MyCourses = () => {
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const [courses,setCourses] = useState([]);
  
    useEffect(()=>{
        const fetchCourses = async()=>{
            const result = await fetchInstructorCourses(token);
            if(result){
                setCourses(result);
            }
        }
        fetchCourses();
    },[])
  
    return (
    <div >
      <div className='flex justify-between'>
        <h1>My Courses</h1>
        <Iconbtn text="Add Course +" onClick={()=>navigate("/dashboard/add-course")} ></Iconbtn>
      </div>


      {
        courses && <CoursesTable courses={courses} setCourses={setCourses} ></CoursesTable>
      }
    </div>
  )
}

export default MyCourses
