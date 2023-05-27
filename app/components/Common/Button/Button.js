import React from 'react'

const Button = ({ type, className, disabled, children, ...rest }) => {
    return (
        <>
            <button
                type={type || 'button'}
                disabled={disabled || false}
                className={`focus:outline-none focus:ring-4  font-bold rounded-md text-base py-2.5 mb-2 ${className} disabled:bg-input_color disabled:text-white`}
                {...rest}
            >
                {children}
            </button>
        </>
    )
}

export default Button