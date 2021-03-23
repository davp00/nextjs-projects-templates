import withApollo from '../utils/withApollo';
import { ApolloProvider } from '@apollo/client';
import { appWithTranslation } from 'next-i18next';
import App from 'next/app';

const MyApp = ({ Component, pageProps, apolloClient }: any): JSX.Element => (
  <ApolloProvider client={apolloClient}>
    <Component {...pageProps} />
  </ApolloProvider>
);

MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default withApollo(appWithTranslation(MyApp));
