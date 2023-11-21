
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SkeletonLoader from "../Skeleton/Skeleton";

const HomeComponent = ({defaultLoaderTime = 1000}) => {
  const [pageLoader, setPageLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setPageLoader(false);
    }, defaultLoaderTime);
  }, []);

  return (

    <>
      <div className="bg-black text-white py-20 mb-2">
        <div className="sm:px-20 px-5 mx-auto ">
          {pageLoader ? (
            <>
              <SkeletonLoader width={150} height={20} />
              <SkeletonLoader className={'!w-full sm:!w-[50%]'} height={100} />
              <SkeletonLoader className={'sm:px-[55px] px-[60px] font-semibold py-[8px] rounded-[8px] my-0 mt-16 sm:mt-20 sm:my-5'} width={150} height={30} />
            </>
          ) :
            (
              <>
                <p className="sm:text-2xl text-lg">Integrate with Deflection</p>
                <p className="sm:text-[55px] text-[25px] sm:font-normal font-light sm:w-[70%] w-[100%] leading-snug mt-3 sm:mt-5">Discover  <span className="text-red">the advantages</span> of seamless integration with our platform</p>
                <button className="text-white bg-red sm:px-[55px] px-[60px] font-semibold py-[8px] rounded-[8px] my-0 mt-16 sm:mt-20 sm:my-5" type="button"><Link href='/checkout'>Get Started</Link></button>
              </>
            )}

        </div>
      </div>
    </>

  );

};



export default HomeComponent;