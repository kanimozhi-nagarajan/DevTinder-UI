import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'
import { BASE_URL } from '../utils/constant'

const Connections = () => {

  const connections = useSelector((store)=>store.connection)

  const dispatch = useDispatch ()
  const getConnections = async () =>{
  try{

    const res = await axios.get(
      BASE_URL+
      "/user/connections",
      {withCredentials:true}
    )

      dispatch(addConnection(res.data.data))
    }
 catch(err){
  console.error(err)

 }
}

  useEffect(()=>{
  getConnections()
},[])

if(!connections) return

if(connections.length === 0) 
  return <h1 className='text-center mt-5 text-2xl'>
    No connections found</h1>
  return ( 
    <div className="flex justify-center items-center my-2 p-2">
    <div className="card bg-base-300 w-96 shadow-sm">
      <h1 className='text-center  text-2xl'>Connections</h1>

      {connections.map((connection) =>{
        const {_id,photoURL,firstName,lastName,age,gender,about}=
        connection;
        return(  
          <div
           key={_id} 
           className="card w-100 bg-base-100 rounded-2xl shadow-xl">
            <figure className="px-10 pt-10 ">
    <img
      src={photoURL}
      alt="photoURL" />
  </figure>
  <div className="card-body">
    <h2 className="card-title justify-center">{firstName} {lastName}</h2>
    {age && gender && 
     (   
      <>
       <h4 className="card-title justify-center">{age}  {gender}</h4>
     </>
    )}

    <p>{about}</p>

  </div>
  </div>
        )
      })}
</div>
</div>
  )
}
export default Connections




