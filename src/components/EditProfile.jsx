import axios from 'axios'
import {useState} from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constant'
import { addUser } from '../utils/userSlice'
import UserCard from './UserCard'


const EditProfile = () => {

  const userData = useSelector((store) => store.user)

  const [firstName, setFirstName] = useState(userData.firstName)
  const [lastName, setLastName] = useState(userData.lastName)
  const [age, setAge] = useState(userData.age || "" )
  const [gender, setGender] = useState(userData.gender || "")
  const [photoURL, setPhotoURL] = useState(userData.photoURL || "")
  const [about, setAbout] = useState(userData.about || "")

  const [error, setError] = useState("")
  const [showToast, setShowToast] = useState(false)

  const dispatch = useDispatch()

  const handleEditProfile = async () =>{

    try{

      setError("")
    const res = await axios.patch(BASE_URL+"/profile/edit",
      {
        firstName,
        lastName,
        age,
        gender,
        photoURL,
        about,
    },
    {withCredentials:true})

    dispatch(addUser(res?.data?.data))

    setShowToast(true)
    setTimeout(()=>{
      setShowToast(false)
    },3000)


    }
    catch(err){
      setError(err?.response?.data)
    }
  }

  return (
<div className=" flex justify-center">
    <div className = "flex justify-center items-center my-20">
    <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center"> Edit Profile</h2>
     <div>
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
       <fieldset className="fieldset">
           <legend className="fieldset-legend">Age</legend>
              <input type="number" value={age} className="input" onChange={(e)=>setAge(e.target.value)} />
       </fieldset> 
       <fieldset className="fieldset">
           <legend className="fieldset-legend">Photo URL</legend>
              <input type="text" value={photoURL} className="input" onChange={(e)=>setPhotoURL(e.target.value)} />
       </fieldset>

<fieldset className="fieldset">
              <select defaultValue="Select the gender" className="select select-primary" onChange={(e)=>setGender(e.target.value)}>
  <option disabled={true}>Select the gender</option>
  <option>male</option>
  <option>female</option>
  <option>transgender</option>
</select>
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">About</legend>
  <textarea className="textarea h-24" placeholder="About" value={about} onChange={(e)=>setAbout(e.target.value)}></textarea>
  <div className="label">Optional</div>
</fieldset>


</div>
<p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" 
      onClick={handleEditProfile}> 
       Save Profile
      </button>
    </div>
     {showToast && (
  <div className="toast toast-center">

  <div className="alert alert-success">
    <span>Profile saved successfully.</span>
  </div>
</div>)
}

  </div>


</div>
</div>
  <div className='flex justify-center items-center my-20 p-20'>
      <UserCard user={userData} />
</div>
</div>
  )
}

export default EditProfile