// import ChatBot from '../components/Chatbot/ChatBot'
import ProviderWrapper from "./components/store/Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title:
    "Enhance Support with Chatbot, Email Ticketing, Inbound IVR | Tempo.ai",
  description:
    "Elevate your customer support with Tempo.ai's advanced solutions. Chatbot, Email Ticketing, Inbound IVR, and Outbound Agent capabilities for seamless interactions and improved efficiency",
  icons: {
    icon: "favicon.ico",
  },
};

export default function RootLayout({ children }) {
  let schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tempo AI Ventures",
    image: "https://usetempo.ai/logo.png",
    url: "https://usetempo.ai/",
    telephone: "8553083676",
    address: {
      "@type": "PostalAddress",
      streetAddress: "800 Third Avenue",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10022",
      addressCountry: "US",
    },
  };

  return (
    <html lang="en" className="scroll-smooth ">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/swiper/css/swiper.min.css"
        />
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />

        {/* <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        ></meta> */}

        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet" />


        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script src="https://widget-dev.usetempo.ai/v1/main.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          ChatBot.Widget({
            id: "3930c19f-3a84-422c-9b3d-e7210f97b78b",
          });
        `,
          }}
        />


        {/* Google tag */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-HFHNKD99J4"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-HFHNKD99J4');
      `,
          }}

        />
        {/* <!-- Google Tag Manager -->  */}


        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': 
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], 
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); 
})(window,document,'script','dataLayer','GTM-P3BH433');`,
          }}
        />


        {/* <!-- End Google Tag Manager --> */}{" "}
      </head>



      <body suppressHydrationWarning={true} className={inter.className}>
        <ProviderWrapper>
          <div className="tempo_container">{children}</div>
        </ProviderWrapper>

        <Script
          dangerouslySetInnerHTML={{
            __html: ` 
          (function(h,o,t,j,a,r){ 
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)}; 
            h._hjSettings={hjid:3513917,hjsv:6}; 
            a=o.getElementsByTagName('head')[0]; 
            r=o.createElement('script');r.async=1; 
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv; 
            a.appendChild(r); 
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=') 
          `,
          }}
        />

        <Script
          dangerouslySetInnerHTML={{
            __html: ` 
            var userId = 2674167;  
            window.hj('identify', userId, { 
                // Add your own custom attributes here. Some EXAMPLES: 
                // 'Email': "". 
                // 'Last purchase category': 'Electronics', // Send strings with quotes around them. 
                // 'Total purchases': 15, // Send numbers without quotes. 
                // 'Last purchase date': '2019-06-20Z', // Send dates in ISO-8601 format. 
                // 'Last refund date': null, // Send null when no value exists for a user. 
            }); 
          `,
          }}
        />

        <Script
          async
          src="https://static.klaviyo.com/onsite/js/klaviyo.js"
          type="text/javascript"
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: ` 
var _learnq = _learnq || []; 
_learnq.push(['account', 'UVQx8p']); 
`,
          }}
        />

        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          type="text/javascript"
          async
        />
      </body>
    </html>
  );
}
