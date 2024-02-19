import { Html, Head, Main, NextScript } from 'next/document'
import React from "react";
import GoogleTagManager from "@magicul/next-google-tag-manager";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta name="description" content="Verifica a tua identidade politica de acordo com a tua visão da sociedade" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
            <GoogleTagManager id="G-Q4RC1SY1JG" />
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}