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
                value={"ABC"}
                className={className || 'w-full  px-3 min-h-[35px] bg-[#F2F2F2] mt-[7px] border border-[#595b89]'}
                onChange={(e) => handleChange(e)}
                {...rest}
                disabled={disabled || false} />
        </>
    )
}
