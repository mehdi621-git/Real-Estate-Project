import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Button from '../Components/Button'
import { useState } from 'react'
import {GoogleAuthProvider , getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { SignInProgress } from '../redux/user/userSlice'
const Signup = () => {
const [formData,setformData] = useState({})
const [loading,setLoading] =useState(false)
const [error,seterror] =useState()
const navigate =useNavigate()
const dispatch =useDispatch()
  const handleFormData = (e)=>{
            setformData({
              ...formData,[e.target.id]:e.target.value
            })
            console.log(formData)
  }
  const handleFormSubmit=async(e)=>{
    e.preventDefault();
   
    console.log("Submited");
   try {
    setLoading(true)
     const res= await fetch('/server/auth/signup',{
      method:"POST",
      headers:{
       'Content-Type': 'application/json',
      },
     
        body: JSON.stringify(formData),
      
    })
     setLoading(false)
    const data = await res.json();
    console.log(data)
    if(data.statuscode === 11000){
      seterror("Email or Username Already Exists")
      return
    }else if(data.success == false){
      seterror(data.message)
      return
      }

    seterror(null)
    navigate('/sign-in')
    

   } catch (error) {
          if(data.statuscode === 11000){
      seterror("Dubplicate Key Found")
    }else {
      seterror(error.message)
      }
   }
   
  }
  const handleWithGoogle =async()=>{
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app)
      const result = await signInWithPopup(auth,provider)
      console.log(result)
      const res= await fetch('/server/auth/google',{
      method:"POST",
      headers:{
       'Content-Type': 'application/json',
      },
     
        body: JSON.stringify({
          email : result.user.email,
          username : result.user.displayName,
          photo:result.user.photoURL
        }),
      
    })
    const data =await res.json()
  if(data.success == false){
        dispatch(SignInFailure(data.message))
        return
        }
  dispatch(SignInProgress(data.user))
      navigate('/')
  console.log(data)
    } catch (error) {
       dispatch(SignInFailure(error.message))
      console.log("Enable to Connect with Google",error.message)
    }
  }
  return (
    <div className='flex flex-col justify-center items-center max-w-lg mx-auto bg-slate-300 my-7 p-3 rounded-lg'>
      <h1 className='my-7 font-extrabold text-3xl'>Sign UP</h1>
      <form onSubmit={handleFormSubmit} className='flex flex-col w-full gap-4'>
<input type="text" className='p-2 border rounded-md  outline-none' placeholder='UserName' id="username" onChange={handleFormData} />
<input type="text" className='p-2 border rounded-md outline-none' placeholder='Email' id="email" onChange={handleFormData}/>
<input type="text" className='p-2 border rounded-md outline-none' placeholder='Password' id="password" onChange={handleFormData}/>
<Button disabled={loading} styles='bg-slate-500 hover:opacity-95 disabled:opacity-80 rounded-md p-2' text={loading ? "Loading ... " : 'SignUp'}></Button>
<Button type='button' onclick={handleWithGoogle} styles='bg-red-500 hover:opacity-95 disabled:opacity-80 rounded-md p-2' text='Sign Up with Google'></Button>

      </form>
      <div className='flex gap-2 my-3 justify-start  w-full'>
        <p>Have an Account?</p>
        <Link to={'/sign-in'} className='text-blue-600'>SignIn</Link>
      

      </div>
    {error && <p className='bg-red-400 p-2 rounded-sm'>{error }</p>}
    </div>
  )
}

export default Signup