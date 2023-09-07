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
        <Modal
            title={<span className='flex items-center justify-center gap-1'><ArrowLeftIcon onClick={(e) => { setCreatePdfModal(false); setCreateModal(true); }} className='w-6 h-6 pr-2 hover:text-primary cursor-pointer' />Add new Support Content</span>}
            show={createPdfModal}
            setShow={setCreatePdfModal}
            showCancel={true}
            className={"w-[100%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"}
        >
            <div className=''>
                <div className='border-b border-gray pb-5'>
                    <p className='font-semibold text-sm my-2'>File Upload</p>
                    <div className='block sm:flex items-center justify-between gap-8'>
                        <div>
                            <FileUploader types={["pdf", "txt",""]} handleChange={handleChange} name="file"  />
                        </div>
                        <div className='pt-4 sm:pt-0'>
                            <ul className='list-disc text-xs'>
                                <li>Support format is text PDF or txt in English. Images won't be scraped.</li>
                                <li>Files with multiple text columns, encrypted or password protected are not supported.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <button onClick={(e) => handleSubmit({ type: 'FILE' })} type="button" className="my-2 flex items-center justify-center gap-2 focus:ring-4 focus:outline-none font-bold bg-primary rounded-md text-sm py-2.5 px-4 w-auto focus:ring-yellow-300 text-white hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:text-white" disabled={DisablingButton() || loading === true}>
                    {loading ? "Loading..." : "Save and close"}
                </button>
            </div>
        </Modal>
    )
}

export default FileManagement