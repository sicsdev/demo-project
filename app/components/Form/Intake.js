import React, { useEffect, useState } from 'react'
import BasicDetails from '../Forms/BasicDetails';
import Embed from '../Embed/Embed';
import Modal from '../Common/Modal/Modal';
import CustomerServiceSetupForm from '../Forms/CustomerServiceSetupForm';
import { useSelector } from 'react-redux';
import { UserCircleIcon, CogIcon } from '@heroicons/react/24/outline'

const Intake = () => {
    const [basicFormData, setBasicFormData] = useState({})
    let state = useSelector((state) => state.botId.showModal)
    const [formCustomerData, setCustomerFormData] = useState({})
    const [showModal, setShowModal] = useState(false);
    const [intakeStep, setIntakeStep] = useState(0);

    useEffect(() => {
        setShowModal(state);
    }, [state])

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
                return <><UserCircleIcon className="w-10 h-10 mr-2" />Business Information</>
            case 1:
                return <><CogIcon className="w-10 h-10 mr-2" />Customer Service set up</>
            case 2:
                return 'Download Script'
            default:
                return <h1>Something wrong !</h1>
        }
    }
    return (
        <Modal className={"w-[90%]  sm:w-[90%] md:w-[60%] lg:w-[40%]"} show={showModal} setShow={setShowModal} title={SendTitle()} showCancel={false}>
            {GetStepForm()}
        </Modal>
    );
}

export default Intake