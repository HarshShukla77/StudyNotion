import React, { useEffect } from 'react'
import {useState} from 'react'
import { useForm } from 'react-hook-form';
 import {contactusEndpoint} from '../../../services/operations/apiss.js';
import { apiConnector } from '../../../services/operations/apiconnector';
import CountryCode from '../../../data/countrycode.json'
const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    } = useForm();

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",

            })
        }
    },[isSubmitSuccessful,reset])

   const submitContactForm = async (data)=>{
        console.log("  Logging data",data);
        try{
            setLoading(true);
            // const response = await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
           const response= {status:"OK"}
            console.log("Response",response);
            setLoading(false);
        }catch(err){
            console.log("ERROR",err);
            setLoading(false)
        }
   }
  return (
   <form onSubmit={handleSubmit(submitContactForm)}>
      <div className='flex flex-col ' >
        <div className='flex  gap-5' >
          {/* {first name} */}
          <div className='flex flex-col'>
            <label htmlFor="firstname">First Name</label>
            <input type="text" name='firstname' id='firstname' 
            placeholder='Enter first namw' {...register("firstname",{required:true})}  className='text-black' />
                {
                    errors.firstname &&
                     <span>
                        Please enter your name
                    </span>
                }
          </div>
          {/* lasName */}
          <div className='flex flex-col' >
            <label htmlFor="lastname">Last Name</label>
            <input type="text" name='firstname' id='lastname' 
            placeholder='Enter last name' {...register("lastname",{required:true})} className='text-black' />
                
          </div>
        </div>

          {/* email */}
          <div className='flex flex-col' >
            <label htmlFor="email">Email Address</label>
            <input type="text"  name="email" id='email' placeholder='Enter email'  {...register("email",{required:true})} className='text-black' />
            {
                errors.email && 
                <span>
                    Please enter your email address
                </span>
            }
          </div>

            {/* phone number */}
            <div className='flex flex-col gap-x-10' >
                     <label htmlFor="phonenumber">Phone Number</label>   
                     <div className='flex flex-row gap-1'>
                        {/* dropdown */}
                        <div className='flex  flex-col  w-[80px]' >
                            <select name="dropdown" id='dropdown' className='bg-yellow-50  ' {...register("countrycode",{required:true})} >
                                {
                                    CountryCode.map((code,index)=>{
                                        return (
                                                <option  className='bg-richblack-800' key={index} value={code.code} >
                                                    {code.code} - {code.country}
                                                </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='flex w-[calc(100%-90px)] flex-col  '  >
                            <input type='number' name='phonenumber' id='phonenumber'
                             placeholder='12345 67890' className='text-black ' {...register("phoneNo",{required:{value:true,message:"please enter phone number"},
                                 maxLength:{value:10,message:"invalid phone number "},
                             minLength:{value:8,message:"Invalid phone number"}})} ></input>
                        </div>
                     </div>
                     {
                        errors.phoneNo && (
                            <span>
                                {errors.phoneNo.message}
                            </span>
                        )
                     }
            </div>
          {/* message */}
          <div className='flex flex-col' >
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" cols="30" rows="7" 
            placeholder='Ener Yoru message' {...register("message",{required:true})} className='text-black'
            ></textarea>
            {
                errors.message && (
                    <span>
                        Please enter your message
                    </span>
                )
            }
          </div>
        <button type='submit' className='rounded-md bg-yellow-50  text-center px-6 text-[16px] font-bold '  >
            Send Message
        </button>
        </div>
   </form>
  )
}

export default ContactUsForm
