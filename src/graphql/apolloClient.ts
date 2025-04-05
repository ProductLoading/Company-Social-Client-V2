
      import { ApolloClient, InMemoryCache } from '@apollo/client';
      import { setContext } from '@apollo/client/link/context';
      import { onError } from '@apollo/client/link/error';
      // ESM ile çalıştığı için böyle import edilir:
      import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

      // ✅ Apollo Client Upload Link (Dosya yükleme desteği)
      const uploadLink = createUploadLink({
        uri: import.meta.env.VITE_API_URL || 'http://localhost:3000/graphql',
        
      });

      const authLink = setContext(async (_, { headers }) => {
        const { store } = await import('@/app/store'); 
        const state = store.getState() as any;

        const token = state.user.token;  

        return {
          headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
          },
        };
      });

      // ✅ Apollo Error Handling
      const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.forEach(({ message }) => {
            console.error(`[GraphQL error]: ${message}`);
          });
        }
        if (networkError) {
          console.error(`[Network error]: ${networkError}`);
        }
      });

      const apolloClient = new ApolloClient({
        link: errorLink.concat(authLink).concat(uploadLink),
        cache: new InMemoryCache(),
      });

      export default apolloClient;