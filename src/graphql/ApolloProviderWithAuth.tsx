// src/graphql/ApolloProviderWithAuth.tsx
import React, { ReactNode, useMemo } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';

// Bileşenin props'unu tanımlıyoruz
interface ApolloProviderWithAuthProps {
    children: ReactNode;
}

const httpLink = createHttpLink({
    uri: import.meta.env.VITE_API_URL || 'http://localhost:3000/graphql',
});

const ApolloProviderWithAuth: React.FC<ApolloProviderWithAuthProps> = ({ children }) => {
    // Redux store'dan token'ı alıyoruz
    const token = useSelector((state: RootState) => state?.user?.token);

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                Authorization: token ? `Bearer ${token}` : '',
            },
        };
    });

    const client = useMemo(() => {
        return new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache(),
        });
    }, [token, authLink]);

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWithAuth;
