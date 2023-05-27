import React from 'react'

const Container = ({children}) => {
  return (
    <div className='mx-auto max-w-[90%] sm:max-w-[80%] md:max-w-[80%] lg:max-w-[80%]  py-10'>{children}</div>
  )
}

export default Container