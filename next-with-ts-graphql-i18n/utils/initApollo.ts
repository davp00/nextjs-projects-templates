import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/link-context';
import fetch from 'isomorphic-unfetch';
import { isBrowser } from './isBrowser';
import { AppCookies } from '../interfaces/appCookies';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  (global as any).fetch = fetch;
}

interface Options {
  getToken: () => string;
  getCookies: () => AppCookies | any;
}

export const GQL_SERVER = process.env.GRAPHQL_ENDPOINT;

function create(initialState: any, { getToken, getCookies }: Options) {
  const httpLink = createHttpLink({
    uri: GQL_SERVER,
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    const appCookies = getCookies();
    const appHeaders = {
      ...headers,
      cookie: token ? `qid=${token}` : '',
      authorization: appCookies.userToken
        ? `Bearer ${appCookies.userToken}`
        : '',
    };
    return {
      headers: appHeaders,
    };
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(
  initialState: any,
  options: Options
): ApolloClient<NormalizedCacheObject> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)

  if (!isBrowser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
