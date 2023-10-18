import React from 'react'

const Bottombutton = () => {
  return (
    <div className="grid grid-cols-1 w-[100%] sm:flex p-8 sm:p-0 gap-4 sm:w-auto items-center mx-auto mt-[50px] mb-[2rem] justify-center">


      <button
        type="button"
        className="inline-block   px-6 pb-2 pt-2.5 text-xs rounded-xl font-medium  leading-normal bg-[white] hover:bg-[#FF5721] text-[#FF5721] font-bold hover:text-white  transition duration-150 border ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]   active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] "
      >
        <p>Get a Quote </p>
      </button>

      <button
        type="button"
        className="inline-block   px-6 pb-2 pt-2.5 text-xs rounded-xl font-medium  leading-normal bg-[#FF5721] hover:bg-[white] text-white font-bold hover:text-[#FF5721]  transition duration-150 border ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]   active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] "
      >
        <div
          className=""
          dangerouslySetInnerHTML={{
            __html: `
   <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/tempo-sales/30min'});return false;" >
   <span className="underline cursor-pointer text-white ">Chat with Sales
   </span>
   </a>
  `,
          }}
        />
      </button>
  </div>  )
}

export default Bottombutton