"use client";
import React, { useEffect, useState } from "react";
import SkeletonLoader from "../Skeleton/Skeleton";
const banner = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const customStyles = {
    backgroundImage: `url('https://ik.imagekit.io/8x8/v3/assets/blte621f0a2bd0e9f69/blt9830dc93b04137ea/615a877fdb34085ff954a031/CloudMigration_GettyImages-1175314548.jpg?cache=957606c207edfb96b375654f6eb18273&amp;tr=ar-16-9,fo-auto,w-600`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <div
      className="sm:h-[500px] sm:flex sm:justify-end sm:flex-col mb-[0px] sm:mb-[45px] for-bg relative"
      style={customStyles}
    >
      <div className=" w-auto sm:p-14 relative p-4">
        <div className="sm:text-5xl text-[22px] text-white sm:font-bold font-bold pt-5 sm:p-0">
          {loading ? (
            <SkeletonLoader
              className="mb-2"
              count={1}
              height={30}
              width="50%"
            />
          ) : (
            <>Cloud Migration Services</>
          )}
        </div>
        <div className="text-white sm:mt-8 mt-2 sm:text-xl text-[15px] w-full sm:w-[600px]">
          {loading ? (
            <SkeletonLoader
              className="mb-1"
              count={1}
              height={60}
              width="100%"
            />
          ) : (
            "8x8’s proven best practices avoid surprises and make the move to cloud communications simple and easy."
          )}
        </div>
      </div>
    </div>
  );
};

export default banner;
