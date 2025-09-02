import React, { useState } from 'react'

import axios from 'axios'

import { useDispatch } from 'react-redux'

import { addUser } from '../utils/userSlice'

import { useNavigate } from 'react-router-dom'

import { BASE_URL } from '../utils/constant'
const Login = () => {

const [email,setEmail]= useState('eleven@gmail.com')
const [password,setPassword]= useState('Eleven@12345') 

const dispatch = useDispatch()
const navigate = useNavigate()

const handleLogin = async () => {
try{
   const res = await axios.post(BASE_URL+"/login",
    {
      email,
      password
    },{withCredentials:true})

    dispatch(addUser(res.data.data))
    return navigate("/feed")
}
catch(err){
  console.error(err)
}
}
  
  return (
    <div className = "flex justify-center items-center my-20">
    <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>
     <div>
       <fieldset className="fieldset">
           <legend className="fieldset-legend">Email Id </legend>
              <input type="text" value={email} className="input" onChange={(e)=>setEmail(e.target.value)} />
       </fieldset> 
              <fieldset className="fieldset">
           <legend className="fieldset-legend">Password </legend>
              <input type="text" value={password} className="input" onChange={(e)=>setPassword(e.target.value)} />
       </fieldset> 
</div>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
</div>
  )
}

export default Login