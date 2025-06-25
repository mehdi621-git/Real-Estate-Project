import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className='bg-slate-400'>
<div className='flex p-4 items-center justify-between mx-auto sm:max-w-6xl'>
    <Link to={'/'}>
    <h1 className=' flex flex-wrap text-sm sm:text-xl '>
            <span className='text-white font-semibold '>Mehdi</span>
            <span className='text-blue-900 font-bold'>Estate</span>

        </h1>
        </Link>
        <form action="" className='bg-slate-300 rounded-md flex items-center px-2'>
            <input type="text" placeholder='Search...' className='bg-transparent outline-none p-2 w-10 sm:w-full'/>
<IoSearchSharp className='hover:cursor-pointer '/>
        </form>
        <ul className='flex justify-between gap-4 p-2'>
        <Link to={'/'}>   <li className='hover:underline hover:cursor-pointer'>Home</li></Link> 
          <Link to={'/about'}>      <li className='hover:underline hover:cursor-pointer'>About</li></Link> 
            <Link to={'/sign-up'}>    <li className='hover:underline hover:cursor-pointer'>Signup</li></Link> 
        </ul>
</div>
    
    </header>
  )
}

export default Header