'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Button from '../../Common/Button/Button'
import { usePathname, useRouter } from 'next/navigation';
import { CodeBracketSquareIcon, ShareIcon, WrenchScrewdriverIcon, UserGroupIcon, HomeIcon, QuestionMarkCircleIcon, ArrowLeftIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { getUserProfile } from '@/app/API/components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../store/slices/userSlice';

const Sidebar = ({ children }) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.user.data)
    const router = useRouter();
    const pathname = usePathname();
    const defaultPhoto = 'https://cdn-icons-png.flaticon.com/256/149/149071.png'
    console.log("ussr", state)
    useEffect(() => {
        if (!state) {
            dispatch(fetchProfile())
        }
    }, [state])

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('Token');
        router.push('/');
    };


    const SideBarRoutes = [
        {
            href: '/dashboard',
            name: 'Home',
            icon: <HomeIcon className="h-6 w-6 text-gray-500" />,

        },
        {
            href: '/dashboard/policies',
            name: 'Policies',
            icon: <CodeBracketSquareIcon className="h-6 w-6 text-gray-500" />,


        },
        {
            href: '/dashboard/integrations',
            name: 'Integrations',
            icon: <ShareIcon className="h-6 w-6 text-gray-500" />,

        },
        {
            href: '/dashboard/members',
            name: 'Members',
            icon: <UserGroupIcon className="h-6 w-6 text-gray-500" />,

        },
    ]
    const SideBarSetting = [

        {
            href: '/dashboard/policies',
            name: 'Support Center',
            icon: <QuestionMarkCircleIcon className="h-6 w-6 text-gray-500" />

        },
        {
            href: '/dashboard/setting',
            name: 'Setting',
            icon: <WrenchScrewdriverIcon className="h-6 w-6 text-gray-500" />

        },
    ]
    return (
        <>

            <nav className="fixed top-0 z-50 w-full bg-sidebar">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between text-white    ">
                        <div className="flex items-center justify-start">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <Link href="/" className="flex ml-2 md:mr-24">
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Tempo</span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ml-3">

                                <div className='mx-4'>
                                    {state?.email}
                                </div>
                                <div className="relative">
                                    <button
                                        type="button"
                                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                        aria-expanded={isOpen}
                                        onClick={handleToggle}
                                        data-dropdown-toggle="dropdown-user"
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <img className="w-8 h-8 rounded-full" src={state?.thumbnail || defaultPhoto} alt="user photo" />
                                    </button>

                                    {isOpen && (
                                        <ul className="absolute right-0 mt-2 py-2 bg-white rounded shadow-lg">
                                            <li>
                                                <button
                                                    type="button"
                                                    className="block px-4 text-black hover:bg-gray-200"
                                                    onClick={handleLogout}
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    )}

                                </div>
                                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm text-gray-900 dark:text-white" role="none">
                                            Neil Sims
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                            neil.sims@flowbite.com
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar" className="fixed  top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-sidebar border-r border-gray-200 sm:translate-x-0 flex flex-col" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-sidebar  text-white">
                    <ul className="space-y-2 font-medium  w-full relative">
                        <li>
                            <Link href="#" className=" flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                <span className="ml-3">Default Agent</span>
                            </Link>
                        </li>
                        {SideBarRoutes.map((element, key) =>
                            <li key={key}>
                                <Link href={element.href} className={`${pathname === element.href && ("bg-linkhover")} flex items-center p-2 text-gray-900 rounded-lg hover:bg-linkhover`}>

                                    {element.icon}
                                    <span className="flex-1 ml-3 whitespace-nowrap text-sm font-normal">{element.name}</span>
                                </Link>
                            </li>
                        )}
                    </ul>
                    <div className='absolute bottom-0 w-[90%] text-sm mb-5'>
                        <ul className="space-y-2 font-medium flex flex-col ">
                            {SideBarSetting.map((element, key) =>
                                <li key={key}>

                                    <Link href={element.href} className={`${pathname === element.href && ("bg-linkhover")} flex items-center p-2 text-gray-900 rounded-lg hover:bg-linkhover`}>

                                        {element.icon}
                                        <span className="flex-1 ml-3 whitespace-nowrap text-sm font-normal">{element.name}</span>
                                    </Link>
                                </li>
                            )}

                            <li className='text-center'>
                                <Button type={'button'} className={'bg-sidebar text-white text-sm border w-full px-8 mx-auto py-1 border-white'}>Upgrade</Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">
                <div className="p-4  rounded-lg dark:border-gray-700 mt-14">
                    {children}
                </div>
            </div>


        </>
    )
}
export default Sidebar