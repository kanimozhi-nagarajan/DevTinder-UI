import React, { useEffect } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constant'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {

  const userData = useSelector((store)=>store.user)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const fetchUser = async () =>{
   
    if (userData){
      return
    };

try{ 
    const res = await axios.get(
      BASE_URL+ "/profile/view",
    {
      withCredentials:true
    }
    )

    dispatch(addUser(res.data.data))
  }
catch(err){
  if(err.status === 401){
    navigate("/login")
  }
  else{
  console.error(err)
  }
};
  }

useEffect(()=>{
  fetchUser();
},[])
  return (
    <>
    <NavBar />
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Body