import React from 'react'
import Card from '../../Common/Card/Card'

const BasicDetailsReadOnly = ({ state }) => {
    return (
        <div>
            {state && (
                <Card className='p-5 mt-3 block sm:grid md:block lg:grid grid-cols-1 '>

                    <div className='mt-3'>
                        <h3 className='font-semibold text-md text-heading'>Business Name</h3>
                        <p className='text-sm my-2'>{state?.business_name}</p>
                    </div>
                    <hr className='border-border' />
                    <div className='mt-3'>
                        <h3 className='font-semibold text-md text-heading'>Business Industry</h3>
                        <p className='text-sm my-2'>{state?.business_industry}</p>

                    </div>
                    <hr className='border-border' />
                    <div className='mt-3'>
                        <h3 className='font-semibold text-md text-heading'>Business Company Size</h3>
                        <p className='text-sm my-2'>{state?.business_company_size}</p>

                    </div>
                    <hr className='border-border' />
                    <div className='mt-3'>
                        <h3 className='font-semibold text-xl text-heading'>Business Address :</h3>
                        
                        <h3 className='font-semibold text-md text-heading mt-3'>Business City</h3>
                        <p className='text-sm my-2'>{state?.business_city}</p>
                    </div>
                    <hr className='border-border' />
                    <div className='mt-3'>
                        <h3 className='font-semibold text-md text-heading'>Business Street</h3>
                        <p className='text-sm my-2'>{state?.business_street}</p>

                    </div>
                    <hr className='border-border' />
                    <div className='mt-3'>
                        <h3 className='font-semibold text-md text-heading'>Business State</h3>
                        <p className='text-sm my-2'>{state?.business_state}</p>

                    </div>
                    <hr className='border-border' />
                    <div className='mt-3'>
                        <h3 className='font-semibold text-md text-heading'>Business Zipcode</h3> 
                        <p className='text-sm my-2'>{state?.business_zipcode}</p>

                    </div>
                    <hr className='border-border' />    

                </Card>
            )}
        </div>
    )
}

export default BasicDetailsReadOnly