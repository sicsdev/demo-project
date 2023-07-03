// import ChatBot from '../components/Chatbot/ChatBot'
import ProviderWrapper from "./components/store/Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Script from 'next/script'
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Tempo",
  description: "Customer service ai platform",
  icons: {
    icon: "favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth ">
      <head>
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <meta property="og:title" content="Tempo" />
        <meta
          property="og:image"
          content="https://usetempo.ai/tempo_preview.jpg"
        />

        <Script
          id="hotjar"
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
          id="hotjar"
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
          id="gtm"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P3BH433')
`,
          }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P3BH433"
            height="0"

            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Script
          id="gtm"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P3BH433')
`,
          }}
        />
        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          id="gtm"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GEYJNVQCQE"
        />
        <Script
          id="gtag"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-GEYJNVQCQE')`,
          }}
        />

        <Script
          id="klaviyo"
          async
          src="https://static.klaviyo.com/onsite/js/klaviyo.js"
          type="text/javascript"
        />
        <Script
          id="widget"
          dangerouslySetInnerHTML={{
            __html: `
var _learnq = _learnq || [];
_learnq.push(['account', 'UVQx8p']);
`,
          }}
        />
        <Script src="https://widget-dev.usetempo.ai/v1/main.js" />

        <Script dangerouslySetInnerHTML={{
          __html: `
  ChatBot.Widget({

    id: "3930c19f-3a84-422c-9b3d-e7210f97b78b",

  });`}} />
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </head>

      <body suppressHydrationWarning={true} className={inter.className}>
        <ProviderWrapper>
          <div className="tempo_container">{children}</div>
        </ProviderWrapper>
      </body>

      <Script
        id="widget"
        src="https://assets.calendly.com/assets/external/widget.js"
        type="text/javascript"
        async
      />
    </html>
  );
}
