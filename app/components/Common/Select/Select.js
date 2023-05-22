import React from 'react'

const Select = ({ id, placeholder, className, onChange, value, disabled, data }) => {
    return (
        <>
            <select
                id={id || ''}
                className={`mt-1 block w-full px-3 py-3 bg-white border border-input_color rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ${className}`}
                value={value || null}
                placeholder={placeholder || ''}
                disabled={disabled || false}
                onChange={(e) => onChange(e.target.value)}>
                {data.length > 0 && (
                    <>
                        {data.map((item, index) =>
                            <option key={index} value={item}>{item}</option>
                        )}
                    </>

                )}
            </select>
        </>
    )
}

export default Select