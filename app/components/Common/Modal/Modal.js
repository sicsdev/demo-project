import React, { useRef, useEffect } from 'react'
import Button from '../Button/Button'
import Card from '../Card/Card'
import { XMarkIcon } from '@heroicons/react/24/outline';

const Modal = ({ title, show, setShow, children, className, showCancel = false, customHideButton = false, closeFunction, hr = true, alignment = 'items-center', showTopCancleButton = true }) => {
    const divRef = useRef(null);

    useEffect(() => {
        // if (alignment === 'items-center') {
        // if (hideOutslideClick === true) {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setShow(false);
            }
        };

        // Attach event listener to the document
        document.addEventListener('click', handleClickOutside, { capture: true });

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside, { capture: true });
        };
        // }
    }, []);
    return (
        <div>
            {show ? (
                <>
                    <Card className={` justify-center ${alignment}   flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-3`}
                    >
                        <div style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} className={`relative max-h-[60vh] sm:max-h-none overflow-y-auto my-6 mx-auto ${className}`}>
                            <div ref={divRef} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-3">
                                {/*header*/}
                                <div className={`flex items-center justify-between relative ${hr === true && ("border-solid border-[#8a939e] border-slate-200")} rounded-t px-3 pt-3`}>

                                    {/* <span
                                        className={`flex justify-start cursor-pointer items-center  font-bold rounded-t-lg active `}
                                        aria-current="page"
                                    >
                                        {title}
                                    </span> */}

                                    <h2 className="text-black-color text-md !font-semibold opacity-90 undefined">
                                        {title}
                                    </h2>
                                    <div className="cursor-pointer flex justify-end" onClick={(e) => setShow(false)}>
                                        <XMarkIcon className="h-8 w-8 rounded-lg text-black p-2" />
                                    </div>
                                    {
                                        showTopCancleButton === true && (
                                            customHideButton === true ?
                                                <Button className="text-border font-normal font-sm" onClick={() => { setShow(false); closeFunction() }}>
                                                    <XMarkIcon className="h-8 w-8 rounded-lg text-[#707B89] bg-[#fff] hover:text-[#334bfa] p-2" />
                                                </Button> :
                                                showCancel && (
                                                    <div className='flex justify-end gap-2 absolute right-[8px]'>
                                                        <div className='cursor-pointer' onClick={() => setShow(false)}>
                                                            <XMarkIcon className='h-10 w-10 rounded-lg text-[#707B89] bg-[#fff] hover:text-[#334bfa] p-2' />
                                                        </div>
                                                    </div>
                                                )
                                        )
                                    }

                                </div>
                                {/*body*/}
                                <div className={`mt-1 relative ${hr === true ? ("p-3") : "px-3"} flex-auto`}>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </Card>
                    <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}</div>
    )
}

export default Modal