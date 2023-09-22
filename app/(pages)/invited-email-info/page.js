'use client'
import React from "react"
import Container from '../../components/Container/Container'
import Button from "@/app/components/Common/Button/Button"
import { fillInvitedUserInfo } from "@/app/API/pages/Login"
import { useState } from "react"
import { useRouter } from "next/navigation"
import PhoneInput from "react-phone-input-2"
import 'react-phone-input-2/lib/style.css'

const page = () => {
    const router = useRouter()
    const [errors, setErrors] = useState('')
    const [loading, setLoading] = useState(false)
    const [inputValues, setInputValues] = useState({
        name: '',
        phone: '',
        new_password: '',
        password_confirm: '',
        phone_prefix: ''
    })


    const postInfo = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            setErrors('')
            setLoading(true)
            await fillInvitedUserInfo(inputValues)
            setLoading(false)
            router.push("/dashboard");
        } else {
            setErrors(validationErrors);
            setLoading(false)
        }
        setLoading(false)
    }


    const handleInputValues = (e) => {
        const { name, value } = e.target;
        setInputValues({
            ...inputValues,
            [name]: value
        });
    }

    const validateForm = () => {
        const { name, phone, new_password, password_confirm, phone_prefix } = inputValues;
        const minPasswordLength = 6;
        const errors = {};

        if (!name.trim()) {
            errors.name = "Full Name is required.";
        }

        if (!phone) {
            errors.phone = "Cell Phone is required.";
        }

        if (!phone_prefix) {
            errors.phone = "Phone prefix is required.";
        }

        if (!new_password) {
            errors.new_password = "New Password is required.";
        } else if (new_password.length < minPasswordLength) {
            errors.new_password = "New Password should be at least 6 characters.";
        }

        if (!password_confirm) {
            errors.password_confirm = "Password Confirm is required.";
        } else if (password_confirm !== new_password) {
            errors.password_confirm = "Password Confirm must match the New Password.";
        }

        return errors;
    };

    const handlePhoneChange = (value, country, e, formattedValue) => {
        const extractedPrefix = `+${country.dialCode}`;
        const phoneWithoutPrefix = extractedPrefix.replace('+', '')
        const extractedNumber = value.replace(phoneWithoutPrefix, '').trim();
        setInputValues({ ...inputValues, phone_prefix: extractedPrefix, phone: extractedNumber })
    };

    return (
        <Container>
            <div className="rounded-lg mx-auto text-center py-5">
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
                            onChange={handleInputValues}
                        />
                    </div>
                    <div className="flex justify-start gap-4 items-center  pl-5 py-4 border border-l-0 border-r-0 border-border">
                        <span className="text-start text-sm font-normal w-[100px] text-black">
                            Cell Phone
                        </span>

                        <PhoneInput
                            placeholder="Phone Number"
                            countryCodeEditable={false}
                            disableDropdown={false}
                            country={"us"}
                            autoFormat={false}
                            inputProps={{
                                autoFocus: false,
                                id: "phoneNumber",
                                name: " ",
                                style: {
                                    width: "100%",
                                    paddingLeft: 50,
                                },
                                className: "lg-form-control form-border",
                            }}
                            onChange={handlePhoneChange}
                        />
                    </div>


                    <div className="flex justify-start gap-4 items-center  pl-5 p-1 border border-t-0 border-l-0 border-r-0 border-border">
                        <span className="text-start text-sm font-normal w-[100px] text-black">
                            Password
                        </span>
                        <input
                            type={"password"}
                            placeholder={"New password"}
                            className={
                                "p-4 w-full  focus:outline-none focus:border-0 focus:ring-0   invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-0 focus:invalid:ring-0 "
                            }
                            name="new_password"
                            id={"new_password"}
                            onChange={handleInputValues}
                        />
                    </div>
                    <div className="flex justify-start gap-4 items-center  pl-5 p-1 border border-t-0   border-b-0  border-l-0 border-r-0 border-border">
                        <span className="text-start text-sm font-normal w-[100px] text-black">
                            Password Confirm
                        </span>
                        <input
                            type={"password"}
                            placeholder={"Confirm your password"}
                            className={
                                "p-4 w-full  focus:outline-none focus:border-0 focus:ring-0   invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-0 focus:invalid:ring-0 "
                            }
                            name="password_confirm"
                            id={"password_confirm"}
                            onChange={handleInputValues}
                        />
                    </div>
                </div>

                {Object.keys(errors).length > 0 && (
                    <div className="text-red-500">
                        {Object.values(errors).map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}

                <Button type={"submit"} disabled={loading} onClick={postInfo} className="flex mx-auto mt-4 justify-center px-4 py-2 text-white hover:border hover:bg-white hover:text-black bg-primary border border-gray-300 rounded-md shadow-sm checkout w-1/2">
                    {loading ? "Loading..." : "Start Now"}
                </Button>
            </div>
        </Container>
    )
}

export default page