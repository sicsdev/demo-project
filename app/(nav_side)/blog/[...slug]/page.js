import React from 'react'

const Page = ({params}) => {
    const data = [
        {
          top: "PRODUCT & DESIGN 59 MIN WATCH",
          title: "From science fiction to tech reality: Exploring the impact of AI",
          slug: "from-science-fiction-to-tech-reality",

          para: "A fascinating conversation on AI that touches on a lot of the broader, existential issues raised by this incredible new tech.",
          Image: "imagone.png",
        },
        {
          top: "CUSTOMER & DESIGN 59 MIN WATCH",
          title: "Exploring the impact of AI",
          slug: "exploring-the-impact-of-ai",

          para: "A fascinating conversation on AI that touches on a lot of the broader, existential issues raised by this incredible new tech.",
          Image: "imagetwo.jpg",
        },
        {
          top: "PRODUCT & DESIGN 59 MIN WATCH",
          title: "Response Time: Vol. 8",
          slug:"response-time",
          para: "A fascinating conversation on AI that touches on a lot of the broader, existential issues raised by this incredible new tech.",
          Image: "imagethree.png",
        },
      ];
    return (
    <div>{params.slug}</div>
  )
}

export default Page