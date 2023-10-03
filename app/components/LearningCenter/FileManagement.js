import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'
import { FileUploader } from "react-drag-drop-files";
import Modal from '../Common/Modal/Modal';
const FileManagement = ({ createPdfModal, setCreatePdfModal, setCreateModal, basicFormData, setBasicFormData, handleSubmit, loading }) => {
    const [file, setFile] = useState(basicFormData?.file ?? null)
    const handleChange = (file) => {
        console.log(file)
        if (file && (file.type === 'application/pdf' || file.type === 'text/plain')) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result
                setFile(base64String)
                setBasicFormData({ ...basicFormData, file: base64String, title: file.name })
            };
            reader.readAsDataURL(file);
        }
    };

    const DisablingButton = () => {
        return ["file"].some(
            (key) => !basicFormData[key] || basicFormData[key].trim() === ""
        );
    }
    return (
        <div className='my-6'>
            <div className='border-b border-gray pb-5'>
                <div className='block sm:flex items-center justify-between gap-8'>
                    <div>
                        <FileUploader types={["pdf", "txt"]} handleChange={handleChange} name="file" />
                    </div>
                    <div className='pt-4 sm:pt-0'>
                        <ul className='list-disc text-xs'>
                            <li className='text-xs'>Support format is text PDF or txt in English. Images won't be scraped.</li>
                            <li  className='text-xs'>Files with multiple text columns, encrypted or password protected are not supported.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <button onClick={(e) => handleSubmit({ type: 'FILE' })} type="button" className="my-2 flex items-center justify-center gap-2 focus:ring-4 focus:outline-none font-medium bg-primary rounded-md text-xs py-2.5 px-4 w-auto focus:ring-yellow-300 text-white hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:text-white" disabled={DisablingButton() || loading === true}>
                {loading ? "Loading..." : "Save and close"}
            </button>
        </div>
    )
}

export default FileManagement