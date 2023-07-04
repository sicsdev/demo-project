import React from "react";
import Link from "next/link";
import Button from "../Common/Button/Button";
const VerifyEmailBanner = ({userEmail}) => {
  return (
    <div class="hidden md:block">
      <div className="z-40 text-center bg-[#FFB533]">

        <div className="text-black flex justify-center gap-2 align-center py-1">
          <div style={{fontSize: '13px'}} className='generalSans-bold flex align-center items-center'>
            <b className='mx-1'>Action required:</b>{" "}Please verify your email
          </div>
          <a href={`/verify-email?email=${userEmail}`}><span className='generalSans-bold border px-5 py-0 rounded my-1 hover:bg-black hover:text-[#FFB533] cursor-pointer' style={{ fontSize: '12px' }}>
            Verify
          </span></a>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailBanner;