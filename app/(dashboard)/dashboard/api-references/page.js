"use client";
import React, { useEffect, useState } from "react";


const Page = () => {

    return (
        <div>
            <div className="block sm:flex md:flex lg:flex justify-between items-center my-2">
                <div>
                    <h3 className="!font-bold text-[#595959] text-lg">API References</h3>
                    <a href="https://docs.usetempo.ai/reference" target="_blank" className="font-bold text-primary decoration-solid text-sm">
                        https://docs.usetempo.ai/reference
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Page;
