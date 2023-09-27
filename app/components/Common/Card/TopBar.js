import React from 'react'
import Link from 'next/link'

const TopBar = ({ title, icon, isBackButton = false, backButtonUrl = '/' }) => {
    return (
        <div className="border-b border-border flex items-center justify-between sticky top-0 bg-[#fff] z-40">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
                <li className="mr-2" >
                    <span
                        className={`flex justify-start gap-2 items-center  py-2 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group`}
                        aria-current="page"
                    >
                        {icon} {" "} {title}
                    </span>
                </li>
            </ul>
            {isBackButton === true && (
                <p className="text-sm">
                    <Link href={backButtonUrl}>back</Link>
                </p>
            )}
        </div>
    )
}

export default TopBar