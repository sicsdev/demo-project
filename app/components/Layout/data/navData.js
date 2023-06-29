export const nav_links = [
    {
        name: "Solutions",
        link: "/",
        card: {
            links: [
                {
                    list_heading: "Chat Support",
                    data: [
                        {
                            icon: "/four.png",
                            "heading": "Chat Bot",
                            label: "",
                            link: "/solutions/tempo-chat",
                            "para": "Spin up a GPT4 powered bot in minutes to answer common CS needs."
                        },
                        {
                            icon: "/three.png",
                            "heading": "Email Ticketing",
                            label: "",
                            link: "/solutions/smart-inbox",
                            "para": "Link Tempo into your email support to automatically handle more complex email tickets."
                        }
                    ]
                },
                {
                    list_heading: "Voice Support",
                    data: [
                        {
                            icon: "/two.png",
                            "heading": "Inbound Smart IVR",
                            label: <span className="text-[10px] font-semibold inline-block py-1 px-2  rounded-full text-heading bg-label last:mr-0 mr-1">
                                Coming soon
                            </span>,
                            link: "/",
                            "para": "GPT4-powered phone support for CS needs. "
                        },
                        {
                            icon: "/one.png",
                            "heading": "Outbound Agent",
                            label: <span className="text-[10px] font-semibold inline-block py-1 px-2  rounded-full text-heading bg-label last:mr-0 mr-1">
                                Coming soon
                            </span>,
                            link: "/",
                            "para": "Make phone calls to customers, leads, or clients automatically powered by GPT4."
                        }
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