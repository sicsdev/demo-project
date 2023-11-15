import Link from "next/link";

import React from "react";





const HomeComponent = () => {



    return (

        <>

            <div className="bg-black text-white py-20">
                <div className="sm:px-20 px-5 mx-auto ">
                    <p className="sm:text-3xl text-lg">Integrate with Tempo</p>
                    <p className="sm:text-[55px] text-[25px] sm:font-normal font-light sm:w-[70%] w-[100%] leading-snug mt-3 sm:mt-5">Discover the advantages of seamless integration with our platform</p>
                    <button className="text-white bg-[#fe9327] sm:px-[55px] px-[60px] font-semibold py-[8px] rounded-[8px] my-0 mt-16 sm:mt-20 sm:my-5" type="button"><Link href='/checkout'>Get Started</Link></button>
                </div>
            </div>

            {/* <footer className=" bg-[#142543] shadow text-center text-white relative">

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

            </footer> */}

        </>

    );

};



export default HomeComponent;