import React, { useState } from 'react'

import axios from 'axios'

import { useDispatch } from 'react-redux'

import { addUser } from '../utils/userSlice'

import { useNavigate } from 'react-router-dom'

import { BASE_URL } from '../utils/constant'
const Login = () => {

const [firstName,setFirstName] = useState('')
const [lastName,setLastName] = useState('')
const [email,setEmail]= useState('')
const [password,setPassword]= useState('') 

const [error,setError] = useState('')

const [isLoginForm,setIsLoginForm]=useState(true)

const dispatch = useDispatch()
const navigate = useNavigate()

const handleLogin = async () => {
try{
   const res = await axios.post(
    BASE_URL+
    "/login",
    {
      email,
      password
    },{withCredentials:true})

    dispatch(addUser(res.data.data))
    return navigate("/feed")
}
catch(err){
       setError(err?.response?.data)

  // console.error(err)
}
}

const handleSignUp = async() =>{
  try{
   setError("");
    const res = await axios.post(
      BASE_URL+
      "/signup",
      {
        firstName,
        lastName,
        email,
        password
      },
      {withCredentials:true}
    )

    dispatch(addUser(res.data.data))
    return navigate("/profile")
  }
  catch(err){
     setError(err?.response?.data)
    // console.error(err)
  }
}
  
  return (
    <div className = "flex justify-center items-center my-20">
    <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center"> {isLoginForm ? "Login" : "SignUp"}</h2>
    
     <div>
            { !isLoginForm  && (
          <>
             <fieldset className="fieldset">
           <legend className="fieldset-legend">First Name </legend>
              <input type="text" value={firstName} className="input" onChange={(e)=>setFirstName(e.target.value)} />
       </fieldset> 
              <fieldset className="fieldset">
           <legend className="fieldset-legend">Last Name </legend>
              <input type="text" value={lastName} className="input" onChange={(e)=>setLastName(e.target.value)} />
       </fieldset> 
       </>
)}
       <fieldset className="fieldset">
           <legend className="fieldset-legend">Email Id </legend>
              <input type="text" value={email} className="input" onChange={(e)=>setEmail(e.target.value)} />
       </fieldset> 
              <fieldset className="fieldset">
           <legend className="fieldset-legend">Password </legend>
              <input type="password" value={password} className="input" onChange={(e)=>setPassword(e.target.value)} />
       </fieldset> 
</div>
<p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" 
      onClick={isLoginForm ? handleLogin : handleSignUp}> 
      {isLoginForm ?"Login":"SignUp"}
      </button>
    </div>
          <p className = "m-auto cursor-pointer py-2" 
      onClick={()=>{    
      setIsLoginForm ((value)=>(!value)),
      setError(''),
      setFirstName(''),
      setLastName(''),
      setEmail(''),
      setPassword('')}
      } >
        {isLoginForm? 
        "New User?Click here to SignUp!" 
         :"Existing User? Click here to Login!"}
        </p>
  </div>
</div>
</div>
  )
}

export default Login