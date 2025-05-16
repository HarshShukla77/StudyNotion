import { useEffect, useState } from 'react'
import './App.css'
import Nav from './component/Nav'
import { ToastContainer, toast } from 'react-toastify';
import Home from './component/Home'
import Login from './component/Login'
import Dash from './component/Dash'
import SignUp from './component/SignUp'
import Private from './component/Private'
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom'
import OpenRoute from './pages/OpenRoute';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import About from './pages/About';
import MyProfile from './component/core/Dashboard/MyProfile';
import DashBoard from './pages/DashBoard';
import PrivateRoute from './component/core/Auth/PrivateRoute';
import Error from './pages/Error';
import { ACCOUNT_TYPE } from './utils/constants';
import EnrolledCourses from './component/core/Dashboard/EnrolledCourses';
import Cart from './component/core/Dashboard/Cart';
import { useSelector } from 'react-redux';
import ContactUs from './component/ContactuUs';
import AddCourse from './component/core/Dashboard/AddCourse';
import MyCourses from './component/core/Dashboard/MyCourses';
function App() {
 const {user} = useSelector((state)=>state.profile)
 useEffect(()=>{
   console.log(user);
 },[])
  return (
    <>
      <div className=' w-screen min-h-screen bg-richblack-900 flex-col font-inter' >
        <ToastContainer />
        <Nav  ></Nav>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<OpenRoute> <Login></Login> </OpenRoute>}></Route>
          <Route path="/signup" element={<OpenRoute><SignUp></SignUp> </OpenRoute>}></Route>
          <Route path="/forgot-password" element={<OpenRoute><ForgotPassword /> </OpenRoute>}></Route>
          <Route path="/update-password/:id" element={<OpenRoute><UpdatePassword /> </OpenRoute>}></Route>
          <Route path="/verify-email" element={<OpenRoute><VerifyEmail /> </OpenRoute>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/contact" element={<ContactUs></ContactUs>}></Route>

          <Route path="/dash" element={<Private ><Dash ></Dash></Private>}></Route>


          <Route element={<PrivateRoute><DashBoard></DashBoard></PrivateRoute>}   >
            <Route path='dashboard/my-profile' element={<MyProfile></MyProfile>} > </Route>

            {/* <Route path='dashboard/setting' element={<Setting></Setting>} > </Route> */}
           
            {
              user?.accountType=== ACCOUNT_TYPE.STUDENT && (
                <>
                <Route path='dashboard/cart' element={<Cart></Cart>} > </Route>
                <Route path='dashboard/enrolled-courses'element={<EnrolledCourses></EnrolledCourses>} > </Route>
                </>)
            }
              {
              user?.accountType=== ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                <Route path='dashboard/add-course' element={<AddCourse></AddCourse>} > </Route>
                 <Route path='dashboard/my-courses' element={<MyCourses></MyCourses>} > </Route>
                </>)
            }
          </Route>



          <Route path="*" element={<Error />} /> </Routes>

      </div>
    </>
  )
}

export default App
