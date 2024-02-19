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

function MyApp({Component, pageProps}) {
  return (
    <AppWrapper>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AppWrapper>
  );
}

export default MyApp;
