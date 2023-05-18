import React from 'react'
import Carasual from '../Providers/Carasual'

const slides = [
    {
        background: `number-slide1`,
        title: "When a customer calls or emails or reaches out over social or Messenger, we can actually see what they've done and our people can refer to it. The customer feels as if we know them.",
        editor: "Mirjam Van Den Berg",
        position: "Chief Customer Care Officer",
        img: "https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2Fc96c1c95d29140a%2Foriginal%2FTravix-Company-logo.webp&w=640&q=75"
  
  
    },
    {
        background: `number-slide2`,
        title: "I’m responsible for our chat platform and channel service strategy. The reason why we moved to Freshworks was for the APIs so that we can be our own chat client. I really enjoyed the collaboration.",
        editor: "Eric Bompas",
        position: "Product Manager",
        img: "https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2F29af53505aef9f5d%2Foriginal%2FKlarna-logo-testimonial.webp&w=640&q=75"
    },
    {
        background: `number-slide3`,
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
            <Carasual slides={slides}/>
        </div>
    )
}

export default Benifits