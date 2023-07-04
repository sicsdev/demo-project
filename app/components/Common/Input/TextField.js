import React from 'react'

const TextField = ({ labelClassName, title, error = null, type, placeholder, id, register, subtitle = null, className = 'py-3', onChange, value, onBlur, ...rest }) => {
    return (
        <div className={`inline  ${labelClassName || ''}`}>
            <label htmlFor={id} className="block text-sm font-medium text-heading">{title}</label>
            {subtitle && (<small className="text-border text-xs">{subtitle}</small>)}
            <input value={value} required onChange={onChange} type={type || "text"} {...register} placeholder={placeholder || ""} className={`${className} block border-[0.2px]  px-3 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky focus:ring-2  disabled:bg-slate-50 disabled:text-slate-500 border-input_color w-full ${error && ("border-danger invalid:border-danger invalid:text-danger focus:invalid:border-danger focus:invalid:ring-danger focus:ring-danger")}`} id={id} name={id} {...rest} onBlur={onBlur} />
            {error && (<small className="text-danger text-xs">{error}</small>)}
        </div>
    )
}

export default TextField