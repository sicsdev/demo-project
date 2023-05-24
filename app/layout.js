
import ChatBot from './components/Chatbot/ChatBot'
import Footer from './components/Layout/Footer'
import Header from './components/Layout/Header'
import ProviderWrapper from './components/store/Provider'
import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Tempo',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth bg-background_color">
      <body suppressHydrationWarning={true} className={inter.className}>
        <ChatBot/>
        <ProviderWrapper>
          
          <Header />
          {children}
          <Footer />
        </ProviderWrapper>
      </body>
    </html>
  )
}
