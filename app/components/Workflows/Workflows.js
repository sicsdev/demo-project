import React from 'react'
import Button from '../Common/Button/Button'
import Image from 'next/image'

const Workflows = ({ state, createNewWorkFlow, loading }) => {
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
      <div className='mt-4'>
        <div className='flex justify-between gap-4 items-center'>
          <div className='flex justify-between gap-2 items-center'>
            {!state.data.enterprise.logo ?
              <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-border rounded-lg">
                <span className="font-bold text-white">{getInitials(state.data.enterprise.name)}</span>
              </div> :
              <div className="relative w-[30px] h-[30px] gap-1 rounded-lg">
                {/*
                <Image
                  fill={"true"}
                  className="bg-contain mx-auto w-full rounded-lg"
                  alt="logo.png"
                  src={state.data.enterprise.logo}
                />
                */}
              </div>}
            {/*
            <div>
              <h3 className='text-sm font-bold text-heading'>Workflow Builder</h3>
              <p className='text-xs text-border'>{state.data.enterprise.name}</p>
            </div>
                */}

          </div>
          <div>

            <Button
              type={"button"}
              className="inline-block ml-5 rounded border border-primary bg-primary px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
              disabled={loading === true}
              onClick={(e) => createNewWorkFlow()}
            >
              {loading ? "Loading..." : 'Create'}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Workflows