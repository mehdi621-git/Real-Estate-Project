import React from 'react'

const Button = ({text ,styles,disabled , type ,onclick}) => {
  return (
   <button type={type} onClick={onclick} disabled={disabled} className={`${styles}`}>
{text}
    </button>
  )
}

export default Button