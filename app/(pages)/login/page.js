"use client"
import React, { useEffect, useState } from 'react'
import Container from '../../components/Container/Container'
import Button from '../../components/Common/Button/Button'
import { Input } from '../../components/Common/Input/Input'
import Link from 'next/link'
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux'
import { setUserInfo, userLogin } from '../../components/store/slices/userInfoSlice'
// import GoogleLogin from 'react-google-login';
// import { gapi } from 'gapi-script';
import { editUserValueByOauth, fetchProfile } from '@/app/components/store/slices/userSlice'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {

    const clientID = "291660548280-kgl41h6mlimvvsba82ktv5mfq6rd3or6.apps.googleusercontent.com"

    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get('password');
    const as = searchParams.has('dashboard');

    const isLogged = localStorage.getItem('Token');

    useEffect(() => {
        if (search) { setShow(true) }
        if (isLogged) { router.push('/dashboard') }
    }, [search])

    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [error, setError] = useState('')
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    })


    // Handlers
    const handleFormValues = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async () => {
        setLoading(true);
        console.log(formValues)

        let result = dispatch(userLogin(formValues));
        // let result = dispatch(fetchProfile(formValues))

        result.then(res => {
            console.log(res.payload)
            if (res.payload.token) {
                localStorage.setItem('Token', res.payload.token);
                router.push('/dashboard');
            }
        })
        setLoading(false);
    }

    const onSuccess = (res) => {
        // should call api to check if user exist or we should create, and then get user token.
        console.log('Login Success: currentUser:', res);
        console.log('Login with Oauth not working yet until we have endpoint to get User Token');
        // dispatch(editUserValueByOauth(res.profileObj))
        // localStorage.setItem('Token', res.profileObj.googleId);
        // router.push('/dashboard');
    }

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
    }

    return (
        <GoogleOAuthProvider clientId={clientID}>
            <Container>
                {show && (
                    <div
                        className="mb-3 hidden w-full items-center rounded-lg bg-[#86efac] mt-5 px-6 py-5 text-thin text-white data-[te-alert-show]:inline-flex"
                        role="alert"
                        data-te-alert-init
                        data-te-alert-show>
                        You will receive an email with instructions on how to reset your password in a few minutes.
                        <button
                            type="button"
                            className="ml-auto box-content rounded-none border-none p-1 text-warning-900 opacity-50 hover:text-warning-900 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                            data-te-alert-dismiss
                            aria-label="Close"
                            onClick={(e) => { setShow(false) }}>
                            <span
                                className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
                                <XMarkIcon className="h-6 w-6 text-gray-500" />
                            </span>
                        </button>
                    </div>
                )}
                <div className='w-full sm:w-[40%] md:w-[70%] lg:w-[40%] mx-auto text-center'>

                    <h1 className='text-center text-2xl tracking-wide sm:text-3xl md:text-4xl lg:text-5xl my-2 font-bold text-heading'>Welcome.</h1>
                    {/* <Button className="flex w-full mx-auto mt-4 justify-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#4285F4" d="M17.64 9.204c0-.64-.057-1.255-.166-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.78 2.715v2.26h2.876c1.685-1.547 2.66-3.826 2.66-6.556z" />
                            <path fill="#34A853" d="M9 18c2.396 0 4.405-.786 5.876-2.14l-2.877-2.26c-.796.536-1.823.85-2.998.85-2.298 0-4.245-1.54-4.948-3.61H1.04v2.27A8.996 8.996 0 0 0 9 18z" />
                            <path fill="#FBBC05" d="M3.052 10.41A5.41 5.41 0 0 1 2.777 9c0-.59.104-1.162.276-1.698V4.032H1.04A8.996 8.996 0 0 0 1.04 14h2.987c.703-2.07 2.65-3.61 4.948-3.61 1.175 0 2.202.314 2.998.85l2.877-2.26C13.405.787 11.395 0 9 0A8.996 8.996 0 0 0 1.04 4.73L3.052 6.94z" />
                            <path fill="#EB4335" d="M9 3.58c1.304 0 2.47.45 3.39 1.326l2.547-2.548C13.403.786 11.393 0 9 0 6.65 0 4.703.314 3.052.95L.475.45C1.945.204 4.004 0 6.224 0 8.1 0 9.753.482 11.127 1.405l2.165-2.165C13.436.59 11.426 0 9 0A8.996 8.996 0 0 0 1.04 4.73L3.052 6.94C4.412 4.83 6.65 3.58 9 3.58z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">Sign in with Google</span>
                    </Button> */}
                    <div className='flex w-full mx-auto mt-4 justify-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm"'>
                        <GoogleLogin
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                        >
                        </GoogleLogin>
                    </div>
                    <div className="flex items-center w-full mx-auto mt-4">
                        <hr className="flex-grow border-gray-300" />
                        <p className="mx-4">Or, sign in with your email</p>
                        <hr className="flex-grow border-gray-300" />
                    </div>
                    <form>
                        <label className="block my-5" htmlFor='email'>
                            <span className="block text-start text-sm font-normal text-border">Work Email</span>
                            <Input type={"email"} placeholder={"name@company.com"} className={"w-full border mx-auto mt-4"} name='email' value={formValues.email} id={"email"} onChange={(value) => { handleFormValues(value) }} />
                        </label>
                        <label className="block my-5" htmlFor='email'>
                            <span className="block text-start text-sm font-normal text-border">Password</span>
                            <Input type={"password"} placeholder={"password"} className={"w-full border mx-auto mt-4"} name='password' value={formValues.password} id={"password"} onChange={(value) => { handleFormValues(value) }} />
                        </label>
                        {error && <p className="text-red-500 text-sm text-center mb-2"> &#9888; {error}</p>}

                        <div className='flex justify-between'>
                            <div className="flex items-center mr-4">
                                <Input id="inline-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={(value) => { console.log(value) }} />
                                <label htmlFor="inline-checkbox" className="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">Keep me signed in</label>
                            </div>
                            <div><Link href="/forgot-password" className="font-normal text-border dark:text-blue-500 underline">Forgot your password?</Link></div>
                        </div>
                        <Button className="flex w-full mx-auto mt-4 justify-center px-4 py-2 text-white hover:border hover:bg-white hover:text-black bg-black border border-gray-300 rounded-md shadow-sm" disabled={false} onClick={handleLogin}>{loading ? 'Loading...' : 'Sign In'}</Button>
                    </form>
                </div>
            </Container >
        </GoogleOAuthProvider>
    )
}

export default Login