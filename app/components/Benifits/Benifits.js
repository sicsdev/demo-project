import React from 'react'
import Carasual from '../Providers/Carasual'
import Image from 'next/image';
const slides = [
    {
        background: `bg-sky`,
        title: "When a customer calls or emails or reaches out over social or Messenger, we can actually see what they've done and our people can refer to it. The customer feels as if we know them.",
        editor: "Mirjam Van Den Berg",
        position: "Chief Customer Care Officer",
        img: "https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2Fc96c1c95d29140a%2Foriginal%2FTravix-Company-logo.webp&w=640&q=75"


    },
    {
        background: `bg-orange`,
        title: "I’m responsible for our chat platform and channel service strategy. The reason why we moved to Freshworks was for the APIs so that we can be our own chat client. I really enjoyed the collaboration.",
        editor: "Eric Bompas",
        position: "Product Manager",
        img: "https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2F29af53505aef9f5d%2Foriginal%2FKlarna-logo-testimonial.webp&w=640&q=75"
    },
    {
        background: `bg-neon`,
        title: "Tempo has scaled with us. What I love most is that I don't need an administrator to maintain it. Ticket automation, screen-share through the chat.",
        editor: "Kris Sundberg",
        position: "VP of Customer Success",

        img: "https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2F4846f24e15880b54%2Foriginal%2FRestaurant-365-logo.webp&w=640&q=75"
    }
];
const Benifits = () => {
    return (
        <div>
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl my-8 font-bold text-heading'>
                Why customers love Tempo
            </h1>
            <Carasual>
                {slides.map((element, key) =>
                    <div key={key}

                        className={`${element.background} ease-in rounded-2xl bg-center bg-cover duration-1000`}
                    >
                        <div className="flex items-center justify-center sm:mx-5 md:mx-5 lg:mx-5">
                            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
                                <div className="text-lg  col-span-2 font-bold text-center p-10 sm:my-16 md:my-16 lg:my-16  rounded-lg order-2 sm:-order-none md:-order-none lg:-order-none ">
                                    <h1 className='text-start sm:text-start md:text-start lg:text-start   text-2xl sm:text-2xl md:text-3xl lg:text-4xl my-2 font-normal text-heading'>
                                        {element.title}
                                    </h1>
                                    <h3 className='text-start text-xl font-normal text-gray-600'>{element.editor}</h3>
                                    <h3 className='text-start text-xl  font-semibold  text-violet-700'>{element.position}</h3>
                                </div>

                                <div className="text-lg  font-bold text-center p-10 sm:mt-16 md:mt-16 lg:mt-16  rounded-lg order-1 sm:-order-none md:-order-none lg:-order-none">
                                    <Image
                                        src={element.img}
                                        width={500}
                                        height={500}
                                        alt="Picture of the author"
                                        className="rounded-3xl"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </Carasual>
        </div>
    )
}

export default Benifits