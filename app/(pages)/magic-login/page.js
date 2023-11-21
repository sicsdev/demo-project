"use client"
import { validateLinkLogin } from '@/app/API/pages/Login'
import Cookies from 'js-cookie'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { Circles } from "react-loader-spinner"
const MagicLogin = () => {
    const params = useSearchParams()
    const token = params.get("token")
    const email = params.get("email")
    const router = useRouter()
    const validateLinks = async () => {
        let payload = {
            email: email,
            token: token
        }
        const response = await validateLinkLogin(payload)
        if (response.status === 202) {
            Cookies.set("Token", response.data.token)
            router.push("/dashboard")
        }else{
            router.push("/login")
        }
    }
    useEffect(() => {
        if (token && email) {
            validateLinks()
        } else {
            router.push("/login")
        }

    }, [])
    return (
        <div className='flex items-center justify-center  h-[70vh]'>
            <div>
                <Circles
                    height="80"
                    width="80"
                    color="#F5455C"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
                <p className='text-xs mt-4  text-center'>Validating...</p>
            </div>
        </div>
    )
}

export default MagicLogin