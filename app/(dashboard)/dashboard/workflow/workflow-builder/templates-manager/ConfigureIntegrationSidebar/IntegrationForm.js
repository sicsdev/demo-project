import Button from '@/app/components/Common/Button/Button';
import TextField from '@/app/components/Common/Input/TextField';
import React from 'react';

const IntegrationForm = ({ integrationElement }) => {
    let integration = integrationElement.automation.integration;

    const convertToTitleCase = (str) => {
        const words = str.split('_');
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        const result = capitalizedWords.join(' ');
        return result;
    }

    return (
        <div className='text-black'>
            <div className='flex items-center gap-2 mb-4'>
                <div>
                    <img src={integration.icon} alt={integration.name} className='w-5 h-5' />
                </div>
                <div>
                    {integration.name}
                </div>
            </div>
            <form className='space-y-4'>
                {Object.entries(integration.data).map(([key, value]) => (
                    key !== 'icon' && key !== 'name' && (
                        <div key={key}>
                                <div className=""></div>
                                <TextField
                                    type="text"
                                    name={key}
                                    id={key}
                                    className=""
                                    defaultValue={value}
                                    labelClass={"font-bold mb-2"}
                                    title={convertToTitleCase(key)}
                                />
                        </div>
                    )
                ))}
                {/* Botón de envío u otras acciones */}
                <Button type='submit' className='py-2 px-4 rounded'>
                    Connect
                </Button>
            </form >
        </div >
    );
}

export default IntegrationForm;
