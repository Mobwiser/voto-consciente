import { Html, Head, Main, NextScript } from 'next/document'
import React from "react";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q4RC1SY1JG"></script>
                <script id="script-gtm">
                    {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-Q4RC1SY1JG');
    `}
                </script>
                <meta name="description" content="BLA BLAVerifica a tua identidade politica de acordo com a tua visão da sociedade" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}