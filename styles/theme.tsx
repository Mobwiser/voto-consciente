import {extendTheme} from '@chakra-ui/react';

import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/400.css"; // Specify weight
import "@fontsource/montserrat/400-italic.css"; //

const theme = extendTheme({
  fonts: {
    heading: `Montserrat, sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
  config: {
    initialColorMode: 'light',
  },
  colors: {
    primary: '#F1A16E',
    accent: '#5966B3',
    emojies: {
      favor: '#8bc68b',
      against: '#fbbd50',
      blocker: '#fb3d3d',
      abstain: '#40a2be',
    },
  },
});

export default theme;
