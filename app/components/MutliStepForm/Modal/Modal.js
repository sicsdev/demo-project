import { useEffect } from "react";
import "./modal.css";
import { Input } from "../../Common/Input/MultiStepFormInput";
export function Modal({ isOpen, onClose }) {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && event.target.classList.contains("overlay")) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`overlay ${isOpen ? "active" : ""}`}>
      <div className="modal">
        <div class="grid grid-cols-1 sm:grid-cols-2 ">
          <div className="bg-[#dcdfea] p-14 hidden sm:block">
            <img  src="https://8x8.valuestoryapp.com/8x8/resources-2022-08-12_16-05/dist/app1/images/reportCover.png" />
          </div>
          <div className="p-5">
            <div className="font-bold text-2xl sm:mt-8">
              See your results and get your report
            </div>
            <div className="text-[#868794]  text-sm my-4 leading-5">
              Please confirm your information below to see your results. Your
              full analysis and report will be sent to the email inbox provided
              below.
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:mr-3">
              <div className="w-full">
                <label className="block text-[#595b89] text-md  text-left">
                  First Name
                </label>
                <Input
                  // autoFocus
                  required
                  type="text"
                  className=""
                  // value={"companyName"}
                  // onChange={(e) =>
                  //   updateFields({ companyName: e.target.value })
                  // }
                />
              </div>
              <div className="w-full">
                <label className="block text-[#595b89] text-md text-left">
                  Business Email
                </label>
                <Input
                  // autoFocus
                  required
                  type="text"
                  className=""
                  // value={"companyName"}
                  // onChange={(e) =>
                  //   updateFields({ companyName: e.target.value })
                  // }
                />
              </div>
              <div className="w-full">
                <label className="block text-[#595b89] text-md text-left">
                  Last Name
                </label>
                <Input
                  // autoFocus
                  required
                  type="text"
                  className=""
                  // value={"companyName"}
                  // onChange={(e) =>
                  //   updateFields({ companyName: e.target.value })
                  // }
                />
              </div>
              <div className="w-full">
                <label className="block text-[#595b89] text-md text-left">
                  Phone number (Optional)
                </label>
                <Input
                  // autoFocus
                  required
                  type="text"
                  className=""
                  // value={"companyName"}
                  // onChange={(e) =>
                  //   updateFields({ companyName: e.target.value })
                  // }
                />
              </div>
            </div>
            <div class="flex mt-5">
              <div class="flex items-center h-5">
                <input
                  id="helper-checkbox"
                  aria-describedby="helper-checkbox-text"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div class="ml-2 text-sm">
                <p
                  id="helper-checkbox-text"
                  class="text-md font-normal tracking-tight leading-4 text-left text-gray-500 dark:text-gray-300"
                >
                  Please send me details of 8x8 products and services that may
                  be of interest to me, newsletters and details of events which
                  are held or attended by 8x8. Before clicking submit,{" "}
                  <a>PLEASE CLICK HERE</a> for full information about how your
                  data will be processed.
                </p>
              </div>
            </div>
            <div className="mt-4 mx-auto ">
              <button
                className=" border border-[#142543] bg-white text-[#142543] px-4 min-h-[30px] rounded-3xl  text-sm  h-8 w-22 font-bold mx-2"
                type="submit"
              >
                Cancel
              </button>
              <button
                className="bg-[#142543] text-white px-4 min-h-[30px] rounded-3xl  text-sm  h-8 w-22 font-bold mx-2"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* <button
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Close Modal
        </button> */}
      </div>
    </div>
  );
}
