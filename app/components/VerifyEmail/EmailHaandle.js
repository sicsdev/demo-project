
import CheckEmail from '@/app/components/VerifyEmail/VerifyEmail'
import React, { useState } from 'react'
import { getEnterpriseDomains, verifyDomain } from '@/app/API/pages/VerifyDomain'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import TopBar from '@/app/components/Common/Card/TopBar'
import { InboxIcon } from '@heroicons/react/24/outline'
import { errorMessage, successMessage } from '@/app/components/Messages/Messages'

const EmailHandle = () => {
    const user = useSelector((state) => state.user.data);
    const [allDomainsData, setAllDomainsData] = useState([]);
    const [dataLoader, setDataLoader] = useState(false);
    const [verifyLoader, setVerifyLoader] = useState(false);
    const [verifyDomainData, setVerifyDomainData] = useState({ success: false, registers: [] });
    useEffect(() => {
        getAllDomains();
    }, [])

    const getAllDomains = async () => {
        setDataLoader(true);
        const allDomains = await getEnterpriseDomains();
        if (allDomains?.data && allDomains?.data?.length > 0) {
            setAllDomainsData(allDomains?.data);
            const isVerifyDomain = await verifyDomain({});
            if (isVerifyDomain?.status === 200 || isVerifyDomain?.status === 201) {
                setVerifyDomainData(isVerifyDomain?.data);
            }
        }
        setDataLoader(false);
    };

    const verifyDomainHnadler = async () => {
        try {
            setVerifyLoader(true);
            const isVerifyDomain = await verifyDomain({});
            if (isVerifyDomain?.status === 200 || isVerifyDomain?.status === 201) {
                if (isVerifyDomain?.data?.success === true) {
                    successMessage("Verified Successfully!");
                } else {
                    errorMessage("Unable to verify. Please add or check your dns settings!");
                }
                setVerifyDomainData(isVerifyDomain?.data);
            }
            setVerifyLoader(false);
        } catch (error) {
            setVerifyLoader(false);
        }
    };

    return (
        <>
            <div className='bg-white my-4'>
                <div style={{ whiteSpace: "normal" }}>
                    {/* <TopBar title={`DNS Settings`} icon={<InboxIcon className="h-5 w-5 text-primary" />} /> */}
                    <CheckEmail data={allDomainsData} user={user} loader={dataLoader} getData={getAllDomains} verifyDomainHnadler={verifyDomainHnadler} verifyLoader={verifyLoader} verifyDomainData={verifyDomainData} />
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default EmailHandle