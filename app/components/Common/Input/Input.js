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
                className={`block    px-3 py-3 bg-white focus:bg-white focus:text-sm rounded-md  shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ${className || ''}`}
                onChange={(e) => handleChange(e)}
                {...rest}
                disabled={disabled || false} />
        </>
    )
}
