import React, { useRef, useEffect } from 'react'
import Button from '../Button/Button'
import Card from '../Card/Card'
import { XMarkIcon } from '@heroicons/react/24/outline';

const Modal = ({ title, show, setShow, children, className, showCancel = false, customHideButton = false, closeFunction, hr = true, alignment = 'items-center' }) => {
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
                    <Card className={` justify-center ${alignment}   flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-2`}
                    >
                        <div className={`relative max-h-[80vh] sm:max-h-none overflow-y-auto my-6 mx-auto ${className}`}>
                            <div ref={divRef} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className={`flex items-center justify-between ${hr === true && ("py-3 border-b border-solid border-slate-200")} py-3 px-3 rounded-t`}>

                                    <span
                                        className={`flex justify-start cursor-pointer items-center  font-bold rounded-t-lg active `}
                                        aria-current="page"
                                    >
                                        {title}
                                    </span>
                                    {customHideButton === true ?
                                        <Button className="text-border font-normal font-sm" onClick={() => { setShow(false); closeFunction() }}>
                                            <XMarkIcon className="h-8 w-8 rounded-lg text-black bg-[#f1f1f1] hover:bg-[#eef0fc] hover:text-[#334bfa] p-2" />
                                        </Button> :
                                        showCancel && (
                                            <div className='flex justify-end gap-2'>
                                                <div className='cursor-pointer' onClick={() => setShow(false)}>
                                                    <XMarkIcon className='h-8 w-8 rounded-lg text-black bg-[#f1f1f1] hover:bg-[#eef0fc] hover:text-[#334bfa] p-2' />
                                                </div>
                                            </div>
                                        )
                                    }

                                </div>
                                {/*body*/}
                                <div className={`relative ${hr === true ? ("p-3") : "px-3"} flex-auto`}>
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