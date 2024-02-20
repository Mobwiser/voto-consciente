import { Html, Head, Main, NextScript } from 'next/document'
import React from "react";
import Script from 'next/script';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta name="description" content="Verifica a tua identidade politica de acordo com a tua visão da sociedade" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-Q4RC1SY1JG" strategy="beforeInteractive" />
            <Script id="google-analytics" strategy="beforeInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-Q4RC1SY1JG');
        `}
            </Script>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}