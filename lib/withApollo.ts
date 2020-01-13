import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

const GRAPHQL_URL = 'localhost:4000/graphql';

export default withApollo(
    ({ initialState }) =>
        new ApolloClient({
            uri: GRAPHQL_URL,
            cache: new InMemoryCache().restore(initialState || {})
        }));