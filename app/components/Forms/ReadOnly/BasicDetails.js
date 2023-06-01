import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../Loading/Loading'

const BasicDetails = () => {
    const state = useSelector(state => state.user)
    return (
        <>
            {state.isLoading ?
                <>
                    <Loading />
                </>
                :
                <>
                    {state.data && (
                        <div className='p-5 block sm:grid md:block lg:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 '>
                            <div className='my-5'>
                                <h3 className='font-semibold text-xl text-heading'>Business Address</h3>
                                <p className='font-normal'>{state.data.enterprise.address}</p>
                            </div>
                            <div className='my-5'>
                                <h3 className='font-semibold text-xl text-heading'>Business Name</h3>
                                <p className='font-normal'>{state.data.enterprise.name}</p>
                            </div>
                            <div className='my-5'>
                                <h3 className='font-semibold text-xl text-heading'>Business Industry</h3>
                                <p className='font-normal'>{state.data.enterprise.industry}</p>
                            </div>
                            <div className='my-5'>
                                <h3 className='font-semibold text-xl text-heading'>Business Company Size</h3>
                                <p className='font-normal'>{state.data.enterprise.company_size}</p>
                            </div>
                            <div className='my-5'>
                                <h3 className='font-semibold text-xl text-heading'>Ecommerce Platform</h3>
                                <p className='font-normal'>{state.data.enterprise.ecommerce_platform}</p>
                            </div>
                        </div>
                    )}
                </>
            }
        </>
    )
}

export default BasicDetails