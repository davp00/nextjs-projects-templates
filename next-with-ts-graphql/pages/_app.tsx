import App from 'next/app';
import withApollo from '../utils/withApollo';
import { ApolloProvider } from '@apollo/client';

class MyApp extends App<any> {
  render(): JSX.Element {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
