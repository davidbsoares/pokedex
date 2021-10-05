import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://beta.pokeapi.co/graphql/v1beta';

const client = new GraphQLClient(endpoint);

export default client;
