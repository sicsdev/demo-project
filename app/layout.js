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
  return (
    <html lang="en" className="scroll-smooth ">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
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
        <link rel="preload" as="script" href="https://widget-dev.usetempo.ai/v1/main.js" />
      </head>
      <body suppressHydrationWarning={true} className={inter.className}>
        <ProviderWrapper>
          <div className="tempo_container">{children}</div>
        </ProviderWrapper>
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          type="text/javascript"
          async
        />
      </body>
    </html>
  );
}
