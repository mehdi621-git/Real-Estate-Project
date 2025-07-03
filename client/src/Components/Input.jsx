import React from 'react'

const Input = ({max,min,styles ,type, plc,id,defVal,onchange , req}) => {
  return (
 <input maxLength={max} minLength={min} type={type ? type : 'text'} className={`p-2 border rounded-md w-full outline-none ${styles}`} required = {req ? true :false} placeholder={plc} id={id} defaultValue={defVal} onChange={onchange}/>
  )
}

export default Input