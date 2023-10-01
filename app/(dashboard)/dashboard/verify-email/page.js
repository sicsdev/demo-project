'use client'
import CheckEmail from '@/app/components/VerifyEmail/VerifyEmail'
import React, { useState } from 'react'
import { getEnterpriseDomains } from '@/app/API/pages/VerifyDomain'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const VerifyEmail = () => {
    const user = useSelector((state) => state.user.data);
    const [allDomainsData, setAllDomainsData] = useState([]);
    const [dataLoader, setDataLoader] = useState(false);
    useEffect(() => {
        getAllDomains();
    }, [])

    const getAllDomains = async () => {
        setDataLoader(true);
        const allDomains = await getEnterpriseDomains();
        if (allDomains?.data && allDomains?.data?.length > 0) {
            setAllDomainsData(allDomains?.data);
        }
        setDataLoader(false);
    };

    return (
        <>
            <div className='bg-white'>
                <CheckEmail data={allDomainsData} user={user} loader={dataLoader} getData={getAllDomains} />
            </div>
            <ToastContainer />
        </>
    )
}

export default VerifyEmail