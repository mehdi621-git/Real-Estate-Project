import React from 'react'

const Button = ({text ,styles,disabled}) => {
  return (
   <button disabled={disabled} className={`${styles}`}>
{text}
    </button>
  )
}

export default Button