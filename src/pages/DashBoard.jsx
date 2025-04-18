import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import SideBar from '../component/core/Dashboard/SideBar';
const DashBoard = () => {
    const {loading:authLoading} = useSelector((state)=>state.auth);
    const {loading:profileLoading} = useSelector((state)=>state.profile);
    

    if(profileLoading || authLoading){
        return (
            <div className='mt-10' >
                Loading...
            </div>
        )
    }
  return (
    <div className='  relative flex min-h[calc(100vh-3.5rem)] bg-richblack-900' >
      <SideBar></SideBar>
      <div className='h-[calc(100vh-3.5rem)] flex-1   overflow-auto' >
        <div className='mx-auto w-11/12 max-w-[1000px] py-10 ' >
            <Outlet></Outlet>
        </div>

      </div>
    </div>
  )
}

export default DashBoard
