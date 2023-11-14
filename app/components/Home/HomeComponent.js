import Link from "next/link";

import React from "react";





const HomeComponent = () => {



    return (

        <>

            <footer className=" bg-[#142543] shadow text-center text-white relative">

                <div className="mx-auto lg:max-w-[100%]">


                    <div className="sm:p-[5rem] p-[2rem]">
                        <p className="sm:text-[29px] text-[22px] font-semibold ">Integrate with Deflection AI
                        </p>
                        <p className=" text-[16px] my-4">Discover the advantages of seamless integration with our platform</p>
                        <button className="text-white   w-full sm:mt-4 sm:flex sm:mx-auto justify-center hover:text-heading my-5 text-center sm:my-0  text-lg font-semibold dark:focus:ring-yellow-900 rounded-lg">
                            <Link
                                href="/checkout"
                                className=" px-[20px] py-[5px] rounded-[25px] bg-[#fe9327] hover:bg-black hover:text-white"
                            >
                                Get Started
                            </Link>
                        </button>
                    </div>



                </div>

            </footer>

        </>

    );

};



export default HomeComponent;