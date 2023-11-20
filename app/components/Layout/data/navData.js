import { ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { Cog8ToothIcon,BuildingOffice2Icon  } from "@heroicons/react/24/outline";

export const nav_links = [
    {
        name: "Solutions",
        link: "/",
        card: {
            links: [
         
                {
                    list_heading: "Channels",
                    icon: <ComputerDesktopIcon class="h-6 w-6  text-[#4ebe8c]" />,      
                                  data: [
                        {
                
                            "heading": "Chat Bot",
                            label: "",
                            link: "/solutions/chatbot",
                            "para": "Spin up a GPT4 powered bot in minutes to answer common CS needs."
                        },
                        {
                            icon: "/menu/6.png",
                            "heading": "Email",
                            label: "",
                            link: "/solutions/email",
                            "para": "Link Deflection AI into your email support to automatically handle more complex email tickets."
                        },
                        {
                            icon: "/menu/6.png",
                            "heading": "Phone",
                            label: "",
                            link: "/solutions/phone",
                            "para": "Link Deflection AI into your email support to automatically handle more complex email tickets."
                        }
                  
                    ]
                },
                {
                    list_heading: "Features",
                    icon: <BuildingOffice2Icon class="h-6 w-6 text-[#1d74f5] " />,      

                    data: [
                        {
                            icon: "/menu/7.png",
                            "heading": "Learning Center",
                            label: "",
                            link: "/features/learning-center",
                            "para": "Spin up a GPT4 powered bot in minutes to answer common CS needs."
                        },
                        {
                            icon: "/menu/6.png",
                            "heading": "Workflow Builder",
                            label: "",
                            link: "/features/workflow-builder",
                            "para": "Link Deflection AI into your email support to automatically handle more complex email tickets."
                        },
                      
                    ]
                }
            ]
        }
    },
    {
        name: "Developers",
        link: "https://docs.usetempo.ai",
        card: {
            links: [
            ]
        }
    },
    {
        name: "Pricing",
        link: "/pricing",
        card: { links: [] }
    }
] 