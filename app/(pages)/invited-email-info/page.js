'use client'
import React, { useEffect } from "react"
import Container from '../../components/Container/Container'
import Button from "@/app/components/Common/Button/Button"
import { fillInvitedUserInfo } from "@/app/API/pages/Login"
import { useState } from "react"
import { useRouter } from "next/navigation"
import PhoneInput from "react-phone-input-2"
import 'react-phone-input-2/lib/style.css'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { fetchProfile } from "@/app/components/store/slices/userSlice"

const page = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const state = useSelector((state) => state.user.data);
    useEffect(() => {
        
        if (state === null) {
            dispatch(fetchProfile()).then((res) => {
                if (res.payload.phone.length == 0) {

                } else {
                    return router.push('/dashboard')
                }
            }
            )
        }
    }, [state])
    console.log("state", state)
    const [errors, setErrors] = useState('')
    const [loading, setLoading] = useState(false)
    const [inputValues, setInputValues] = useState({
        name: '',
        phone: '',
        new_password: '',
        confirm_password: '',
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
        const { name, phone, new_password, confirm_password, phone_prefix } = inputValues;
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
        console.log("phone",phone_prefix.length)

        if (!new_password) {
            errors.new_password = "New Password is required.";
        } else if (new_password.length < minPasswordLength) {
            errors.new_password = "New Password should be at least 6 characters.";
        }

        if (!confirm_password) {
            errors.confirm_password = "Password Confirm is required.";
        } else if (confirm_password !== new_password) {
            errors.confirm_password = "Password Confirm must match the New Password.";
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
            <div className="rounded-lg mx-auto text-center py-5 invite-email">
                <div className='mb-5 pb-5  w-3/4 m-auto'>
                    <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
                    <p className="text-gray-700">
                    Welcome to your Tempo Team! To make the most of your experience, please provide the following details to complete your profile, and enter a new password in the form below.z
                    </p>
                </div>
                <div className="border border-border bg-white rounded-lg w-full sm:w-1/2 mt-5 m-auto">

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
                            name="confirm_password"
                            id={"confirm_password"}
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
                    {loading ? <><svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                </svg>
                                                    <span>Loading...</span> </>  : "Start Now"}
                </Button>
            </div>
        </Container>
    )
}

export default page