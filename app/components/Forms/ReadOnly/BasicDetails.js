import React from 'react'

const BasicDetails = () => {
    return (
        <div className='p-5 block sm:grid md:block lg:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 '>
            <div className='my-5'>
                <h3 className='font-semibold text-xl text-heading'>Business Address</h3>
                <p className='font-normal'>Test Address</p>
            </div>
            <div className='my-5'>
                <h3 className='font-semibold text-xl text-heading'>Business Name</h3>
                <p className='font-normal'>Normal</p>
            </div>
            <div className='my-5'>
                <h3 className='font-semibold text-xl text-heading'>Business Industry</h3>
                <p className='font-normal'>No</p>
            </div>
            <div className='my-5'>
                <h3 className='font-semibold text-xl text-heading'>Business Company Size</h3>
                <p className='font-normal'>High</p>
            </div>
            <div className='my-5'>
                <h3 className='font-semibold text-xl text-heading'>Ecommerce Platform</h3>
                <p className='font-normal'>Shopify</p>
            </div>
        </div>
    )
}

export default BasicDetails