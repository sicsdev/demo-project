

"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../store/slices/userSlice";
import Cookies from "js-cookie";
import { uploadLOgo } from "@/app/API/pages/Bot";
import {
    ArrowDownOnSquareIcon,
    BanknotesIcon,
    BriefcaseIcon,
    DevicePhoneMobileIcon,
    ShareIcon,
    DocumentTextIcon,
    WrenchScrewdriverIcon,
    UserGroupIcon,
    HomeIcon,
    QuestionMarkCircleIcon,
    ClipboardIcon,
    CreditCardIcon,
    CurrencyDollarIcon,
    CodeBracketSquareIcon,
    BookOpenIcon,
    ArrowSmallRightIcon,
    AcademicCapIcon,
    ChatBubbleBottomCenterIcon,
    InboxIcon,
    UsersIcon,
    CodeBracketIcon,
    BuildingOffice2Icon,
    AdjustmentsHorizontalIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";
import { fetchRecommendation } from "../../store/slices/recommendation";
import { fetchIntegrations } from "../../store/slices/integrationSlice";
import { fetchWorkflows } from "../../store/slices/workflowSlice";
import { ArrowSmallLeftIcon, ChartBarIcon, ChevronDoubleDownIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import Loading from "../../Loading/Loading";
import { makeCapital } from "../../helper/capitalName";

const NewSidebar = ({ children }) => {
    const state = useSelector((state) => state.user.data);
    const recommedState = useSelector((state) => state.recommendation);
    const workflowState = useSelector((state) => state.workflow);
    const [collaps, setCollaps] = useState(false)

    const dispatch = useDispatch();
    const pathname = usePathname();
    const defaultPhoto = "https://cdn-icons-png.flaticon.com/256/149/149071.png";
    const [base64Data, setBase64Data] = useState({ data: "", state: false });
    const [showSubTabs, setShowSubTabs] = useState(null);
    const router = useRouter();
    useEffect(() => {
        if (!state) {
            dispatch(fetchProfile());
            dispatch(fetchRecommendation());
            dispatch(fetchIntegrations());
            dispatch(fetchWorkflows());
        }
    }, [state]);

    useEffect(() => {
        if (base64Data.state == true) {
            dispatch(fetchProfile());
            setTimeout(() => {
                setBase64Data({ state: false });
            }, [4000]);
        }
    }, [base64Data]);
    const [isOpen, setIsOpen] = useState(false);
    const [show, setShow] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("Token");
        clearCookies();
        window.location.href = "/";
    };

    const clearCookies = () => {
        const cookies = Cookies.get();
        Object.keys(cookies).forEach((cookieName) => {
            Cookies.remove(cookieName);
        });
    };

    const handlerclosemenu = (e) => {
        setShow(false);
    };

    const workflowLinkHandler = (link) => {
        if (workflowState?.data?.count > 0) {
            return `/dashboard/workflow/workflow-builder`;
        } else {
            return link

        }
    }

    const SideBarRoutes = [
        {
            href: "/dashboard",
            name: "Home",
            icon: <HomeIcon className="h-6 w-6 text-gray-500" />,
            list: [],
            isLink: true
        },
        {
            // href: "",
            href: workflowLinkHandler('/dashboard/workflow/integrations'),
            name: "Workflow Builder",
            icon: <CodeBracketSquareIcon className="h-6 w-6 text-gray-500" />,
            isLink: false,
            list: [
                {
                    href: "/dashboard/workflow/integrations",
                    name: "Integrations",
                    icon: <ShareIcon className="h-6 w-6 text-gray-500" />,
                },
                {
                    href: "/dashboard/workflow/workflow-builder",
                    name: "Workflows",
                    icon: <BriefcaseIcon className="h-6 w-6 text-gray-500" />,
                },
            ],
        },
        {
            href: "/dashboard/knowledge-center",
            name: "Learning Center",
            icon: <BookOpenIcon className="h-6 w-6 text-gray-500" />,
            isLink: false,
            list: [
                {
                    href: "/dashboard/knowledge-center",
                    name: "Knowledge Center",
                    icon: <BookOpenIcon className="h-6 w-6 text-gray-500" />,
                },
                // {
                //     href: "/dashboard/knowledge-center",
                //     name: "Recommendations",
                //     icon: <AcademicCapIcon className="h-6 w-6 text-gray-500" />,
                // },
            ],
            notification: recommedState?.data?.count,
        },
        {
            href: "/",
            name: "Tempo Chat",
            icon: <BookOpenIcon className="h-6 w-6 text-gray-500" />,
            isLink: false,
            list: [
                {
                    href: "/dashboard/chat-bots",
                    name: "Chat Bots",
                    icon: <AdjustmentsHorizontalIcon className="h-6 w-6 text-gray-500" />,
                }
            ],
        },
        {
            href: "/",
            name: "Smart Inbox",
            icon: <BookOpenIcon className="h-6 w-6 text-gray-500" />,
            isLink: false,
            list: [
                {
                    href: "/",
                    name: "Email Settings",
                    icon: <InboxIcon className="h-6 w-6 text-gray-500" />,
                }
            ],
        },
        {
            href: "/",
            name: "Smart IVR",
            icon: <BookOpenIcon className="h-6 w-6 text-gray-500" />,
            isLink: false,
            list: [
                {
                    href: "/dashboard/manage-phones",
                    name: "Phone Settings",
                    icon: <PhoneIcon className="h-6 w-6 text-gray-500" />,
                }
            ],
        },
        {
            href: "/",
            name: "Reports",
            icon: <BookOpenIcon className="h-6 w-6 text-gray-500" />,
            isLink: false,
            list: [
                {
                    href: "/dashboard/analytics",
                    name: "Chat Logs",
                    icon: <ChartBarIcon className="h-6 w-6 text-gray-500" />,
                }
            ],
        },
        {
            href: "/dashboard/billing/usage",
            name: "Billing",
            isLink: false,
            icon: <BanknotesIcon className="h-6 w-6 text-gray-500" />,
            list: [
                {
                    href: "/dashboard/billing/usage",
                    name: "Usage",
                    icon: <ArrowDownOnSquareIcon className="h-6 w-6 text-gray-500" />,
                },
                {
                    href: "/dashboard/billing/daily-limit",
                    name: "Billing Threshold",
                    icon: <CurrencyDollarIcon className="h-6 w-6 text-gray-500" />,
                },
                {
                    href: "/dashboard/billing/payment-methods",
                    name: "Payment Methods",
                    icon: <CreditCardIcon className="h-6 w-6 text-gray-500" />,
                },
                {
                    href: "/dashboard/billing/settings",
                    name: "Billing Settings",
                    icon: <WrenchScrewdriverIcon className="h-6 w-6 text-gray-500" />,
                },
            ],
        },
        {
            href: "/dashboard/knowledge-center",
            name: "Organization Settings",
            icon: <BookOpenIcon className="h-6 w-6 text-gray-500" />,
            isLink: false,
            list: [
                // {
                //     href: "/",
                //     name: "Company Details",
                //     icon: <BuildingOffice2Icon className="h-6 w-6 text-gray-500" />,
                // },
                {
                    href: "/dashboard/members",
                    name: "Team",
                    icon: <UserGroupIcon className="h-6 w-6 text-gray-500" />,
                },
                {
                    href: "/dashboard/api-references",
                    name: "API References",
                    icon: <CodeBracketIcon className="h-6 w-6 text-gray-500" />,
                }
            ],
        }
    ];

    const divRef = useRef(null);
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const divSideRef = useRef(null);
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (divSideRef.current && !divSideRef.current.contains(event.target)) {
                setShow(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64Content = reader.result;
            uploadLOgo({ logo: base64Content });
            setBase64Data({ data: base64Content, state: true });
            setTimeout(() => {
                setIsOpen(false);
            }, 1000);
        };

        reader.readAsDataURL(file);
    };

    const sendSideBarDetails = (element, key) => {
        if (element.list.length > 0) {
            return (
                <li key={key} className={`pt-1 w-full rounded-lg ${pathname === element.href && ""
                    }`}>
                    {!collaps && (<p className="pl-2 text-white font-semibold text-xs mt-1">{element?.name}</p>)}
                    <ul className="pt-1 rounded-lg">
                        {element.list.map((ele, key) => (
                            <li key={key} className={`mb-1 hover:bg-sidebar-hover hover:text-white w-full rounded-lg ${pathname === ele.href ? "bg-sidebar-hover text-white" : 'text-[#cfdae2cc]'
                                }`}>
                                <Link
                                    href={ele.href}
                                    onClick={() => handlerclosemenu(ele.href)}
                                    className={`p-2 flex items-center`}
                                >
                                    {ele.icon}
                                    {!collaps && (
                                        <span className="flex justify-between w-full ml-3 whitespace-nowrap text-[13px] font-normal transition-all duration-300 ease-in-out">
                                            {ele.name}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
            );
        }
        return (
            <li key={key} className={`p-2 hover:bg-sidebar-hover w-full rounded-lg ${pathname === element.href && "bg-sidebar-hover"
                }`}>
                <Link
                    onClick={() => {
                        setShowSubTabs(null);
                        handlerclosemenu(element.href);
                    }}
                    href={element.href}
                    className={`flex items-center  text-gray-900 rounded-lg `}
                >
                    <div className="relative">
                        {element.icon}
                        {element.notification !== 0 && (
                            <span
                                style={{ fontSize: "10px" }}
                                className="bg-[#FF0000] text-white rounded-full px-1 py-0 absolute top-[-5px] left-3"
                            >
                                {element.notification}
                            </span>
                        )}
                    </div>
                    {!collaps && (
                        <span className="flex ml-3 whitespace-nowrap text-[13px] font-normal transition-all duration-300 ease-in-out">
                            {element.name}
                        </span>
                    )}
                </Link>
                {/* </div> */}
            </li>
        );
    };
    const sendNames = (name) => {
        if (name === "Home") return "Widgets";
        if (name === "Workflows") return "Workflows";
        return name;
    };
    return (
        <>

            <>
                <nav className="block sm:hidden md:hidden lg:hiddenfixed top-0 z-50 w-full bg-sidebarbg" ref={divSideRef}>
                    <div className="px-3 py-3 lg:px-5 lg:pl-3">
                        <div className="flex items-center justify-between text-white    ">
                            <div className="flex items-center justify-start">
                                <button
                                    onClick={() => setShow((prev) => !prev)}
                                    data-drawer-target="logo-sidebar"
                                    data-drawer-toggle="logo-sidebar"
                                    aria-controls="logo-sidebar"
                                    type="button"
                                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                >
                                    <span className="sr-only">Open sidebar</span>
                                    <svg
                                        className="w-6 h-6"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            clipRule="evenodd"
                                            fillRule="evenodd"
                                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                        ></path>
                                    </svg>
                                </button>

                                <Link href="/dashboard" className="flex ml-2 md:mr-24">
                                    <img
                                        src="/logo.png"
                                        alt="logo"
                                        className="w-24 h-15 object-contain"
                                    />
                                </Link>
                            </div>
                            <div className="flex items-center" ref={divRef}>
                                <div className="flex items-center ml-3">
                                    <div className="relative">
                                        <button
                                            type="button"
                                            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                            aria-expanded={isOpen}
                                            onClick={handleToggle}
                                            data-dropdown-toggle="dropdown-user"
                                        >
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="w-8 h-8 rounded-full"
                                                src={
                                                    state?.enterprise?.logo == null
                                                        ? defaultPhoto
                                                        : state?.enterprise?.logo
                                                }
                                                alt="user photo"
                                            />
                                        </button>

                                        {isOpen && (
                                            <ul className="absolute w-[200px] text-center right-0 mt-2 py-2 bg-white rounded shadow-lg z-50">
                                                <li className="text-start p-2">
                                                    <p className="text-xs font-normal text-heading ml-4 break-all">
                                                        {state?.email}
                                                    </p>
                                                </li>

                                                <hr className="text-border border-gray" />
                                                {SideBarRoutes.map((element, key) => (
                                                    <li key={key}>
                                                        <Link
                                                            href={element.href}
                                                            className={` flex items-center p-2 text-heading  hover:bg-linkhover hover:text-white`}
                                                            onClick={() => setIsOpen(false)}
                                                        >
                                                            {/* {element.icon} */}
                                                            <span className="flex justify-between w-full ml-4 whitespace-nowrap text-sm font-normal">
                                                                {sendNames(element.name)}
                                                            </span>
                                                        </Link>
                                                    </li>
                                                ))}
                                                <li >
                                                    <Link
                                                        href={'/dashboard/api-keys'}
                                                        className={` flex items-center p-2 text-heading  hover:bg-linkhover hover:text-white`}
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {/* {element.icon} */}
                                                        <span className="flex justify-between w-full ml-4 whitespace-nowrap text-sm font-normal">
                                                            Keys
                                                        </span>
                                                    </Link>
                                                </li>
                                                <hr className="text-border border-gray" />
                                                <li className="p-2 relative hover:underline flex">
                                                    <input
                                                        className="inline-block cursor-pointer  absolute top-0 left-[28px] opacity-0 rounded-full px-6 pt-2 text-xs font-medium leading-normal text-[blue] shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                                                        id="multiple_files"
                                                        type="file"
                                                        accept="image/*"
                                                        multiple
                                                        onChange={(e) => handleFileInputChange(e)}
                                                    />
                                                    <label
                                                        className="inline-block ml-4 rounded-full text-xs font-medium    leading-normal text-heading "
                                                        for="file_input"
                                                    >
                                                        Upload logo
                                                    </label>
                                                </li>

                                                <li className="text-start text-sm font-normal pl-2 ">
                                                    <button
                                                        type="button"
                                                        className="inline-block  rounded-full ml-4 text-heading"
                                                        onClick={handleLogout}
                                                    >
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {show && (
                        <div
                            className="block bg-sidebarbg absolute  sm:hidden lg:hidden md:hidden items-centerjustify-between text-white z-[999999]  w-full md:w-auto md:order-1"
                            id="navbar-cta"
                        >

                            <ul className="space-y-2 font-medium  w-full relative">
                                {SideBarRoutes.map((element, key) =>
                                    sendSideBarDetails(element, key)
                                )}
                                <li className="p-2 hover:bg-sidebar-hover w-full rounded-lg  cursor-pointer">
                                    <Link
                                        href={"mailto:team@usetempo.ai"}
                                        className={`flex items-center  text-gray-900 rounded-lg `}
                                    >
                                        <QuestionMarkCircleIcon className="h-6 w-6 text-gray-500" />
                                        {!collaps && (
                                            <span className="flex-1 ml-3 whitespace-nowrap text-[13px] font-normal">
                                                Get Support
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </nav>
                <aside
                    id="logo-sidebar"
                    className={`hidden sm:block fixed py-5 bg-sidebarbg  text-white top-0 left-0 z-40 ${collaps ? "w-20 transition-all duration-300 ease-in-out" : "w-64 transition-all duration-300 ease-in-out"} h-[100vh]`}
                    aria-label="Sidebar"
                >
                    <div className="h-full px-2 pb-4 overflow-y-auto bg-sidebarbg  text-white">

                        <ul className="sidebar-wrapper-scroller font-medium p-2 w-full relative  bg-sidebarroute rounded-lg transition-all duration-300 ease-in-out h-2/3 overflow-y-scroll scrollbar-thumb-blue-500 scrollbar-track-blue-300">

                            {SideBarRoutes.map((element, key) =>
                                sendSideBarDetails(element, key)
                            )}
                        </ul>

                        <div className={`absolute ${!collaps && ("w-[90%]")} bottom-0  text-sm mb-5`}>
                            <ul className="font-medium p-2 relative  bg-sidebarroute rounded-lg transition-all duration-300 ease-in-out">
                                <li className="p-2 group hover:bg-sidebarsubroute flex  gap-2 items-center rounded-lg cursor-pointer">
                                    {state?.enterprise?.logo ?
                                        <img
                                            className="w-8 h-8 rounded-lg"
                                            src={state?.enterprise?.logo}
                                            alt="user photo"
                                        /> : <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-[#E3AC2D] rounded-lg dark:bg-gray-600">
                                            <span className="font-medium text-white normal-case"> {state?.enterprise?.name.charAt(0)}</span>
                                        </div >}



                                    {!collaps && (
                                        <div className="relative ">
                                            <p className="text-[12px] text-normal">{state?.enterprise?.name}</p>
                                            <p className="text-[12px] text-normal">{makeCapital(state?.role)}</p>
                                            {!isOpen && (
                                                <ul className="hidden group-hover:block fixed w-[200px] text-center left-[236px] top-[266px] mt-2 py-2 bg-white rounded shadow-lg z-50">
                                                    <li className="text-start p-2">
                                                        <p className="text-xs font-normal text-heading ml-4 break-all">
                                                            {state?.email}
                                                        </p>
                                                    </li>

                                                    <hr className="text-border border-gray" />
                                                    {SideBarRoutes.map((element, key) => (
                                                        <li key={key}>
                                                            <Link
                                                                href={element.href}
                                                                className={` flex items-center p-2 text-heading  hover:bg-linkhover hover:text-white`}
                                                                onClick={() => setIsOpen(false)}
                                                            >
                                                                {/* {element.icon} */}
                                                                <span className="flex justify-between w-full ml-4 whitespace-nowrap text-sm font-normal">
                                                                    {sendNames(element.name)}
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                    <li >
                                                        <Link
                                                            href={'/dashboard/api-keys'}
                                                            className={` flex items-center p-2 text-heading  hover:bg-linkhover hover:text-white`}
                                                            onClick={() => setIsOpen(false)}
                                                        >
                                                            {/* {element.icon} */}
                                                            <span className="flex justify-between w-full ml-4 whitespace-nowrap text-sm font-normal">
                                                                Keys
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <hr className="text-border border-gray" />
                                                    <li className="p-2 relative hover:underline flex">
                                                        <input
                                                            className="inline-block cursor-pointer  absolute top-0 left-[28px] opacity-0 rounded-full px-6 pt-2 text-xs font-medium leading-normal text-[blue] shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                                                            id="multiple_files"
                                                            type="file"
                                                            accept="image/*"
                                                            multiple
                                                            onChange={(e) => handleFileInputChange(e)}
                                                        />
                                                        <label
                                                            className="inline-block ml-4 rounded-full text-xs font-medium    leading-normal text-heading "
                                                            for="file_input"
                                                        >
                                                            Upload logo
                                                        </label>
                                                    </li>

                                                    <li className="text-start text-sm font-normal pl-2 ">
                                                        <button
                                                            type="button"
                                                            className="inline-block  rounded-full ml-4 text-heading"
                                                            onClick={handleLogout}
                                                        >
                                                            Logout
                                                        </button>
                                                    </li>
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </li>
                                <li className="p-2 hover:bg-sidebar-hover w-full rounded-lg  cursor-pointer">
                                    <Link
                                        href={"mailto:team@usetempo.ai"}
                                        className={`flex items-center  text-gray-900 rounded-lg `}
                                    >
                                        <QuestionMarkCircleIcon className="h-6 w-6 text-gray-500" />
                                        {!collaps && (
                                            <span className="flex-1 ml-3 whitespace-nowrap text-[13px] font-normal">
                                                Get Support
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            </ul>
                            <div className="cursor-pointer p-2 flex justify-center" onClick={(e) => { setCollaps(prev => !prev) }}>
                                {!collaps ?
                                    <p className="text-[12px] font-normal flex items-center gap-2"> <ArrowSmallLeftIcon className="h-4 w-4 text-white " /> Collapse</p>
                                    : <ArrowSmallRightIcon className="h-4 w-4 text-white " />}
                            </div>
                        </div>

                    </div>
                </aside>

                <div className={`${collaps ? 'pt-2 sm:pl-20 transition-all duration-300 ease-in-out' : 'pt-2 sm:pl-64 transition-all duration-300 ease-in-out'} bg-sidebarbg`}>
                    <div className=" bg-white p-4 rounded-tl-lg">

                        {children}
                    </div>
                </div>
            </>
        </>
    );
};
export default NewSidebar;
