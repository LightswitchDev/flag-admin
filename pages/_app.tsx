import App from 'next/app';
import { WithApolloProps } from 'next-with-apollo';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import theme from '../theme';
import fetch from 'isomorphic-unfetch';

import { SWRConfig } from 'swr';

class AppWrapper extends App<WithApolloProps<any>> {
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
