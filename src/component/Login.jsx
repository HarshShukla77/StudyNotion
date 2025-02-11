import React from 'react'
import Template from './Template'
import loginImg from "../assets/login.png"

const Login = ({setisloggedIn}) => {
  return (
    <div className=' bg-richblack-900'>
      <Template
      title="Welcome Back"
      desc1="Build skills for today , tomorrow, and beyond "
      desc2="Education to future-proof your career"
      image={loginImg}
      formtype="login"
      setisloggedIn={setisloggedIn}
      ></Template>
    </div>
  )
}

export default Login
