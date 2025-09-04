import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import {addRequests, removeRequests } from '../utils/requestsSlice'

const Requests = () => {

  const requests = useSelector((store)=>store.requests)

  const dispatch = useDispatch()

  const getRequests = async ()=>{

    try{

      const res  = await axios.get(
        BASE_URL+
        "/user/requests/received",
        {withCredentials:true})

        dispatch(addRequests(res.data.data))
    }
    catch(err){
      console.error(err)
    }
  }
 useEffect(()=>{
    getRequests()
  },[])


  const reviewRequest = async (status,requestId) =>{

    try{

       await axios.post(
        BASE_URL+
        "/request/review/" + status + "/" + requestId,
        {},
        {
          withCredentials:true
        }
      )
  
      dispatch(removeRequests(requestId))

    }
    catch(err){
      console.error(err)
    }
  }


 

 if(!requests) return

 if(requests.length === 0) 
  return <h1 className='text-center mt-5 text-2xl'>
    No requests found</h1>

   return (
    <div className="text-center mx-10  rounded-2xl my-10">
      <h1 className="text-bold text-white text-3xl">Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoURL, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className=" flex justify-between  m-4 p-4 rounded-lg bg-base-300 "
          >
            <div>
              <img
                alt="photo"
                className="w-30 h-30 rounded-full"
                src={photoURL}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="flex mt-10">
              <button
                className="btn btn-primary mx-2 "
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Requests