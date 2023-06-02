import React from 'react'

const BasicDetailsReadOnly = ({state}) => {
    console.log(state)
    return (
        <div>
            {state && (
                <div className='p-5 block sm:grid md:block lg:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 '>
                    <div className='my-5'>
                        <h3 className='font-semibold text-xl text-heading'>Business Address</h3>
                        <p className='font-normal'>{state?.business_address}</p>
                    </div>
                    <div className='my-5'>
                        <h3 className='font-semibold text-xl text-heading'>Business Name</h3>
                        <p className='font-normal'>{state?.business_name}</p>
                    </div>
                    <div className='my-5'>
                        <h3 className='font-semibold text-xl text-heading'>Business Industry</h3>
                        <p className='font-normal'>{state?.business_industry}</p>

                    </div>
                    <div className='my-5'>
                        <h3 className='font-semibold text-xl text-heading'>Business Company Size</h3>
                        <p className='font-normal'>{state?.business_company_size}</p>

                    </div>
                    <div className='my-5'>
                        <h3 className='font-semibold text-xl text-heading'>Ecommerce Platform</h3>
                        <p className='font-normal'>{state?.ecommerce_platform}</p>

                    </div>
                </div>
            )}
        </div>
    )
}

export default BasicDetailsReadOnly