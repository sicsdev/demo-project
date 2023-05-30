import React from 'react'

const TextField = ({ labelClassName, title, error, type, placeholder, id, register }) => {
    return (
        <div className={`inline ${labelClassName || ''}`}>
            <label htmlFor={id} className="block my-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
            <input type={type || "text"} {...register} placeholder={placeholder || ""} className={`block  px-3 py-3 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1  disabled:bg-slate-50 disabled:text-slate-500  border border-input_color w-full ${error?.message && ("border-danger invalid:border-danger invalid:text-danger focus:invalid:border-danger focus:invalid:ring-danger focus:ring-danger")}`} id={id} name={id} />
            {error?.message && (<small className="text-danger text-xs">{error?.message}</small>)}
        </div>
    )
}

export default TextField