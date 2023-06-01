import React from 'react'

const SelectField = ({ labelClassName, title, values, id, register, error ,className = 'py-1'}) => {
    return (
        <div className={`inline ${labelClassName || ''}`}>
            <label htmlFor={id} className="block my-2 text-sm font-medium text-heading">{title}</label>
            <select
                className={`mt-1 block w-full px-3  bg-white border border-input_color rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ${error?.message && ("border-danger invalid:border-danger invalid:text-danger focus:invalid:border-danger focus:invalid:ring-danger focus:ring-danger")} ${className}`}
                id={id} name={id}
                {...register}>
                     <option value={''} disabled>Select</option>
                {values.map((element, key) =>
                    <option key={key} value={element}>{element}</option>
                )}
            </select>
            {error?.message && (<small className="text-danger text-xs">{error?.message}</small>)}
        </div>
    )
}

export default SelectField