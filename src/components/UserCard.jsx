import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useDispatch } from 'react-redux'

import { removeFeed } from '../utils/feedSlice'

const UserCard = ({user}) => {

    const dispatch = useDispatch()

  if(!user){
    return <p> No user found</p>
  }

  const {_id,photoURL,firstName,lastName,age,gender,about } = user

  const requestConnection = async (status,userId) =>{

  try{

     await
     axios.post(
      BASE_URL+
      "/request/send/" + status + "/" + userId,
      { },
      {
        withCredentials:true
      }
    )

    dispatch(removeFeed(userId))
  }
  catch(err){
    console.error(err)

  }

}

  return (

    <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={photoURL}
      alt="photoURL" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName} {lastName}</h2>
    <h2 className="card-title">{age}</h2>
    <h2 className="card-title">{gender}</h2>
    <p>{about}</p>
        <div className="card-actions justify-end p-2 ">
      <button className="btn btn-secondary justify-center p-1" 
      onClick={()=>requestConnection("ignored",_id)}>Ignore</button>
      <button className="btn btn-primary justify-center p-1"
       onClick={()=>requestConnection("interested",_id)}>Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard