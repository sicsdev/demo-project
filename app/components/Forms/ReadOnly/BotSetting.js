import React from 'react'
import Card from '../../Common/Card/Card'
import { useState } from 'react';
import { useEffect } from 'react';

const BotSettingReadOnly = ({ basicFormData }) => {
    const [state, setState] = useState(null)
    useEffect(() => {
        if (basicFormData) {
            setState(basicFormData)
        }
    }, [basicFormData]);
    console.log("state",state)
    return (
        <div>
            {state && (
                <Card className='p-5 mt-3 block sm:grid md:block lg:grid grid-cols-1 '>

                    <div className='mt-3'>
                        <h3 className='font-semibold text-md text-heading'>Email Introduction</h3>
                        <p className='text-sm my-2'>{state?.email_introduction.split(" ")[0]}</p>
                    </div>
                    <hr className='border-border' />
                    <div className='mt-3'>
                        <h3 className='font-semibold text-md text-heading'>Agent Job Title
                        </h3>
                        <p className='text-sm my-2'>{state?.agent_title}</p>

                    </div>
                    <hr className='border-border' />
                    <div className='mt-3'>
                        <h3 className='font-semibold text-md text-heading'>Email Sign-Off</h3>
                        <p className='text-sm my-2'>{state?.email_signOff.split(",")[0]}  {state?.agent_name[0]}</p>

                    </div>
                    <hr className='border-border' />
                    <div className='mt-3'>

                        <h3 className='font-semibold text-md text-heading'>Agent Name(s)</h3>
                        {state?.agent_name?.length > 0 && state?.agent_name.map((ele, key) => <p key={key} className='text-sm my-2'>{ele}</p>)}
                    </div>
                    <hr className='border-border' />
                </Card>
            )}
        </div>
    )
}

export default BotSettingReadOnly