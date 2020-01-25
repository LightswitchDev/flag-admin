import App from 'next/app';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import theme from '../theme';
import fetch from 'isomorphic-unfetch';

import { SWRConfig } from 'swr';

const fetcher = (url: string, ...args: any[]) => {
    return fetch(url, ...args).then(r => r.json());
};
class AppWrapper extends App<any> {
    render() {
        const { Component, pageProps } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <CSSReset />
                <SWRConfig value={{ refreshInterval: 3000 }}>
                    <Component {...pageProps} />
                </SWRConfig>
            </ThemeProvider>
        );
    }
}

export default AppWrapper;
