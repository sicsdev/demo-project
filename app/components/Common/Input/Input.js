import React from "react";

export const Input = ({ id, placeholder, onkeydown, className, onChange, value, type, disabled,...rest }) => {
    const handleChange = (e) => {
        onChange(e)
    }
    return (
        <>
            <input
                type={type || "text"}
                id={id || ""}
                onKeyDown={onkeydown}
                placeholder={placeholder || ""}
                value={value}
                className={`border border-border shadow-none block px-2 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-2 isabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px]${className || ''}`}
                onChange={(e) => handleChange(e)}
                {...rest}
                disabled={disabled || false} />
        </>
    )
}
