
// import ChatBot from '../components/Chatbot/ChatBot'
import ProviderWrapper from './components/store/Provider'
import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: "Tempo",
  description: "Generated by create next app",
  icons: {
    icon: 'favicon.ico',
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" className="scroll-smooth bg-background_color">
      <head>
        {/* <link rel="icon" href="/favicon.ico" /> */}

        <script
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
        ></script>
        <script
          async
          src="https://static.klaviyo.com/onsite/js/klaviyo.js"
          type="text/javascript"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
var _learnq = _learnq || [];
_learnq.push(['account', 'UVQx8p']);
`,
          }}
        />
      </head>
      <body suppressHydrationWarning={true} className={inter.className}>
        <ProviderWrapper>
          {children}
        </ProviderWrapper>
      </body>
    </html>
  );
}
