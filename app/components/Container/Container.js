import React from 'react'

const Container = ({children}) => {
  return (
    <div className='cursor-pointer mx-auto max-w-[90%] py-4' style={{minHeight: '60vh'}}>{children}</div>
  )
}

export default Container