import React from 'react'

const List = ({ heading, content, className, children }) => {
    return (
        <div className={className}>
            <div className='p-1  md:border lg:border md:border-l-0 md:border-b-0 md:border-t-0 lg:border-l-0 lg:border-b-0 lg:border-t-0 border-border'>
                <h3 className='text-heading uppercase text-sm font-semibold'>WHAT IS FRONT?</h3>
                <ul className='mt-10'>
                    <li className='cursor-pointer'>
                        <div className='hover:bg-gray p-2 rounded-lg'>
                            <h3 className='text-heading text-semibold'>Product overview</h3>
                            <p className='text-border text-xs mt-2'>Learn how Front helps build stronger customer relationships and operational efficiency</p>
                        </div>
                    </li>
                    <li className='cursor-pointer'>
                        <div className='hover:bg-gray p-2 rounded-lg'>
                            <h3 className='text-heading text-semibold'>Product overview</h3>
                            <p className='text-border text-xs mt-2'>Learn how Front helps build stronger customer relationships and operational efficiency</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className='p-1 '>
                <h3 className='text-heading uppercase text-sm font-semibold'>WHAT IS FRONT?</h3>
                <ul className='mt-10'>
                    <li className='cursor-pointer'>
                        <div className='hover:bg-gray p-2 rounded-lg'>
                            <h3 className='text-heading text-semibold'>Product overview</h3>
                            <p className='text-border text-xs mt-2'>Learn how Front helps build stronger customer relationships and operational efficiency</p>
                        </div>
                    </li>
                    <li className='cursor-pointer'>
                        <div className='hover:bg-gray p-2 rounded-lg'>
                            <h3 className='text-heading text-semibold'>Product overview</h3>
                            <p className='text-border text-xs mt-2'>Learn how Front helps build stronger customer relationships and operational efficiency</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default List