// import ChatBot from '../components/Chatbot/ChatBot'
// 'use client'
// import { useEffect, useState } from "react";
// import ProviderWrapper from "./components/store/Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import Swal from "sweetalert2";
// import { useRouter } from 'next/navigation';
import dynamic from "next/dynamic";
import Head from "next/head";

const NoSSRProviderWrapper = dynamic(
  () => import("./components/store/Provider"),
  {
    ssr: false,
  }
);

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  other: {
    pinterest: "nopin",
    appleMobileWebAppTitle: "Deflection AI",
    appleMobileWebAppStatusBarStyle: "black",
    appleMobileWebAppCapable: "yes",
    appleTouchFullscreen: "yes",
    appleTouchIcon: "https://deflection.ai/logo-simple-negative.png",
    ogImage: "https://deflection.ai/logo-simple-negative.png",
    ogUrl: "https://deflection.ai/",
  },
  title:
    "Enhance Support with Chatbot, Email Ticketing, Inbound IVR | Deflection AI",
  description:
    "Elevate your customer support with Deflection AI.ai's advanced solutions. Chatbot, Email Ticketing, Inbound IVR, and Outbound Agent capabilities for seamless interactions and improved efficiency",
  icons: {
    icon: "https://deflection.ai/icon-simple.ico",
  },
  openGraph: {
    images: "https://www.deflection.ai/logo-basic-negative.png",
  },
};

export default function RootLayout({ children }) {
  let schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Deflection AI Ventures",
    image: "https://deflection.ai/logo.png",
    url: "https://deflection.ai/",
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

  // useEffect(() => {
  //   const storedToken = localStorage.getItem('Token');
  //   const storedTokenCookie = getCookie('Token');
  //   console.log(storedTokenCookie)
  //   console.log(storedToken)
  //   if (storedToken || storedTokenCookie) checkActivity();
  // }, [])

  function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return null;
  }

  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  // const router = useRouter();
  let inactivityTime = 0;
  const maxInactivityTime = 30;
  const warningTime = 25;
  let alreadyWarned = false;

  function resetTimer() {
    inactivityTime = 0;
  }

  function handleInactive() {
    localStorage.removeItem("Token");
    deleteCookie("Token");
    location.reload();
    console.log("30 min of inactivity. Session closed.");
  }

  function checkActivity() {
    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keydown", resetTimer);
    document.addEventListener("mousedown", resetTimer);
    document.addEventListener("touchstart", resetTimer);
    document.addEventListener("scroll", resetTimer);

    setInterval(function () {
      inactivityTime += 1;
      if (inactivityTime >= maxInactivityTime) {
        handleInactive();
      } else if (inactivityTime >= warningTime) {
        if (!alreadyWarned) showWarning();
      }
    }, 1000);
  }

  function showWarning() {
    // This function will be executed when there are 5 minutes left before session expiration
    alreadyWarned = true;

    Swal.fire({
      title: "Warning!",
      text: "Your session is about to expire. Do you want to continue?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Continue",
      cancelButtonText: "Log Out",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        alreadyWarned = false;
        resetTimer();
      } else {
        localStorage.removeItem("Token");
        deleteCookie("Token");
        location.reload();
        console.log("User chose to log out");
      }
    });
  }

  return (
    <html lang="en" className="scroll-smooth ">
      <Head>
        <meta name="apple-mobile-web-app-title" content="Deflection AI" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta
          name="apple-touch-icon"
          content="https://deflection.ai/logo-simple-negative.png"
        />

        <meta property="og:title" content="Deflection AI" />
        <meta
          property="og:description"
          content="Intelligent Automation for Exceptional Customer Service"
        />
        <meta
          property="og:image"
          content="https://deflection.ai/logo-simple-negative.png"
        />
        <meta property="og:url" content="https://deflection.ai/" />
      </Head>
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
        <link
          rel="stylesheet"
          href="https://widget-dev.deflection.ai/v1/assets/css/app.css"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="icon"
          href="https://deflection.ai/logo-simple-negative.png"
        />

        <link
          rel="stylesheet"
          href="https://widget-dev.deflection.ai/v1/assets/css/optionsbuttons.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script src="https://widget-dev.deflection.ai/v1/main.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          ChatBot.Widget({
            id: "07edd680-e6fa-4ca3-ac1e-fcc10b4c6f71",
            embed: true
          });
        `,
          }}
        />
        {/* <!-- Meta Pixel Code --> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1108219650167838');
            fbq('track', 'PageView');
      `,
          }}
        />
        {/* <!-- End Meta Pixel Code --> */}
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
        <NoSSRProviderWrapper>
          <div className="tempo_container">{children}</div>
        </NoSSRProviderWrapper>

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
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
    </html>
  );
}
