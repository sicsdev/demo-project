import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

const Loading = () => {
    return (
        <div className='fixed left-[50%] top-[50%]'>
            <ThreeDots
            height="80"
            width="100"
            radius="9"
            color="rgb(18, 17, 66)"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        /></div>
    )
}

export default Loading