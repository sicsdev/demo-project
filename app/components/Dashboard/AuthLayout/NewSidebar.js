

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
} from "@heroicons/react/24/outline";
import { fetchRecommendation } from "../../store/slices/recommendation";
import { fetchIntegrations } from "../../store/slices/integrationSlice";
import { fetchWorkflows } from "../../store/slices/workflowSlice";
import { ArrowSmallLeftIcon, ChartBarIcon, ChevronDoubleDownIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import Loading from "../../Loading/Loading";

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
        },
        {
            // href: "",
            href: workflowLinkHandler('/dashboard/workflow/integrations'),
            name: "Workflow Builder",
            icon: <CodeBracketSquareIcon className="h-6 w-6 text-gray-500" />,
            list: [
                {
                    href: "/dashboard/workflow/integrations",
                    name: "Integrations",
                    icon: <ShareIcon className="h-6 w-6 text-gray-500" />,
                },
                // {
                //   href: "/dashboard/workflow/policies",
                //   name: "Policies",
                //   icon: <ClipboardIcon className="h-6 w-6 text-gray-500" />,
                // },
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
            list: [],
            notification: recommedState?.data?.count,
        },
        {
            href: "/dashboard/analytics",
            name: "Reports",
            icon: <ChartBarIcon className="h-6 w-6 text-gray-500" />,
            list: [],
        },
        {
            href: "/dashboard/billing/usage",
            name: "Billing",
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
            href: "/dashboard/members",
            name: "Team",
            icon: <UserGroupIcon className="h-6 w-6 text-gray-500" />,
            list: [],
        },
        // {
        //   href: "/dashboard/manage-phones",
        //   name: "Phone",
        //   icon: <DevicePhoneMobileIcon className="h-6 w-6 text-gray-500" />,
        //   list: [],
        // },
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
                <li key={key} className={`p-2 hover:bg-sidebarsubroute w-full rounded-lg ${pathname === element.href && "bg-sidebarsubroute"
                    }`}>
                    <Link
                        href={element.href}
                        onClick={() => {
                            setShowSubTabs((prev) => {
                                if (prev === key) {
                                    return null;
                                }
                                return key;
                            });
                        }}
                        className={` flex items-center text-gray-900 rounded-lg `}
                    >
                        {element.icon}
                        {!collaps && (
                            <span className="flex justify-between w-full ml-4 whitespace-nowrap text-[13px] font-normal transition-all duration-300 ease-in-out">
                                {element.name}
                            </span>
                        )}
                    </Link>
                    {showSubTabs === key && (
                        <ul className="p-3 space-y-2 bg-sidebarsubroute rounded-lg">
                            {element.list.map((ele, key) => (
                                <li key={key} className={`p-2 hover:bg-sidebar-hover w-full rounded-lg ${pathname === ele.href && "bg-sidebar-hover"
                                    }`}>
                                    <Link
                                        href={ele.href}
                                        onClick={() => handlerclosemenu(ele.href)}
                                        className={` flex items-center  text-gray-900 `}
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
                    )}
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
                <aside
                    id="logo-sidebar"
                    className={`fixed py-5 bg-sidebarbg  text-white top-0 left-0 z-40 ${collaps ? "w-20 transition-all duration-300 ease-in-out" : "w-64 transition-all duration-300 ease-in-out"} h-[100vh]`}
                    aria-label="Sidebar"
                >
                    <div className="h-full px-3 pb-4 overflow-y-auto bg-sidebarbg  text-white">

                        <ul className="space-y-2 font-medium p-2 w-full relative  bg-sidebarroute rounded-lg transition-all duration-300 ease-in-out">

                            {SideBarRoutes.map((element, key) =>
                                sendSideBarDetails(element, key)
                            )}
                        </ul>

                        <div className={`absolute ${!collaps && ("w-[90%]")} bottom-0  text-sm mb-5`}>
                            <ul className="space-y-2 font-medium p-2 relative  bg-sidebarroute rounded-lg transition-all duration-300 ease-in-out">
                                <li className=" hover:bg-sidebarsubroute flex  gap-2 rounded-lg cursor-pointer">

                                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-[#E3AC2D] rounded-lg dark:bg-gray-600">
                                        <span className="font-medium text-white">{state?.enterprise?.name.charAt(0)}</span>
                                    </div >
                                    {!collaps && (
                                    <div>
                                        <p className="text-[12px] text-normal">{state?.enterprise?.name}</p>
                                        <p className="text-[12px] text-normal">Online</p>
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
                    <div className="bg-white px-2 rounded-tl-lg">
                        {children}
                    </div>
                </div>
            </>
        </>
    );
};
export default NewSidebar;
