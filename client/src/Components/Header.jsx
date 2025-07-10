import React, { useEffect, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';


const Header = () => {
  const {user} = useSelector(state=>state.user)
  const [searchterm,setsearchterm] =useState('')
const navigate=useNavigate()
  const handleSubmit =(e)=>{
     e.preventDefault();
        const params = new URLSearchParams(window.location.search)
        params.set('searchterm',searchterm)
        const searchParams =params.toString()
        navigate(`/search?${searchParams}`)
  }
  useEffect(()=>{
          const searchParams =new URLSearchParams(location.search)
          const getSearchParams = searchParams.get('searchterm')
          if(getSearchParams) setsearchterm(getSearchParams)
  },[location.search])
  return (
    <header className='bg-slate-400'>
<div className='flex p-4 items-center justify-between mx-auto sm:max-w-6xl'>
    <Link to={'/'}>
    <h1 className=' flex flex-wrap text-sm sm:text-xl '>
            <span className='text-white font-semibold '>Mehdi</span>
            <span className='text-blue-900 font-bold'>Estate</span>

        </h1>
        </Link>
        <form onSubmit={handleSubmit} className='bg-slate-300 rounded-md flex items-center px-2'>
            <input type="text" onChange={(e)=>setsearchterm(e.target.value)} value={searchterm} placeholder='Search...' className='bg-transparent outline-none p-2 w-10 sm:w-full'/>
<button>
  <IoSearchSharp className='hover:cursor-pointer ' />
  </button>
        </form>
        <ul className='flex justify-between gap-4 p-2'>
        <Link to={'/'}>   <li className='hover:underline hover:cursor-pointer'>Home</li></Link> 
          <Link to={'/about'}>      <li className='hover:underline hover:cursor-pointer'>About</li></Link> 
            <Link to={'/profile'}>   {user? <img src={user.photo} alt="" className='w-7 h-7' />: <li className='hover:underline hover:cursor-pointer'>Signup</li>}</Link> 
        </ul>
</div>
    
    </header>
  )
}

export default Header