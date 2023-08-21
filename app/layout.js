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
    "name": "Tempo AI Ventures",
    "image": "https://usetempo.ai/logo.png",
    "url": "https://usetempo.ai/",
    "telephone": "8553083676",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "800 Third Avenue",
      "addressLocality": "New York",
      "addressRegion": "NY",
      "postalCode": "10022",
      "addressCountry": "US"
    }
  }

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

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet" />

        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

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
        
        </head>
      <body suppressHydrationWarning={true} className={inter.className}>
        <ProviderWrapper >
          <div className="tempo_container">{children}</div>
        </ProviderWrapper >
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          type="text/javascript"
          async
        />
      </body>
    </html>
  );
}
