import React from 'react'
import { Input } from '../Common/Input/Input'
import Button from '../Common/Button/Button'
import Card from '../Common/Card/Card'
import { useRouter } from 'next/navigation';

const Demo = () => {

    const router = useRouter();
    const handleNavigate = () => {
        let emailInput = document.getElementById('email').value;
        console.log(emailInput)
        localStorage.setItem('tempEmail', emailInput);
        router.push(`/free-trial`);
    }

    return (
        <div className="mx-auto">
            <Card className={'bg-white'}>
                <h1 className='text-center text-2xl sm:text-4xl md:text-4xl lg:text-4xl my-2 font-semibold text-heading'>Join the <span className='text-voilet'>11,907+ brands</span> that use Gorgias every day</h1>
                <form className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-1 mt-8'>
                    <div className='inline col-span-2 '>
                        <Input type={"email"} placeholder={"Enter your email"} className={"border border-input_color w-full"} id={"email"} onChange={(value) => { console.log(value) }} />
                    </div>
                    <div className='inline mt-5 sm:m-0 md:m-0 lg:m-0'>
                        <Button
                            onClick={handleNavigate}
                            className={'py-[11px] px-2 w-full focus:ring-yellow-300 text-white bg-primary hover:bg-black dark:focus:ring-yellow-900'}
                        >
                            Start your Free Trial
                        </Button>
                    </div>

                </form>
                <div className='block sm:flex md:flex lg:flex justify-start items-center gap-5'>
                    <small className='text-border'>No credit card required</small>
                    <small className='text-border'>Instant setup</small>
                    <small className='text-border'>7-day free trial</small>
                </div>
            </Card>

        </div >
    )
}

export default Demo