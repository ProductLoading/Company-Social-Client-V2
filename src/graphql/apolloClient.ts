      // import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
      // import { setContext } from '@apollo/client/link/context';
      // import { onError } from '@apollo/client/link/error';

      // // Direkt import etmiyoruz, çünkü store henüz initialize edilmemiş olabilir.
      // // import { store } from '@/app/store';

      // // ✅ Apollo Client HTTP Link (GraphQL API'ye istek atma)
      // const httpLink = createHttpLink({
      //   uri: import.meta.env.VITE_API_URL || 'http://localhost:3000/graphql',
      // });

      // // ✅ Auth Middleware - Token’ı Lazy (Dinamik) Olarak Al
      // const authLink = setContext(async (_, { headers }) => {
      //   // ❗ Redux store'u import etme, fonksiyon içinde çağır
      //   const { store } = await import('@/app/store'); // Lazy import

      //   const token = store.getState().user.token; // Redux’tan token al

      //   return {
      //     headers: {
      //       ...headers,
      //       Authorization: token ? `Bearer ${token}` : '',
      //     },
      //   };
      // });

      // // ✅ Apollo Error Handling
      // const errorLink = onError(({ graphQLErrors, networkError }) => {
      //   if (graphQLErrors) {
      //     graphQLErrors.forEach(({ message }) => {
      //       console.error(`[GraphQL error]: ${message}`);
      //     });
      //   }
      //   if (networkError) {
      //     console.error(`[Network error]: ${networkError}`);
      //   }
      // });

      // // ✅ Apollo Client Yapılandırması
      // const apolloClient = new ApolloClient({
      //   link: errorLink.concat(authLink).concat(httpLink),
      //   cache: new InMemoryCache(),
      // });

      // export default apolloClient;
      import { ApolloClient, InMemoryCache } from '@apollo/client';
      import { setContext } from '@apollo/client/link/context';
      import { onError } from '@apollo/client/link/error';
      // ESM ile çalıştığı için böyle import edilir:
      import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

      // ✅ Apollo Client Upload Link (Dosya yükleme desteği)
      const uploadLink = createUploadLink({
        uri: import.meta.env.VITE_API_URL || 'http://localhost:3000/graphql',
        
      });

      // ✅ Auth Middleware - Token’ı Lazy Olarak Al
      const authLink = setContext(async (_, { headers }) => {
        const { store } = await import('@/app/store'); // Lazy import
        const state = store.getState() as any;

        const token = state.user.token;  // Artık TS hata vermez

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

      // ✅ Apollo Client Yapılandırması
      const apolloClient = new ApolloClient({
        link: errorLink.concat(authLink).concat(uploadLink), // uploadLink kullanıyoruz
        cache: new InMemoryCache(),
      });

      export default apolloClient;