import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input';
import { signUp } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../services/operations/authAPI';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
const VerifyEmail = () => {
    const { loading,signupData } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!signupData){
            navigate("/signup")
        }
    },[])
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const { accountType, firstName, lastName, 
            email, password,
             confirmPassword } = signupData;
        dispatch(signUp(accountType, firstName, lastName, 
            email, password,
             confirmPassword,otp,navigate));
    }
    return (
        <div className='text-white flex items-center justify-center ' >
            {
                loading ? (
                    <div>
                        loading...
                    </div>
                ) : (
                    <div>
                        <h1>Verify Email</h1>
                        <p>A Verification code has been sent to you . Enter the code below</p>
                        <form onSubmit={handleOnSubmit}>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6} // This should render 6 input fields
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} 
                            className='bg-richblack-800'
                            />}
/>
                            <button type='submit' >
                                Verify Email
                            </button>
                        </form>
                        <div>
                            <div>
                                <Link to="/login" >Back to Login </Link>
                            </div>
                            <button onClick={(()=> dispatch(sendOtp(signupData.email,navigate)))} >
                                Resent it 
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmail
