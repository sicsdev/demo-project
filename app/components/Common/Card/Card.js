import React from 'react'

const Card = ({ children, className , noshadow, ...rest}) => {
  return (
    <div  className={`rounded-lg p-3 sm:p-5 md:p-5 lg:p-5 shadow-3xl ${className} ${noshadow}` } {...rest}>
      {children}
    </div>
  )
}

export default Card