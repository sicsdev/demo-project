import React from "react";
import { makeCapital } from "../../helper/capitalName";

const SelectOption = ({
    labelClassName,
    title,
    selectdiv,
    sublabel = ``,
    labelClass,
    values,
    id,
    register,
    error = null,
    className = "py-1",
    onChange,
    value,
    disabled = false,
    optionDisabled = [],
    showOption = true
}) => {

    return (
        <div className={`inline ${labelClassName || ""}`}>
            <label className={`block text-sm text-heading ${labelClass || "font-medium"}`}>
                {title}
                {sublabel !== '' &&
                    <p style={{ fontSize: "10px" }}>{sublabel}</p>
                }
            </label>
            <div className={`selectdiv`}>
                <select
                    className={`new_input ${value === "" && ("new_fade")} focus:!text-black custom-select mt-1 block w-full px-3   bg-white focus:bg-white border  rounded-md  shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500  ${error
                        ? "border-danger invalid:border-danger invalid:text-danger focus:invalid:border-danger focus:invalid:ring-danger focus:ring-danger"
                        : "border-input_color"
                        } ${className}`}
                    id={id}
                    name={id}
                    onChange={onChange}
                    {...register}
                    value={value}
                    disabled={disabled === true}
                >
                    {showOption && (
                        <option value={""} className="text-gray" disabled>
                            Select
                        </option>
                    )}
                    {values?.map((element, key) => (
                        <>
                            <option key={key} value={element.value} name={element.name}>
                                {makeCapital(element.name)}
                            </option>
                        </>

                    ))}
                </select>
            </div>
            {error && <small className="text-danger text-xs">{error}</small>}
        </div>
    );
};

export default SelectOption;
