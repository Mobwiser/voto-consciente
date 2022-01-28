import {ChakraProvider} from '@chakra-ui/react';
import {AppWrapper} from '../context/AppContext';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';

import '../styles/globals.css';
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
