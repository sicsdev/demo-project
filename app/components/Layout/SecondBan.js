import React, { useState } from "react";
import Card from "../Common/Card/Card";


const SecondBan = () => {
  const [hide, setHide] = useState({
    first: false,
  });
  return (
    <>
      <div className="z-40 text-center p-3 bg-[#142543] hidden sm:block" >
      <h6 className="text-blue-700 text-white text-para  " >
      Our Guarantee: Reduce CS costs by 50% with Deflection AI or your money back!
      </h6>
    </div>
      <div className="z-40 text-center p-3 bg-[#142543] block sm:hidden" onClick={() =>
        setHide({ first: false })
      }>
        <h6 className="text-blue-700 text-white text-para relative">
          Our Guarantee: {" "}
            <span
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setHide({ first: true });
              }}
            >
              (see terms)*
            </span>
            {hide.first == true ? (
              <Card
                className={
                  "animate-fadeIn w-[320px]	sm:w-[400px] absolute z-50 top-[30px] bg-white ml-auto mr-auto left-0 right-0"
                }
              >
                <p
                  className="text-heading"
                  onMouseLeave={() => setHide({ first: false })}
                >
                  Reduce CS costs by 50% with Deflection AI or your money back!
                </p>
              </Card>
            ) : (
              ""
            )}
        </h6>
      </div>
    </>
  );
};

export default SecondBan;
