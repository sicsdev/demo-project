import React, { useRef, useEffect } from 'react'
import Button from '../Button/Button'
import Card from '../Card/Card'
import { XMarkIcon } from '@heroicons/react/24/outline'

const Modal = ({ title, show, setShow, children, className, showCancel = false }) => {
    const divRef = useRef(null);
    console.log("Show", show);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setShow(false)
            } 
        };

        // Attach event listener to the document
        document.addEventListener('click', handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <div>
            {show ? (
                <>
                    <Card  className="justify-start flex p-2 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div  className={`relative my-6 mx-auto ${className} flex items-center`}>
                            <div  ref={divRef} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none overflow-y-scroll h-[90vh]   sm:overflow-y-auto md:overflow-y-auto lg:overflow-y-auto sm:h-auto md:h-auto lg:h-auto xl:top-[80px] 2xl:top-[0px] ">
                                {/*header*/}
                                <div className="flex justify-between items-center p-2 border-b border-border border-slate-200 rounded-t">
                                    <span className="flex items-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-heading p-3">
                                        {title}
                                    </span>
                                    {showCancel && (
                                        <Button className="text-border font-normal font-sm" onClick={() => setShow(false)}>
                                            <XMarkIcon className="w-6 h-6 mr-2" />
                                        </Button>
                                    )}
                                </div>
                                {/*body*/}
                                <div className="relative flex-auto p-5">
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