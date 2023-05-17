import Footer from './components/Layout/Footer'
import Header from './components/Layout/Header'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tempo',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning={true} className={inter.className}>
        <Header />
        {children}
        <Footer />

      </body>
    </html>
  )
}
