"use client";

const Blogmail = () => {
  return (
    <div className="bg-white py-0 pb-6 sm:pb-0 ">
      <div className="pb-4 sm:pb-16 cursor-pointer mx-auto max-w-[100%]">
        <div
          className={
            " block sm:flex sm:flex-wrap md:flex md:flex-row lg:flex lg:flex-row justify-between  rounded-lg py-8 px-8 sm:py-20 md:py-20 lg:py-20  sm:px-12 lg:px-12 md:px-12   items-center relative"
          }
        >
          <div className=" sm:w-[100%] md:w-[50%] lg:w-[50%]">
            {" "}
            <h2 className=" font-bold  text-2xl sm:mb-0 mb-4  md:text-2xl lg:text-2xl sm:text-2xl sm:leading-none   text-heading  ">
              Industry insights you won’t delete. Delivered to your inbox
              weekly.{" "}
            </h2>
          </div>
          <div className="block sm:grid md:grid lg:grid grid-cols-2 gap-4">
            <div class="relative mb-3" data-te-input-wrapper-init>
              <input
                type="email"
                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInputEmail"
                placeholder="Example label"
              />
              <label
                for="exampleFormControlInputEmail"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >
                Your Email Address
              </label>
            </div>
            <button
        
        type={"submit"}
        className={
          "py-2 px-8 focus:ring-yellow-300 text-white w-full  mt-2 sm:m-0 md:m-0 lg:m-0 text-lg font-semibold bg-black hover:bg-primary dark:focus:ring-yellow-900 rounded-lg"
        }
      >
    Subscribe
      </button>
          </div>
        </div>
        <hr class="h-px  bg-gray-200 border-b-0 dark:bg-gray-700 " />
      </div>
    </div>
  );
};

export default Blogmail;
