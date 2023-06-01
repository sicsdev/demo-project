import React from 'react'

const CustomerServiceSetupForm = () => {
    return (
        <div className='p-5 block sm:grid md:block lg:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 '>
            <div className='my-5'>
                <h3 className='font-semibold text-xl text-heading'>Enable Refunds</h3>
                <p className='font-normal'>Yes</p>
            </div>
            <div className='my-5'>
                <h3 className='font-semibold text-xl text-heading'>Refund Friendliness</h3>
                <p className='font-normal'>Normal</p>
            </div>
            <div className='my-5'>
                <h3 className='font-semibold text-xl text-heading'>Enable Cancellations</h3>
                <p className='font-normal'>No</p>
            </div>
            <div className='my-5'>
                <h3 className='font-semibold text-xl text-heading'>Cancellation Friendliness</h3>
                <p className='font-normal'>High</p>
            </div>
            <div className='my-5'>
                <h3 className='font-semibold text-xl text-heading'>Email Ticketing System</h3>
                <p className='font-normal'>Zendesk</p>
            </div>
            <div className='my-5'>
                <h3 className='font-semibold text-xl text-heading'>Ecommerce Platform</h3>
                <p className='font-normal'>Shopify</p>
            </div>
            <div className='my-5'>
                <h3 className='font-semibold text-xl text-heading'>Payments Platform</h3>
                <p className='font-normal'>Shopify Pay</p>
            </div>
            <div className='my-5'>
                <h3 className='font-semibold text-xl text-heading'>FAQ Upload</h3>
                <p className='font-normal'>Yes</p>
            </div>
        </div>
    )
}

export default CustomerServiceSetupForm