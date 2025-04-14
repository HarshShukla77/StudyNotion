import React, { useState } from 'react'
import logo from "../assets/Logo.svg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation ,matchPath} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { FaArrowDown } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import ProfileDropDown from './core/Auth/ProfileDropDown';
import { apiConnector } from '../services/operations/apiconnector';
import { categories } from '../services/operations/apis';
import { useEffect } from 'react';
const subLinks =[
  {
    title:"Python",
    link:"/category/python",
    
  },
  {
    title:"Java",
    link:"/category/java", 
  }
 ]
const Nav = (props) => {


  const {token} = useSelector((state)=>state.auth);
  const {user} = useSelector((state)=>state.profile);
  const {totalItems} = useSelector((state)=>state.cart);
  const location = useLocation();
  const [subLinks,setSubLinks] = useState([]);
  const fetchSublinks = async()=>{
    try{
      const result =  await apiConnector("GET",categories.CATEGORIES_API);
      console.log("printing sublinks result : ", result)
      setSubLinks(result.data.data);

    }catch(err){
      console.log("could not fetch category list ");
    }
  }
  useEffect(()=>{
      fetchSublinks();
  },[])
  const matchRoute = (route)=>{
    return matchPath({path:route},location.pathname)
  }
  
  return (
    <div className='flex  justify-between items-center w-11/12 max-w-[1160x] py-4 mx-auto '>
     <Link to="/">
        <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
     </Link>
     <nav>
      <ul className='text-richblack-100 flex gap-3'>
        <li><Link to="/" >Home</Link></li>
        <li><Link to="/about">About </Link></li>
        <li><div className=' relative flex items-center gap-1 group' >
          <p>Catalog</p>
          < FaArrowDown />
          <div className='  invisible absolute left-[50%] translate-x-[-100px] translate-y-[20px] top-[50%] flex flex-col   rounded-md bg-richblack-5 p-4
           text-richblack-900 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:visible lg:w-[300px] ' > 
           <div className='absolute left-[30%] top-0 h-6 w-6 rotate-45 rounded bg-richblack-5  translate-y-[-10px]   ' ></div>
            { 
              subLinks.length ?  (
                subLinks.map((sub,index)=>(
              
                  <Link to={`${sub.link}`}  key={index}>
                    <p className='text-richblack-600' >{sub.title}</p>
                  </Link>
                
                ))
              ):
              (
                <div>No Catogories </div>
              )
            }
          </div>
          </div>
          </li>
        <li><Link to= "/contact"> Contact</Link></li> 
      </ul>
     </nav>
      {/* login-sinup - logout-Dashboard */}
      {/* <div className='flex items-center gap-4'>
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
      </div> */}
      <div className='flex gap-x-4 items-center' >
         {
          user && user?.accountType!="Instructor" && (
            <Link to="/dashboard/cart" className='relative' >
              <IoMdCart />
              {
                totalItems>0 && (
                  <span>
                    {totalItems}
                  </span>
                )
              }
            </Link>
          )
         }
         {
          token=== null && (
            <Link to="/login">
              <button className='broder border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md  ' >
                Log in
              </button>
            </Link>
          )
         }
         {
          token === null && (
            <Link to = "/signup"><button className='broder border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md  '>Sign Up</button></Link>
          )
         }
         {
          token!== null && <ProfileDropDown> </ProfileDropDown>
         }
      </div>
    </div>
  )
}

export default Nav

   