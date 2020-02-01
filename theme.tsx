import { theme as chakraTheme } from '@chakra-ui/core';

const fonts = { ...chakraTheme.fonts, mono: `'Menlo', monospace` };

const breakpoints = ['30em', '48em', '62em', '80em'];

const theme = {
    ...chakraTheme,
    colors: {
        ...chakraTheme.colors,
        black: '#16161D',
        red: {
            ...chakraTheme.colors.red,
            '400': '#F56565',
        },
    },
    fonts,
    breakpoints,
};

chakraTheme.colors.gray;

export default theme;
