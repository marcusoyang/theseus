import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = {
    sm: '40em',
    md: '52em',
    lg: '64em',
    xl: '80em',
};

const colors = {
    black: '#000',
    white: '#fff',
    gray: {
        100: '#777',
        200: '#666',
        300: '#555',
        400: '#444',
        500: '#333',
        600: '#222',
        700: '#111',
        800: '#000',
    },
};

const styles = {
    global: {
        'html, body': {
            bg: 'gray.500',
        },
    },
};

const config = {
    initialColorMode: 'dark',
};

const theme = extendTheme({
    breakpoints,
    colors,
    styles,
    config,
});

export default theme;
