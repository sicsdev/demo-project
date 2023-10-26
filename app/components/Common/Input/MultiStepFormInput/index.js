import React from "react";

export const Input = ({ id, placeholder, className, onChange, value , type, disabled,...rest }) => {

    return (
        <>
            <input
                type={type || "text"}
                id={id || ""}
                placeholder={placeholder || ""}
                value={value || ""}
                className={className || 'w-full  px-3 min-h-[35px] bg-[#F2F2F2] mt-[7px] border border-[#595b89]'}
                onChange={onChange}
                {...rest}
                disabled={disabled || false} />
        </>
    )
}
