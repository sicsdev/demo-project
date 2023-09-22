'use client'
import React from "react"
import Container from '../../components/Container/Container'
import Button from "@/app/components/Common/Button/Button"

const page = () => {
    return (
        <Container>
            <div className="bg-gray-100 rounded-lg mx-auto text-center py-5">
                <div className='mb-5 pb-5  w-3/4 m-auto'>
                    <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
                    <p className="text-gray-700">
                        Welcome to your <b>Tempo</b> Team! To make the most of your Tempo experience, please provide the following details to complete your profile,
                        and enter a new password in the form below.
                    </p>
                </div>
                <div className="border border-border bg-white rounded-lg w-1/2 mt-5 m-auto">

                    <div className="flex justify-start gap-4 items-center border border-t-0 border-l-0 border-r-0  border-b-0  border-top-1 border-border pl-5 p-1">
                        <span className="text-start text-sm font-normal w-[100px] text-black">
                            Full Name
                        </span>
                        <input
                            type={"text"}
                            placeholder={"Full Name"}
                            className={
                                "p-4 w-full  focus:outline-none focus:border-0 focus:ring-0   invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-0 focus:invalid:ring-0 "
                            }
                            name="name"
                            id={"name"}
                        />
                    </div>
                    <div className="flex justify-start gap-4 items-center  pl-5 p-1 border border-l-0 border-r-0 border-border">
                        <span className="text-start text-sm font-normal w-[100px] text-black">
                            Cell Phone
                        </span>
                        <input
                            type={"number"}
                            placeholder={"Cell Phone"}
                            className={
                                "p-4 w-full  focus:outline-none focus:border-0 focus:ring-0   invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-0 focus:invalid:ring-0 "
                            }
                            min={0}
                            name="phone"
                            id={"mobile"}
                        />
                    </div>
                    <div className="flex justify-start gap-4 items-center  pl-5 p-1 border border-t-0   border-b-0  border-l-0 border-r-0 border-border">
                        <span className="text-start text-sm font-normal w-[100px] text-black">
                            Password
                        </span>
                        <input
                            type={"password"}
                            placeholder={"New password"}
                            className={
                                "p-4 w-full  focus:outline-none focus:border-0 focus:ring-0   invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-0 focus:invalid:ring-0 "
                            }
                            name="password"
                            id={"password"}
                        />
                    </div>
                </div>

                <Button type={"submit"} className="flex mx-auto mt-4 justify-center px-4 py-2 text-white hover:border hover:bg-white hover:text-black bg-primary border border-gray-300 rounded-md shadow-sm checkout w-1/2">
                    Start Now
                </Button>
            </div>
        </Container>
    )
}

export default page