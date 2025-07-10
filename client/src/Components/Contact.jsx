import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Button from './Button';

const Contact = ({NList}) => {
   const { user } = useSelector((state) => state.user);
   const [newuser,setnewuser] =useState({})
   const [message,setmessage]=useState('')

   useEffect(()=>{
     const userdata = async()=>{
           const res =await axios.get(`/server/user/getuser/${NList.userRef}`)
           console.log(res.data)
           setnewuser(res.data)
     }
     userdata()
   },[NList.userRef])

   const handleMessage =(e)=>{
    setmessage(e.target.value)
    console.log(message)
   }
  console.log(NList)
    return (
    
     <div className="flex flex-col mt-4">
          <div className="flex gap-2"><p>Contact to </p> <span className="font-bold">{newuser.username}</span><span>for the</span><p className="font-bold">{NList.name}</p></div>
           <textarea value={message} onChange={handleMessage} name="" id="" className="max-50 p-2  outline-none resize-none" placeholder="Write a Message"></textarea>
           <Link to={`mailto:${newuser.email}?subject=Regarding ${NList.name}&body=${message}`}><Button  text={'Send Message'} styles={'bg-blue-600 w-full text-white my-2 p-2 rounded-md'}></Button></Link>
        </div>
  )
}

export default Contact