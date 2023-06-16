import React from 'react'
const List = ({ nav_links, className }) => {
    return (
        <div className={className}>
            {nav_links?.map((element, key) =>
                <div key={key} className={`p-1 ${key !== nav_links.length - 1 && ("md:border lg:border md:border-l-0 md:border-b-0 md:border-t-0 lg:border-l-0 lg:border-b-0 lg:border-t-0 border-border")}`}>
                    <h3 className='text-heading uppercase text-sm font-semibold'>{element.list_heading}</h3>
                    <ul className='mt-5'>
                        {element.data.map((element, key) =>
                            <li className='cursor-pointer' key={key}>
                                <div className='hover:bg-gray p-2 rounded-lg'>
                                    <h3 className='text-heading text-semibold flex items-center justify-between'>{element.heading}{" "} {element.label}</h3>
                                    <p className='text-border text-xs mt-2 min-h-[34px]'>{element.para}</p>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default List