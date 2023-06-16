import React from 'react'

const RadioLabel = ({className , title, id,error, children, onClick, value = ''}) => {
    return (
        <div className={className || ''} onClick={onClick} value={value}>
            <label htmlFor={id} className="block my-2 text-sm font-medium text-heading">{title}</label>
            <div className="flex justify-start">
                {children}
            </div>
            {error?.message && (<small className="text-danger text-xs">{error?.message}</small>)}
        </div>
    )
}

export default RadioLabel