import React from 'react'
import Sign from "../assets/signup.png"
import Template from './Template'
const SignUp = ({setisloggedIn}) => {
  return (
    <div>
    <Template
    title="Welcome Back" 
    desc1="Build skills for today , tomorrow, and beyond "
    desc2="Eeducation to future-proof your career"
    image={Sign}
    formtype="signup"
    setisloggedIn={setisloggedIn}
    ></Template>
  </div>
  )
}

export default SignUp
