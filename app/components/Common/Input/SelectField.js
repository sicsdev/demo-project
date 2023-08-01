import React from "react";
import { makeCapital } from "../../helper/capitalName";

const SelectField = ({
  labelClassName,
  title,
  labelClass,
  values,
  id,
  register,
  error = null,
  className = "py-1",
  onChange,
  value,
}) => {
  return (
    <div className={`inline ${labelClassName || ""}`}>
      <label className={`new_input_label block text-sm text-heading ${labelClass || "font-medium"}`}>
        {title}
      </label>
      <div className="selectdiv">
        <select
          className={`custom-select mt-1 block w-full px-3 new_input  bg-white border  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ${error
            ? "border-danger invalid:border-danger invalid:text-danger focus:invalid:border-danger focus:invalid:ring-danger focus:ring-danger"
            : "border-input_color"
            } ${className}`}
          id={id}
          name={id}
          onChange={onChange}
          {...register}
          value={value}
        >
          <option value={""} disabled>
            Select
          </option>
          {values.map((element, key) => (
            <option key={key} value={element}>
              {/* {element === id ? "dada" : <span> &#10003; </span>} {" "} */}
            {element}
            </option>
          ))}
        </select>
      </div>
      {error && <small className="text-danger text-xs">{error}</small>}
    </div>
  );
};

export default SelectField;
