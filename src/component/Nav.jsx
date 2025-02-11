import React from 'react'
import logo from "../assets/Logo.svg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
const Nav = (props) => {
  let islogged=props.islogged;
  let setislogged = props.setislogged;
  return (
    <div className='flex  justify-between items-center w-11/12 max-w-[1160x] py-4 mx-auto '>
     <Link to="/">
        <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
     </Link>

     <nav >
      <ul className='text-richblack-100 flex gap-3'>
        <li><Link to="/" >Home</Link></li>
        <li><Link to="/">About </Link></li>
        <li><Link to= "/"> Contact</Link></li> 
      </ul>
     </nav>

      {/* login-sinup - logout-Dashboard */}
      <div className='flex items-center gap-4'>
          {!islogged && 
            <Link to="/login"><button className= ' bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 ' >Login</button></Link>
            
          }
           {
            !islogged &&  
            <Link to="/signup"><button className= ' bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 '>Sign Up</button></Link>
            
          }
           { islogged &&
            <Link onClick={()=>{
              setislogged(false)
              toast.success("Logged Out")
            } } to="/"><button className= ' bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 '>Log Out</button></Link>
            
          }
           { islogged && 
            <Link to="/dash"><button className= ' bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 '>DashBoard</button></Link>
            
          }
      </div>

    </div>
  )
}

export default Nav

   