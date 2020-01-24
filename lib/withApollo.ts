import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

const GRAPHQL_URL =
    process.env.NODE_ENV === 'production' ? 'https://flag-api-vykaoik56q-uc.a.run.app' : 'http://localhost:8080';
console.log(GRAPHQL_URL);
export default withApollo(
    ({ initialState }) =>
        new ApolloClient({
            uri: GRAPHQL_URL,
            cache: new InMemoryCache().restore(initialState || {}),
        }),
);
