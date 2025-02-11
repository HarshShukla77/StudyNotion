import React, { useState } from 'react'
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
const SignUpForm = ({setisloggedIn}) => {
  const [formData ,setFormData] = useState({
    firstName:"",
    lastname:"",
    email:"",
    password:"",
    confirmpassword:""
  });

const [accountType,setAccountType]= useState("student");

  function changehandler(event){
    setFormData((prev)=>(
      {
        ...prev,[event.target.name]:event.target.value
      }
    ))
  }

   
  const [showpass,setPass] = useState(false);
 const navigate= useNavigate();

  function submitHandler(event){
      event.preventDefault();
      if(formData.password !== formData.confirmpassword){
          toast.error("Password Doesnt Match");
          return ;
      }
      else{
        setisloggedIn(true);
        toast.success("You are Successfully SignIn in", { position: "top-center" });
       const accountData={
        ...formData
        }
       const finalData={
        ...accountData,
        accountType 
       }
        console.log(finalData);
        navigate("/dash"); 
      }

  }
  return (
    <div className='flex flex-col  '>
      {/* stident-incructor */}
         <div className='flex gap-x-5 w-[50%] py-1 px-1  mt-5 mb-5 justify-center items-center  rounded-[20px]  bg-richblack-800'> 
          <button  onClick={()=>setAccountType("student")} className='text-richblack-25 text-[0.875rem] hover:bg-black w-[50%]  text-white rounded-[20px]'>Student</button>
          <button onClick={()=>setAccountType("instructor")} className='text-richblack-25 text-[0.875rem] hover:bg-black w-[50%] text-white rounded-[20px]'>Instructor</button>
         </div>


         <form className='flex flex-col gap-y-5' onSubmit={submitHandler}>
          {/* fist-lastname */}
          <div className='flex flex-row gap-x-5'> 
          <label htmlFor="">
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name <sup  className='text-pink-200'>*</sup></p>
            <input type="text" 
            required 
            name="firstName"
            onChange={changehandler}
            placeholder='Enter your first name'
           className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 px-4 py-2 w-full'
            value={formData.firstName}
             />
          </label>

          <label htmlFor="">
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name <sup  className='text-pink-200'>*</sup></p>
            <input type="text" 
            required 
            name="lastname"
            onChange={changehandler}
            placeholder='Enter your last name'
             className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 px-4 py-2 w-full'
            value={formData.lastname} />
          </label>
         
           </div>
           <label htmlFor="">
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address <sup className='text-pink-200'>*</sup></p>
            <input type="email" 
            required 
            name="email"
             className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 px-4 py-2 w-full'
            onChange={changehandler}
            placeholder='Enter your email'
            value={formData.email} />
          </label>

       <div className='flex flex-row gap-x-5'>

          <label className='relative' >
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Create Password <sup  className='text-pink-200'>*</sup></p>
            <input type={showpass?("text"):("password")} 
            required 
            name="password"
            
            onChange={changehandler}
             className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 px-4 py-2 w-full'
            placeholder='Enter your Password'
            value={formData.password} />
             <span className='absolute right-3 top-[37px]  cursor-pointer' onClick={()=>setPass((prev)=>!prev)}>
                    {showpass ?(<AiOutlineEyeInvisible  fontSize={20} fill='#AFB2BF'></AiOutlineEyeInvisible> ):(<AiOutlineEye fontSize={20} fill='#AFB2BF'></AiOutlineEye>)}
                   </span>
          </label>

          <label className='relative'  htmlFor="">
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Confirm Password <sup  className='text-pink-200'>*</sup></p>
            <input type={showpass?("text"):("password")} 
            required 
            name="confirmpassword"
             className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 px-4 py-2 w-full'
            onChange={changehandler}
            placeholder='Enter your Password'
            value={formData.confirmpassword} />
             <span  className='absolute right-3 top-[37px]  cursor-pointer' onClick={()=>setPass((prev)=>!prev)}>
                {showpass ?(<AiOutlineEyeInvisible  fontSize={20} fill='#AFB2BF'></AiOutlineEyeInvisible> ):(<AiOutlineEye  fontSize={20} fill='#AFB2BF'></AiOutlineEye>)}
                   </span>
          </label>
       </div>
          <button  className='bg-yellow-50 py-2  rounded-[8px] font-medium mt-6'  type='submit' >Create Account</button>

         </form>
    </div>
  )
}

export default SignUpForm
