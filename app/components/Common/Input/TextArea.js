import React from 'react'

const TextArea = ({ title, value, onChange, placeholder, id, name }) => {
    return (
        <>
            {title !== undefined && (
                <label className={`my-2 new_input_label block text-sm text-heading font-medium`}>
                    <div className='flex items-center gap-2'><span>{title}</span>  </div>
                </label>
            )}
            <textarea className='border border-border shadow-none block px-2 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-2 placeholder:text-[20px] text-[20px] disabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px]' name={name} placeholder={placeholder} id={id} value={value} onChange={onChange}>
            </textarea>
        </>

    )
}

export default TextArea