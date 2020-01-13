import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import withApollo from '../lib/withApollo';
import { WithApolloProps } from 'next-with-apollo';
import { ThemeProvider } from '@chakra-ui/core';
import theme from '../theme';

class AppWrapper extends App<WithApolloProps<any>> {
  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>

    );
  }
}

export default withApollo(AppWrapper);