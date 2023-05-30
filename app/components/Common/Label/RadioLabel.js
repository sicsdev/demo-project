import React from 'react'

const RadioLabel = ({className , title, id,error, children }) => {
    return (
        <div className={className || ''}>
            <label htmlFor={id} className="block my-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
            <div className="flex justify-start">
                {children}
            </div>
            {error?.message && (<small className="text-danger text-xs">{error?.message}</small>)}
        </div>
    )
}

export default RadioLabel