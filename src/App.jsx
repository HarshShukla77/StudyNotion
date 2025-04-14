import { useState } from 'react'
import './App.css'
import Nav from './component/Nav'
import { ToastContainer, toast } from 'react-toastify';
import Home from './component/Home'
import Login from './component/Login'
import Dash from './component/Dash'
import SignUp from './component/SignUp'
import Private from './component/Private'
import 'react-toastify/dist/ReactToastify.css';
import { Route,Routes } from 'react-router-dom'
import OpenRoute from './pages/OpenRoute';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
function App() {

  return (
    <>
 <div className=' w-screen min-h-screen bg-richblack-900 flex-col font-inter' >
        <ToastContainer />
        <Nav  ></Nav>
        <Routes>
          <Route path="/" element={
        
            <Home></Home>}></Route>
            <Route path="/login" element={ <OpenRoute> <Login></Login> </OpenRoute>}></Route>
          <Route path="/signup" element={<OpenRoute><SignUp></SignUp> </OpenRoute>}></Route>
          <Route path="/forgot-password" element={<OpenRoute><ForgotPassword/> </OpenRoute>}></Route>
          <Route path="/update-password/:id" element={<OpenRoute><UpdatePassword/> </OpenRoute>}></Route>
          <Route path="/verify-email" element={<OpenRoute><VerifyEmail/> </OpenRoute>}></Route>
          <Route path="/dash" element= {<Private ><Dash ></Dash></Private> }></Route></Routes>

 </div>
    </>
  )
}  

export default App
 