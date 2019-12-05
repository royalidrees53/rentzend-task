import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import fetch from 'isomorphic-fetch';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: 'http://localhost:5000/graphql',
    fetch
  })
});


export default client;
