import React, { useState } from 'react'
import { Link,useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { resetPassword } from '../services/operations/authAPI';
const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [formData,setFormData] = useState({
        password:"",
        confirmPassword:""
    })
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const {loading}= useSelector((state)=>state.auth);
    const handleOnchange =(e)=>{
        setFormData((prevData)=>(
           { ...prevData,
            [e.target.name]:e.target.value
           }

        ))
    }
    const {password,confirmPassword} = formData
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const token =  location.pathname.split("/").at(-1  )
        dispatch(resetPassword(password,confirmPassword,token))
    }
  return (
    <div className='text-white'>
      {
        loading? (
            <div>Loading...</div>
        ):(
            <div>
                <h1>Choose new Password</h1>
                <p>Almost done .Enter your new password and your all set</p>
                <form onSubmit={handleOnSubmit}> 
                    <label>
                        <p>New Password *</p>
                        <input className='w-full p-6 bg-richblack-600 text-richblack-5' required type={showPassword?"text":"password"} name='password' value={password} 
                        onChange={handleOnchange} placeholder='Enter your password'
                        ></input>
                        <span onClick={()=>setShowPassword((prev)=>!prev)}>
                            {
                                showPassword ? <IoMdEyeOff fontSize={24} ></IoMdEyeOff> : <FaEye fontSize={24}  ></FaEye>
                            }
                        </span>
                    </label>

                    <label>
                        <p>Confirm Password *</p>
                        <input className='w-full p-6 bg-richblack-600 text-richblack-5'  required type={showConfirmPassword?"text":"password"} name='confirmPassword' value={confirmPassword} 
                        onChange={handleOnchange} placeholder='Confirm Password'
                        ></input>
                        <span onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                            {
                                showConfirmPassword ? <IoMdEyeOff fontSize={24} ></IoMdEyeOff> : <FaEye fontSize={24}  ></FaEye>
                            }
                        </span>
                    </label>

                    <button type='submit' >Reset Password</button>
                </form>
                 <div>
                    <Link to="/login" >Back to Login </Link>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default UpdatePassword
