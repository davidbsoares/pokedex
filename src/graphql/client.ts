import { ApolloClient, InMemoryCache } from '@apollo/client';

const endpoint = 'https://beta.pokeapi.co/graphql/v1beta';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache: cache,
  uri: endpoint,
});

export default client;
