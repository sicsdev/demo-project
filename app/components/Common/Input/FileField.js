import React from 'react'

const FileField = ({ labelClassName, title, error, type, placeholder, id, register }) => {
    return (
        <div className={`inline ${labelClassName || ''}`}>
            <label htmlFor={id} className="block my-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
            <input type={type || "text"} {...register} placeholder={placeholder || ""} className={`relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-border  bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary ${error?.message && ("border-danger invalid:border-danger invalid:text-danger focus:invalid:border-danger focus:invalid:ring-danger focus:ring-danger")}`} id={id} name={id} />
            {error?.message && (<small className="text-danger text-xs">{error?.message}</small>)}
        </div>
    )
}

export default FileField