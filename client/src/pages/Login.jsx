import {Link, useNavigate} from 'react-router-dom'
import Button from '../Components/Button'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SignInFailure, SignInProgress, SignInStart } from '../redux/user/userSlice'

const Login= () => {
const [formData,setformData] = useState({})
const {loading,error}=useSelector((state)=>state.user)
const navigate =useNavigate()
const dispatch = useDispatch()
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
  dispatch(SignInStart())
     const res= await fetch('/server/auth/signin',{
      method:"POST",
      headers:{
       'Content-Type': 'application/json',
      },
     
        body: JSON.stringify(formData),
      
    })
   
    const data = await res.json();
    console.log(data)
  if(data.success == false){
      dispatch(SignInFailure(data.message))
      return
      }
dispatch(SignInProgress(data.user))
    navigate('/')
    

   } catch (error) {
   dispatch(SignInFailure(error.message))
 
   }
   
  }
  return (
    <div className='flex flex-col justify-center items-center max-w-lg mx-auto bg-slate-300 my-7 p-3 rounded-lg'>
      <h1 className='my-7 font-extrabold text-3xl'>Sign IN</h1>
      <form onSubmit={handleFormSubmit} className='flex flex-col w-full gap-4'>
<input type="text" className='p-2 border rounded-md outline-none' placeholder='Email' id="email" onChange={handleFormData}/>
<input type="text" className='p-2 border rounded-md outline-none' placeholder='Password' id="password" onChange={handleFormData}/>
<Button disabled={loading} styles='bg-slate-500 hover:opacity-95 disabled:opacity-80 rounded-md p-2' text={loading ? "Loading ... " : 'SignIn'}></Button>
      </form>
      <div className='flex gap-2 my-3 justify-start  w-full'>
        <p> Dont Have an Account?</p>
        <Link to={'/sign-up'} className='text-blue-600'>Sign UP</Link>
      

      </div>
    {error && <p className='bg-red-400 p-2 rounded-sm'>{error }</p>}
    </div>
  )
}

export default Login