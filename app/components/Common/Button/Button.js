import React from 'react'

const Button = ({ type, className, disabled, children, onClick, id, ...rest }) => {
    return (
        <>
            <button
                id={id}
                type={type || 'button'}
                disabled={disabled || false}
                className={`focus:outline-none focus:ring-4  font-bold rounded-md text-base py-2.5  ${className} disabled:bg-input_color disabled:text-white`}
                onClick={onClick}
                {...rest}
            >
                {children}
            </button>
        </>
    )
}

export default Button