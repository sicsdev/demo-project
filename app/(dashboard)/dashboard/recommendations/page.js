"use client";
import React, { useEffect, useState } from "react";
import { HandThumbUpIcon, MagnifyingGlassIcon, ArrowLongUpIcon } from "@heroicons/react/24/outline";
const Page = () => {

    return (
        <>
            <div>
                <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                        <li className="mr-2">
                            <a
                                href="javascript:void(0)"
                                className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                                aria-current="page"
                            >
                                <HandThumbUpIcon className="h-6 w-6 text-primary" /> Recommendations
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="max-w-[80%] m-auto">
                    <div className="buton_tabs flex gap-3 justify-center">
                        <button className="py-2 px-8 sm:px-10 mt-4 md:px-8 lg:px-5 sm:py-8 md:py-5 lg:py-3 text-white text-sm font-semibold bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-full inline">
                            <a href="#">All</a>
                        </button>
                        <button className="py-2 px-8 sm:px-10 mt-4 md:px-8 lg:px-5 sm:py-8 md:py-5 lg:py-3 text-black hover:text-white border text-sm font-semibold bg-white hover:bg-black dark:focus:ring-yellow-900 rounded-full inline">
                            <a href="#">Repairs</a>
                        </button>
                        <button className="py-2 px-8 sm:px-10 mt-4 md:px-8 lg:px-5 sm:py-8 md:py-5 lg:py-3 text-black hover:text-white border text-sm font-semibold bg-white hover:bg-black dark:focus:ring-yellow-900 rounded-full inline">
                            <a href="#">Bidding</a>
                        </button>
                    </div>
                </div>


                {/* <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"> */}
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div class="grid gap-3 h-fit">
                        <div className="h-fit max-w-full">
                            <div className="h-auto max-w-full shadow rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2">
                                        <MagnifyingGlassIcon className="h-6 w-6 text-orange bg-amber" />
                                        <p className="text-sm">Add broad match keywords</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="text-sm bg-[#e6f7fd] rounded-full px-1 py-1 text-primary font-bold">+7.6%</p>
                                        <button type="button" class="border-none p-0 m-0 flex gap-1 items-center mx-auto"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-5 w-5 "><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path></svg></button>
                                    </div>
                                </div>
                                <p className="font-bold text-sm py-4">Get more conversions Add broad match keywords Get more conversions Add broad match keywords.</p>
                                <p className="font-normal text-xs text-[#9CA3AF] pb-4">Recommended because get more conversions Add broad match keywords Get more conversions Add broad match keywords.</p>

                                <p className="font-normal text-sm pb-4">Get more conversions Add broad match keywords Get more conversions Add broad match keywords match keywords Get more conversions Add broad match keywords.</p>
                                <p className="font-normal text-xs text-[#9CA3AF] pb-4">Examples because get more conversions Add broad match keywords Get more conversions Add broad match keywords.</p>

                                <div className="flex gap-2 items-center gap-2 border rounded-full p-1 inline">
                                    <ArrowLongUpIcon className="h-6 w-6 text-success" />
                                    <p className="text-xs">Device: Desktop and Time: Weekdays, 9AM to 5PM</p>
                                </div>
                                <div className="mt-2 flex gap-2 items-center gap-2 border rounded-full p-1 inline">
                                    <ArrowLongUpIcon className="h-6 w-6 text-success" />
                                    <p className="text-xs">Device: Desktop and Time: Weekdays, 9AM to 5PM</p>
                                </div>

                                <div className="flex gap-2 mt-3 items-center gap-2 justify-end">
                                    <button className="py-2 px-8 sm:px-10 mt-4 md:px-8 lg:px-5 text-primary sm:py-8 md:py-5 lg:py-3 text-sm font-semibold inline rounded-lg">
                                        <a href="#">View 14 recommendations </a>
                                    </button>

                                    <button className="py-2 px-4 sm:px-6 mt-4 text-white text-sm font-semibold bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg inline">
                                        <a href="#">Apply all </a>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="h-fit max-w-full">
                            <div className="h-auto max-w-full shadow rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2">
                                        <MagnifyingGlassIcon className="h-6 w-6 text-orange bg-amber" />
                                        <p className="text-sm">Add broad match keywords</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="text-sm bg-[#e6f7fd] rounded-full px-1 py-1 text-primary font-bold">+7.6%</p>
                                        <button type="button" class="border-none p-0 m-0 flex gap-1 items-center mx-auto"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-5 w-5 "><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path></svg></button>
                                    </div>
                                </div>
                                <p className="font-bold text-sm py-4">Get more conversions Add broad match keywords Get more conversions Add broad match keywords.</p>
                                <p className="font-normal text-xs text-[#9CA3AF] pb-4">Recommended because get more conversions Add broad match keywords Get more conversions Add broad match keywords.</p>

                                <p className="font-normal text-sm pb-4">Get more conversions Add broad match keywords Get more conversions Add broad match keywords match keywords Get more conversions Add broad match keywords.</p>
                                <p className="font-normal text-xs text-[#9CA3AF] pb-4">Examples because get more conversions Add broad match keywords Get more conversions Add broad match keywords.</p>

                                <div className="flex gap-2 items-center gap-2 border rounded-full p-1 inline">
                                    <ArrowLongUpIcon className="h-6 w-6 text-success" />
                                    <p className="text-xs">Device: Desktop and Time: Weekdays, 9AM to 5PM</p>
                                </div>
                                <div className="mt-2 flex gap-2 items-center gap-2 border rounded-full p-1 inline">
                                    <ArrowLongUpIcon className="h-6 w-6 text-success" />
                                    <p className="text-xs">Device: Desktop and Time: Weekdays, 9AM to 5PM</p>
                                </div>

                                <div className="flex gap-2 mt-3 items-center gap-2 justify-end">
                                    <button className="py-2 px-8 sm:px-10 mt-4 md:px-8 lg:px-5 text-primary sm:py-8 md:py-5 lg:py-3 text-sm font-semibold inline rounded-lg">
                                        <a href="#">View 14 recommendations </a>
                                    </button>

                                    <button className="py-2 px-4 sm:px-6 mt-4 text-white text-sm font-semibold bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg inline">
                                        <a href="#">Apply all </a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid gap-3 h-fit">
                        <div className="h-fit max-w-full">
                            <div className="h-auto max-w-full shadow rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2">
                                        <MagnifyingGlassIcon className="h-6 w-6 text-orange bg-amber" />
                                        <p className="text-sm">Add broad match keywords</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="text-sm bg-[#e6f7fd] rounded-full px-1 py-1 text-primary font-bold">+7.6%</p>
                                        <button type="button" class="border-none p-0 m-0 flex gap-1 items-center mx-auto"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-5 w-5 "><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path></svg></button>
                                    </div>
                                </div>
                                <p className="font-bold text-sm py-4">Get more conversions Add broad match keywords Get more conversions Add broad match keywords.</p>
                                <p className="font-normal text-xs text-[#9CA3AF] pb-4">Recommended because get more conversions Add broad match keywords Get more conversions Add broad match keywords.</p>

                                <p className="font-normal text-sm pb-4">Get more conversions Add broad match keywords Get more conversions Add broad match keywords match keywords Get more conversions Add broad match keywords.</p>
                                <p className="font-normal text-xs text-[#9CA3AF] pb-4">Examples because get more conversions Add broad match keywords Get more conversions Add broad match keywords.</p>

                                <div className="flex gap-2 items-center gap-2 border rounded-full p-1 inline">
                                    <ArrowLongUpIcon className="h-6 w-6 text-success" />
                                    <p className="text-xs">Device: Desktop and Time: Weekdays, 9AM to 5PM</p>
                                </div>
                                <div className="mt-2 flex gap-2 items-center gap-2 border rounded-full p-1 inline">
                                    <ArrowLongUpIcon className="h-6 w-6 text-success" />
                                    <p className="text-xs">Device: Desktop and Time: Weekdays, 9AM to 5PM</p>
                                </div>

                                <div className="flex gap-2 mt-3 items-center gap-2 justify-end">
                                    <button className="py-2 px-8 sm:px-10 mt-4 md:px-8 lg:px-5 text-primary sm:py-8 md:py-5 lg:py-3 text-sm font-semibold inline rounded-lg">
                                        <a href="#">View 14 recommendations </a>
                                    </button>

                                    <button className="py-2 px-4 sm:px-6 mt-4 text-white text-sm font-semibold bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg inline">
                                        <a href="#">Apply all </a>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="h-fit max-w-full">
                            <div className="h-auto max-w-full shadow rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2">
                                        <MagnifyingGlassIcon className="h-6 w-6 text-orange bg-amber" />
                                        <p className="text-sm">Add broad match keywords</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="text-sm bg-[#e6f7fd] rounded-full px-1 py-1 text-primary font-bold">+7.6%</p>
                                        <button type="button" class="border-none p-0 m-0 flex gap-1 items-center mx-auto"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-5 w-5 "><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path></svg></button>
                                    </div>
                                </div>
                                <p className="font-bold text-sm py-4">Get more conversions Add broad match keywords Get more conversions Add broad match keywords.</p>
                                <p className="font-normal text-xs text-[#9CA3AF] pb-4">Recommended because get more conversions Add broad match keywords Get more conversions Add broad match keywords.</p>

                                <p className="font-normal text-sm pb-4">Get more conversions Add broad match keywords Get more conversions Add broad match keywords match keywords Get more conversions Add broad match keywords.</p>
                                <p className="font-normal text-xs text-[#9CA3AF] pb-4">Examples because get more conversions Add broad match keywords Get more conversions Add broad match keywords.</p>

                                <div className="flex gap-2 items-center gap-2 border rounded-full p-1 inline">
                                    <ArrowLongUpIcon className="h-6 w-6 text-success" />
                                    <p className="text-xs">Device: Desktop and Time: Weekdays, 9AM to 5PM</p>
                                </div>
                                <div className="mt-2 flex gap-2 items-center gap-2 border rounded-full p-1 inline">
                                    <ArrowLongUpIcon className="h-6 w-6 text-success" />
                                    <p className="text-xs">Device: Desktop and Time: Weekdays, 9AM to 5PM</p>
                                </div>

                                <div className="flex gap-2 mt-3 items-center gap-2 justify-end">
                                    <button className="py-2 px-8 sm:px-10 mt-4 md:px-8 lg:px-5 text-primary sm:py-8 md:py-5 lg:py-3 text-sm font-semibold inline rounded-lg">
                                        <a href="#">View 14 recommendations </a>
                                    </button>

                                    <button className="py-2 px-4 sm:px-6 mt-4 text-white text-sm font-semibold bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg inline">
                                        <a href="#">Apply all </a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid gap-3 h-fit">
                        <div className="h-fit max-w-full">
                            <div className="h-auto max-w-full shadow rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2">
                                        <MagnifyingGlassIcon className="h-6 w-6 text-orange bg-amber" />
                                        <p className="text-sm">Add broad match keywords</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="text-sm bg-[#e6f7fd] rounded-full px-1 py-1 text-primary font-bold">+7.6%</p>
                                        <button type="button" class="border-none p-0 m-0 flex gap-1 items-center mx-auto"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-5 w-5 "><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path></svg></button>
                                    </div>
                                </div>
                                <p className="font-bold text-sm py-4">Get more conversions Add broad match keywords Get more conversions Add broad match keywords.</p>
                                <p className="font-normal text-xs text-[#9CA3AF] pb-4">Recommended because get more conversions Add broad match keywords Get more conversions Add broad match keywords.</p>

                                <p className="font-normal text-sm pb-4">Get more conversions Add broad match keywords Get more conversions Add broad match keywords match keywords Get more conversions Add broad match keywords.</p>
                                <p className="font-normal text-xs text-[#9CA3AF] pb-4">Examples because get more conversions Add broad match keywords Get more conversions Add broad match keywords.</p>

                                <div className="flex gap-2 items-center gap-2 border rounded-full p-1 inline">
                                    <ArrowLongUpIcon className="h-6 w-6 text-success" />
                                    <p className="text-xs">Device: Desktop and Time: Weekdays, 9AM to 5PM</p>
                                </div>
                                <div className="mt-2 flex gap-2 items-center gap-2 border rounded-full p-1 inline">
                                    <ArrowLongUpIcon className="h-6 w-6 text-success" />
                                    <p className="text-xs">Device: Desktop and Time: Weekdays, 9AM to 5PM</p>
                                </div>

                                <div className="flex gap-2 mt-3 items-center gap-2 justify-end">
                                    <button className="py-2 px-8 sm:px-10 mt-4 md:px-8 lg:px-5 text-primary sm:py-8 md:py-5 lg:py-3 text-sm font-semibold inline rounded-lg">
                                        <a href="#">View 14 recommendations </a>
                                    </button>

                                    <button className="py-2 px-4 sm:px-6 mt-4 text-white text-sm font-semibold bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg inline">
                                        <a href="#">Apply all </a>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="h-fit max-w-full">
                            <div className="h-auto max-w-full shadow rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2">
                                        <MagnifyingGlassIcon className="h-6 w-6 text-orange bg-amber" />
                                        <p className="text-sm">Add broad match keywords</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="text-sm bg-[#e6f7fd] rounded-full px-1 py-1 text-primary font-bold">+7.6%</p>
                                        <button type="button" class="border-none p-0 m-0 flex gap-1 items-center mx-auto"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-5 w-5 "><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path></svg></button>
                                    </div>
                                </div>
                                <p className="font-bold text-sm py-4">Get more conversions Add broad match keywords Get more conversions Add broad match keywords.</p>
                                <p className="font-normal text-xs text-[#9CA3AF] pb-4">Recommended because get more conversions Add broad match keywords Get more conversions Add broad match keywords.</p>

                                <p className="font-normal text-sm pb-4">Get more conversions Add broad match keywords Get more conversions Add broad match keywords match keywords Get more conversions Add broad match keywords.</p>
                                <p className="font-normal text-xs text-[#9CA3AF] pb-4">Examples because get more conversions Add broad match keywords Get more conversions Add broad match keywords.</p>

                                <div className="flex gap-2 items-center gap-2 border rounded-full p-1 inline">
                                    <ArrowLongUpIcon className="h-6 w-6 text-success" />
                                    <p className="text-xs">Device: Desktop and Time: Weekdays, 9AM to 5PM</p>
                                </div>
                                <div className="mt-2 flex gap-2 items-center gap-2 border rounded-full p-1 inline">
                                    <ArrowLongUpIcon className="h-6 w-6 text-success" />
                                    <p className="text-xs">Device: Desktop and Time: Weekdays, 9AM to 5PM</p>
                                </div>

                                <div className="flex gap-2 mt-3 items-center gap-2 justify-end">
                                    <button className="py-2 px-8 sm:px-10 mt-4 md:px-8 lg:px-5 text-primary sm:py-8 md:py-5 lg:py-3 text-sm font-semibold inline rounded-lg">
                                        <a href="#">View 14 recommendations </a>
                                    </button>

                                    <button className="py-2 px-4 sm:px-6 mt-4 text-white text-sm font-semibold bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg inline">
                                        <a href="#">Apply all </a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
