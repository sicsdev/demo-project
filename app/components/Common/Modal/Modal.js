import React, { useRef, useEffect } from 'react'
import Button from '../Button/Button'
import Card from '../Card/Card'
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter, usePathname } from 'next/navigation';

const Modal = ({ title, show, setShow, children, className, showCancel = false, customHideButton = false, closeFunction }) => {
    const divRef = useRef(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setShow(false);
                router.push(`${pathname}`);
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
                    <Card className="justify-center items-start  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className={`relative w-auto sm:w-[80%] md:w-[80%] lg:w-[80%] my-6 mx-auto max-w-[100%] sm:max-w-[80%] md:max-w-[80%] lg:max-w-[80%] ${className}`}>
                            <div ref={divRef} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">

                                    <span className="flex items-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-heading p-3">
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
                                <div className="relative p-6 flex-auto">
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