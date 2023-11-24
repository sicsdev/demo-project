import React from 'react'
import Modal from '../Common/Modal/Modal'
import { FidgetSpinner, ProgressBar } from 'react-loader-spinner'
import ProgressBarComponent from './ProgressBarComponent'
import PageLoader from 'next/dist/client/page-loader'
import './Loader.css'

const ProgressBarModal = () => {
    return (
        <Modal
            title={''}
            className={"sm:w-[30%] w-[100%]"}
            show={() => console.log('')}
            setShow={() => console.log('')}
            showCancel={true}
            customHideButton={false}
            showTopCancleButton={false}
            hr={false}
        >
            <div className='my-4 py-3'>
                <div className='flex justify-center text-center mb-5 text-sm'> Please wait a couple of minutes while we configure your custom Deflection bot.</div>
                <div className="spinner-container_Deflection my-3"><div class="spinnerDeflection"></div></div>
                <ProgressBarComponent></ProgressBarComponent>
            </div>
        </Modal>
    )
}

export default ProgressBarModal