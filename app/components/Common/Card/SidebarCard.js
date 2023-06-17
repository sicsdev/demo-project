import React from 'react'

const SidebarCard = ({ children, data , className,...rest}) => {
   console.log(data)
  
    return (
    <div className={`rounded-lg p-3 sm:p-5 md:p-5 lg:p-5 shadow-2xl ${className} my-side-hover` } {...rest}>
      {children}
    </div>
  )
}

export default SidebarCard