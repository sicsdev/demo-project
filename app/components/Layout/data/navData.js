import { ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

export const nav_links = [
    {
        name: "Solutions",
        link: "/",
        card: {
            links: [
                {
                    list_heading: "Platform",
                    icon: <ComputerDesktopIcon class="h-6 w-6 text-gray-500" />,      
                                  data: [
                        {
                
                            "heading": "Chat Bot",
                            label: "",
                            link: "solutions/tempo-chat",
                            "para": "Spin up a GPT4 powered bot in minutes to answer common CS needs."
                        },
                        {
                            icon: "/menu/6.png",
                            "heading": "Email",
                            label: "",
                            link: "/solutions/smart-inbox",
                            "para": "Link Tempo into your email support to automatically handle more complex email tickets."
                        },
                        {
                            icon: "/menu/6.png",
                            "heading": "Phone",
                            label: "",
                            link: "/solutions/smart-inbox",
                            "para": "Link Tempo into your email support to automatically handle more complex email tickets."
                        }
                  
                    ]
                },
                {
                    list_heading: "Features",
                    icon: <Cog8ToothIcon class="h-6 w-6 text-gray-500" />,      

                    data: [
                        {
                            icon: "/menu/7.png",
                            "heading": "Learning Center",
                            label: "",
                            link: "solutions/tempo-chat",
                            "para": "Spin up a GPT4 powered bot in minutes to answer common CS needs."
                        },
                        {
                            icon: "/menu/6.png",
                            "heading": "Workflow Builder",
                            label: "",
                            link: "/solutions/smart-inbox",
                            "para": "Link Tempo into your email support to automatically handle more complex email tickets."
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
    },
] 