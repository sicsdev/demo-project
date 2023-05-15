import React from 'react'

const Footer = () => {
    const company = [
        "About",
        "Leadership",
        "Investors",
        "Careers",
        "Customers",
        "Partners",
        "Events",
        "Blogs",
        "News",
        "Contact",
    ]
    const support = [
        "Support",
        "Training & Certification",
        "Services",
        "Student Academy",
        "Community"
    ]
    const products = [
        "What’s New",
        "Temposervice",
        "Tempodesk",
        "Tempochat",
        "Temposales",
        "Tempomarketer",
        "Tempoworks Neo",
    ]
    return (

        <footer className="bg-slate-950 shadow">

            <div className="mx-auto w-full  lg:max-w-[90%] ">

                <div className="py-11 md:flex md:items-center md:justify-between">
                    <span className="text-xl sm:text-center text-white font-semibold">Contact Tempo  <a className='text-sm ml-5 font-normal' >+1 (000) 000 0000 or sales@tempo.com</a>
                    </span>
                </div>
                <hr />
                <div className="grid grid-cols-2 gap-8  py-6 lg:py-8 md:grid-cols-4 text-sm">
                    <div>
                        <h2 className="mb-6 text-sm font-semibold uppercase text-white">Company</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            {company.map((ele, key) =>
                                <li className="mb-4" key={key}>
                                    <a href="#" className=" hover:underline">{ele}</a>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold  uppercase text-white">Support & Success</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            {support.map((element, key) =>
                                <li className="mb-4" key={key}>
                                    <a href="#" className="hover:underline">{element}</a>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold uppercase text-white">Products</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            {products.map((element,key)=>
                            <li className="mb-4" key={key}>
                                <a href="#" className="hover:underline">{element}</a>
                            </li>
                            )}
                        </ul>
                    </div>
                </div>

            </div>
            <hr className='mx-auto w-full  lg:max-w-[90%] ' />
            <div className="py-6 bg-slate-950 shadow md:flex md:items-center md:justify-between lg:max-w-[90%] m-auto">

                <ul className="flex flex-wrap items-center mt-3 text-sm font-normal text-white sm:mt-0">

                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://tempo.com/" className="hover:underline">Tempo™</a>. All Rights Reserved.
                </span>

            </div>
        </footer>

    )
}

export default Footer