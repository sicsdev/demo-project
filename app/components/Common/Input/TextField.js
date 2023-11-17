import { InformationCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

const TextField = ({
  labelClassName,
  title,
  labelClass,
  error = null,
  type,
  placeholder,
  handleInputFocus,
  id,
  register,
  subtitle = null,
  className = "py-3",
  onChange,
  value,
  onBlur,
  paddingleft,
  tooltipInfo,
  ...rest
}) => {
  return (
    <div className={`inline  ${labelClassName || ""}`}>
      <div className="flex items-center mb-1">
        <label
          className={`new_input_label block text-sm text-heading ${
            labelClass || "font-medium"
          }`}
        >
          {title}
        </label>
        {/* 
        {tooltipInfo && <InformationCircleIcon
          data-tooltip-id={title}
          data-tooltip-content={tooltipInfo}
          className='w-4 h-4 mx-2'>
        </InformationCircleIcon>} */}
      </div>
      {/* <Tooltip id={title} place="top" type="dark" effect="solid" /> */}

      {subtitle && <small className="text-border text-xs">{subtitle}</small>}
      <input
        value={value}
        required
        onFocus={handleInputFocus}
        onChange={onChange}
        type={type || "text"}
        {...register}
        placeholder={placeholder || ""}
        className={`${className} ${paddingleft} new_input block border-[0.2px]  px-3 bg-white  rounded-md shadow-sm placeholder-slate-400  focus:outline-[0px] focus:border-sky focus:ring-2  disabled:bg-slate-50 disabled:text-slate-500 border-input_color w-full focus:bg-white  ${
          error &&
          "border-danger invalid:border-danger invalid:text-danger focus:invalid:border-danger focus:invalid:ring-danger focus:ring-danger"
        }`}
        id={id}
        name={id}
        {...rest}
        onBlur={onBlur}
      />
      {error && <small className="text-danger text-xs">{error}</small>}
    </div>
  );
};

export default TextField;
