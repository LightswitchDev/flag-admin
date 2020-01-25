import App from 'next/app';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import theme from '../theme';

import { SWRConfig } from 'swr';
import fetcher from '../lib/fetcher';

class AppWrapper extends App<any> {
    render() {
        const { Component, pageProps } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <CSSReset />
                <SWRConfig value={{ fetcher }}>
                    <Component {...pageProps} />
                </SWRConfig>
            </ThemeProvider>
        );
    }
}

export default AppWrapper;
