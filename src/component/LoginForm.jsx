import React from 'react'
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import {Link} from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LoginForm = ({setisloggedIn}) => {
  const navigate=useNavigate();

    const [form,setForm] = useState({
        email:"",
        password:""

    });
    const [showpass,setPass] = useState(false);

    function changehandler(e){
        setForm((prev)=>({
            ...prev,
            [e.target.name] :e.target.value
        })
    )
    }
    function submitHandler(event){
      event.preventDefault();
      setisloggedIn(true);
      
      console.log("chal h");
      toast.success("You are Logged in", { position: "top-center" });
      navigate("/dash");
    }
  return (
    <form className='flex flex-col w-full gap-y-4 mt-6  ' onSubmit={submitHandler} >
      <label className='w-full'><p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address< sup className='text-pink-200'>*</sup></p>
      <input required type="email" value={form.email}
      onChange={changehandler}
       placeholder='Enter email address  '
       name="email"
       className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 px-4 py-2 w-full'
       /></label>
     

     <label className='w-full relative'><p  className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Password<sup className='text-pink-200'>*</sup></p>
      <input required type={showpass ? ("text"):("password")} 
      value={form.password}
      onChange={changehandler}
       placeholder='Enter your Password  ' 
       name="password"
      className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 px-4 py-2 w-full'
       />
      
       <span className='absolute right-3 top-[37px]  cursor-pointer' 
       onClick={()=>setPass((prev)=>!prev)}>
        {showpass ?(<AiOutlineEyeInvisible fontSize={20} fill='#AFB2BF'  ></AiOutlineEyeInvisible > ):(<AiOutlineEye fontSize={20} fill='#AFB2BF'></AiOutlineEye>)}
       </span>
        <Link   to="#">
       <p className='text-xs mt-1 max-w-max text-blue-100  ml-auto'>Froget Password </p> </Link>
       </label> 
      <button className='bg-yellow-50 py-2  rounded-[8px] font-medium mt-6' type='submit'
      >Sign In</button>
       <ToastContainer />
    </form>
  )
}

export default LoginForm
