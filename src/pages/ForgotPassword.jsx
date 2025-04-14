import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
const ForgotPassword = () => {
    const [emailSent,setEmailSent] = useState(false);
    const [email,setEmail]= useState("");
    const {loading} = useSelector((state)=> state.auth)
    const dispatch = useDispatch();
    const handleOnSubmit =(e)=>{
        e.preventDefault();
        console.log("Form submit prevented");
        dispatch(getPasswordResetToken(email,setEmailSent))
      
    }

  return (
    <div className='text-white flex justify-center items-center' >
     {
        loading ?(
            <div>Loading</div>
        ):(
            <div>
                <h1>{
                    !emailSent ? "Reset your password " : "Check Your Email" 
                     }</h1> 
                     
                     <p>
                      {  !emailSent ?
                       "Have no fear , We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery":`We have sent the reset email to ${email}` }

                     </p>
                     <form  onSubmit={handleOnSubmit} >{
                        !emailSent &&  (
                            <label>
                                <p>Email Address</p>
                                <input required 
                                type='text' 
                                name='email'
                                value ={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                placeholder='Enter Your Emsil Address'></input>
                            </label>
                        )
                     }
                     <button type="submit" >
                        {
                            !emailSent ? "Reset Password" : "Resent Email"
                        }
                     </button>
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

export default ForgotPassword
