import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
    uri: import.meta.env.VITE_API_URL || 'http://localhost:3000/graphql',
});

// Örneğin auth token eklemek isterseniz:
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('accessToken');
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message
            // locations, path also can add
        }) => {
            console.error(`[GraphQL error]: Message: ${message}`);
        });
    }
    if (networkError) {
        console.error(`[Network error]: ${networkError}`);
    }
});

const apolloClient = new ApolloClient({
    link: errorLink.concat(authLink).concat(httpLink),
    cache: new InMemoryCache(),
});

export default apolloClient;
