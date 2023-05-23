import React from 'react'

export const Input = ({ id, placeholder, className, onChange, value, type, disabled }) => {
    const handleChange = (e) => {
        onChange(e.target.value)
    }
    return (
        <>
            <input
                type={type || "text"}
                id={id || ""}
                placeholder={placeholder || ""}
                value={value || ""}
                className={`block w-full px-3 py-3 bg-white border border-input_color rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ${className}`}
                onChange={(e) => handleChange(e)}
                disabled={disabled || false} />
        </>
    )
}
