// import ChatBot from '../components/Chatbot/ChatBot'
import ProviderWrapper from "./components/store/Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Script from 'next/script'
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Enhance Support with Chatbot, Email Ticketing, Inbound IVR | Tempo.ai",
  description: "Elevate your customer support with Tempo.ai's advanced solutions. Chatbot, Email Ticketing, Inbound IVR, and Outbound Agent capabilities for seamless interactions and improved efficiency",
  icons: {
    icon: "favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth ">
    

      <body suppressHydrationWarning={true} className={inter.className}>
        <ProviderWrapper>
          <div className="tempo_container">{children}</div>
        </ProviderWrapper>
      </body>


    </html>
  );
}