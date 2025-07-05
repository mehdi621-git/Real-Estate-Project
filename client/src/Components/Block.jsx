import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

const Block = ({list,linkto,editButton,deleteButton , editButtonLink}) => {
  return (
    <div className='flex justify-between p-2 border'>
        
        <Link to = {linkto} className='flex items-center gap-2'>
        <img src={list.imageUrls[0]} alt=""  className='w-14 h-9 '/>
        <p className='font-semibold text-sm'>{list.name}</p>
        </Link>
        <div className='flex flex-col border p-2'>
          <Link to={editButtonLink}>   <Button text={'Edit'} type={'button'} styles={'text-green-600'} onclick={editButton}></Button></Link>
           <Button text={'Delete'} type={'button'} styles={'text-red-600'} onclick={deleteButton}></Button>
        </div>
    </div>
  )
}

export default Block