import React, { useRef, useEffect } from 'react'
import Button from '../Button/Button'
import Card from '../Card/Card'
import { XMarkIcon } from '@heroicons/react/24/outline';

const Modal = ({ title, show, setShow, children, className, showCancel = false, customHideButton = false, closeFunction, hr = true }) => {
    const divRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setShow(false);
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
                    <Card className="justify-center items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className={`relative max-h-[80vh] sm:max-h-none overflow-y-auto my-6 mx-auto ${className}`}>
                            <div ref={divRef} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className={`flex items-center justify-between ${hr === true && ("p-5 border-b border-solid border-slate-200")} rounded-t`}>

                                    <span className="flex items-center text-xl font-semibold sm:text-2xl whitespace-break-spaces sm:whitespace-nowrap text-heading p-3">
                                        {title}
                                    </span>
                                    {customHideButton === true ?
                                        <Button className="text-border font-normal font-sm" onClick={() => { setShow(false); closeFunction() }}>
                                            <XMarkIcon className="w-6 h-6 mr-2" />
                                        </Button> :
                                        showCancel && (
                                            <Button className="text-border font-normal font-sm" onClick={() => setShow(false)}>
                                                <XMarkIcon className="w-6 h-6 mr-2" />
                                            </Button>
                                        )
                                    }

                                </div>
                                {/*body*/}
                                <div className={`relative ${hr === true ? ("p-6") : "px-3"} flex-auto`}>
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