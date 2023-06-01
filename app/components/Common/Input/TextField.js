import React from 'react'

const TextField = ({ labelClassName, title, error, type, placeholder, id, register, subtitle = null, className = 'py-3' }) => {
    return (
        <div className={`inline ${labelClassName || ''}`}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-900 dark:text-white">{title}</label>
            {subtitle && (<small className="text-border text-xs">{subtitle}</small>)}
            <input type={type || "text"} {...register} placeholder={placeholder || ""} className={`${className} block  px-3 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1  disabled:bg-slate-50 disabled:text-slate-500  border border-input_color w-full ${error?.message && ("border-danger invalid:border-danger invalid:text-danger focus:invalid:border-danger focus:invalid:ring-danger focus:ring-danger")}`} id={id} name={id} />
            {error?.message && (<small className="text-danger text-xs">{error?.message}</small>)}
        </div>
    )
}

export default TextField