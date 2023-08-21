import React from 'react'

const TextArea = ({title,value,onChange,placeholder,id,name}) => {
    return (
        <>
            <label className={`my-2 new_input_label block text-sm text-heading font-medium`}>
                <div className='flex items-center gap-2'><span>{title}</span>  </div>
            </label>
            <textarea rows="5" cols="30" className='border border-border shadow-none block px-3 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-2 placeholder:text-[20px] text-[20px] disabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px]' name={name} placeholder={placeholder} id={id} value={value} onChange={onChange}>
            </textarea>
        </>

    )
}

export default TextArea