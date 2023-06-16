import React from 'react'

const Container = ({children}) => {
  return (
    <div className='pb-4 sm:pb-16 cursor-pointer mx-auto max-w-[90%]  py-10'>{children}</div>
  )
}

export default Container