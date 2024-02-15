import '../styles/globals.css';

import {
  ArcElement,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';

import {AppWrapper} from '../context/AppContext';
import {ChakraProvider} from '@chakra-ui/react';
import Script from 'next/script';
import theme from '../styles/theme';

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

function TrackingCode() {
  return (
    <>
  <Script async src="https://www.googletagmanager.com/gtag/js?id=G-Q4RC1SY1JG"/>
  <Script id="script-gtm" strategy="afterInteractive">
    {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-GOOGLEID');
    `}
  </Script>
  </>)
}

function MyApp({Component, pageProps}) {
  return (
    <AppWrapper>
      <TrackingCode />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AppWrapper>
  );
}

export default MyApp;
