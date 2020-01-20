import { theme as chakraTheme } from '@chakra-ui/core';

const fonts = { ...chakraTheme.fonts, mono: `'Menlo', monospace` };

const breakpoints = ['40em', '52em', '64em'];

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
