import React, { useState } from 'react'
import Button from '../Button/Button'
import Card from '../Card/Card'

const Modal = ({ title, show, setShow, children, className, showCancel = false }) => {
    return (
        <div>
            {show ? (
                <>
                    <Card className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className={`relative my-6 mx-auto ${className}`}>
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex justify-between items-center p-2 border-b border-border border-slate-200 rounded-t">
                                    <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-heading">{title}</span>
                                    {showCancel && (
                                        <Button className={'text-border font-normal font-sm'} onClick={() => setShow(false)}>X</Button>
                                    )}
                                </div>
                                {/*body*/}
                                <div className="relative flex-auto">
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