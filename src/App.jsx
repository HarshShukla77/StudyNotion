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
function App() {
  const [isLogged ,setisLoggedIn] = useState(false);
  return (
    <>
 <div className=' w-full h-full bg-richblack-900' >
        <ToastContainer />
        <Nav  islogged={isLogged} setisLoggedIn={setisLoggedIn } ></Nav>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login setisloggedIn={setisLoggedIn}></Login>}></Route>
          <Route path="/signup" element={<SignUp setisloggedIn={setisLoggedIn}></SignUp>}></Route>
          <Route path="/dash" element= {
            <Private isLogged={isLogged}>
            <Dash ></Dash>
            </Private> }></Route>
        </Routes>

 </div>
    </>
  )
}  

export default App
 