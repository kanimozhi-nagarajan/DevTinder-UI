import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constant'
import axios from 'axios'


const NavBar = () => {

  const user = useSelector(store=>store.user)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleLogout = async () =>{

    try{
  await axios.post(
    BASE_URL+
    "/logout",
    {},
    {withCredentials:true}
   )

  dispatch(removeUser())

  return navigate("/login")
}
catch(err){
  console.error(err)
}
  
}

  return (
         <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <Link to="/feed" className="btn btn-ghost text-xl">Dev Tinder</Link>
  </div>
  {user && (
  
  <div className="flex gap-2">
    <p className="form-control">Welcome ! {user.firstName}</p>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-4">
        <div className="w-10 rounded-full">
          <img
            alt="photoUrl"
            src= {user.photoURL} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
  ) }
</div>
  )
}

export default NavBar