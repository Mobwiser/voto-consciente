import {extendTheme} from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
  },
  colors: {
    primary: '#B2F5EA',
    accent: '#0788A0',
    emojies: {
      favor: '#8bc68b',
      against: '#fbbd50',
      blocker: '#fb3d3d',
      abstain: '#40a2be',
    },
  },
});

export default theme;
