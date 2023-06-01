import React, { useState } from 'react'
import BasicDetails from '../Forms/BasicDetails';
import Embed from '../Embed/Embed';
import Modal from '../Common/Modal/Modal';
import CustomerServiceSetupForm from '../Forms/CustomerServiceSetupForm';
const Intake = () => {
    const [basicFormData, setBasicFormData] = useState({})
    const [formCustomerData, setCustomerFormData] = useState({})
    const [showModal, setShowModal] = useState(true);
    const [intakeStep, setIntakeStep] = useState(1)

    const GetStepForm = () => {
        switch (intakeStep) {
            case 0:
                return <BasicDetails basicFormData={basicFormData} setBasicFormData={setBasicFormData} intakeStep={intakeStep} setIntakeStep={setIntakeStep} />
            case 1:
                return <CustomerServiceSetupForm formCustomerData={formCustomerData} setCustomerFormData={setCustomerFormData} intakeStep={intakeStep} setIntakeStep={setIntakeStep} />
            case 2:
                return <Embed />
            default:
                return <h1>Something wrong !</h1>
        }
    }

    const SendTitle = () => {
        switch (intakeStep) {
            case 0:
                return 'Business Information'
            case 1:
                return 'Customer Service Set Up'
            case 2:
                return 'Download Script'
            default:
                return <h1>Something wrong !</h1>
        }
    }
    return (
        <Modal className={"w-[90%]  sm:w-[60%] md:w-[60%] lg:w-[60%]"} show={showModal} setShow={setShowModal} title={SendTitle()} showCancel={true}>
            {GetStepForm()}
        </Modal>
    );
}

export default Intake