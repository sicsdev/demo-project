import React from 'react'
import Button from '../Common/Button/Button'
import Image from 'next/image'

const Workflows = ({ state }) => {
  const getInitials = (name) => {
    const words = name.split(' ');
    if (words.length === 1) {
      // If there is only one word in the name, return the first character as initials
      return words[0].charAt(0).toUpperCase();
    } else {
      // If there are multiple words, return the first character of each word as initials
      return words.map(word => word.charAt(0)).join('').toUpperCase();
    }
  }

  return (
    <>
      <div className='my-4'>
        <div className='flex justify-between gap-4 items-center'>
          <div className='flex justify-between gap-4 items-center'>
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-border rounded-lg">
              <span className="font-bold text-white">{getInitials(state.data.enterprise.name)}</span>
            </div>
            <div>
              <h3 className='text-lg font-bold text-heading'>Workflow Builder</h3>
              <p className='text-sm text-border'>{state.data.enterprise.name}</p>
            </div>
          </div>
          <div>

            <Button
              type={"button"}
              className="inline-block rounded border border-primary bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
            >
              Create
            </Button>
          </div>
        </div>
      </div>
      {/* <div>
        <h3 className='text-heading text-center font-semibold text-xl my-2'>Let workflows take care of everyday tasks </h3>
        <div className='grid grid-cols-3 gap-2 w-[90%] mx-auto my-8'>
          <div>
            <div className="relative w-full h-[200px] ">
              <Image
                fill={"true"}
                className="bg-contain mx-auto w-full"
                alt="logo.png"
                src={"https://img.freepik.com/premium-vector/automation-icon-robotic-hand-background_127544-418.jpg?w=1060"}
              />
            </div>
            <div className='flex items-start justify-between gap-2 my-2'>
              <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-[#523A28] rounded-full">
                <span className="font-normal text-white">1</span>
              </div>
              <p className='text-sm '>Think of what you’d like to do, like request feedback.</p>
            </div>
          </div>
          <div>
            <div className="relative w-full h-[200px] ">
              <Image
                fill={"true"}
                className="bg-contain mx-auto w-full"
                alt="logo.png"
                src={"https://img.freepik.com/premium-vector/automation-icon-robotic-hand-background_127544-418.jpg?w=1060"}
              />
            </div>
            <div className='flex items-start justify-between gap-2 my-2'>
              <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-[#523A28] rounded-full">
                <span className="font-normal text-white">2</span>
              </div>
              <p className='text-sm '>Think of what you’d like to do, like request feedback.</p>
            </div>
          </div>
          <div>
            <div className="relative w-full h-[200px] ">
              <Image
                fill={"true"}
                className="bg-contain mx-auto w-full"
                alt="logo.png"
                src={"https://img.freepik.com/premium-vector/automation-icon-robotic-hand-background_127544-418.jpg?w=1060"}
              />
            </div>
            <div className='flex items-start justify-between gap-2 my-2'>
              <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-[#523A28] rounded-full">
                <span className="font-normal text-white">3</span>
              </div>
              <p className='text-sm '>Think of what you’d like to do, like request feedback.</p>
            </div>
          </div>
        </div>
      </div> */}
      {/* <p className='text-center text-md text-primary cursor-pointer font-normal'>Learn about building workflows</p> */}
    </>
  )
}

export default Workflows