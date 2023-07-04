'use client'
import React from "react"
import Container from '../../components/Container/Container'

const page = () => {
    return (
        <Container>
            <div className="bg-gray-100 rounded-lg p-6 mx-auto max-w-sm text-center">
                <h2 className="text-2xl font-bold mb-4">Verify Your Account</h2>
                <p className="text-gray-700">
                    Thank you for signing up! We have sent a verification email to your
                    registered email address. Please check your inbox and follow the
                    instructions to verify your account.
                </p>
                <p className="text-gray-700 mt-4">
                    If you don't receive the email within a few minutes, please check your
                    spam folder or click the button below to resend the verification email.
                </p>
                <div>
                    <button className="bg-black hover:bg-transparent border border-black hover:text-black text-white font-bold py-2 px-4 rounded mt-4">
                        Resend Email
                    </button>
                </div>
            </div>
        </Container>
    )
}

export default page