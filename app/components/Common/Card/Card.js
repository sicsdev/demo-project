import React from 'react'

const Card = (props) => {
  return (
    <div className='bg-white rounded-lg p-3 sm:p-5 md:p-5 lg:p-5 shadow-2xl'>
        {props.children}
    </div>
  )
}

export default Card