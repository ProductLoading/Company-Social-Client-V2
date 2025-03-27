// src/config/baseQueryApollo.ts
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import apolloClient from '../graphql/apolloClient';
import { DocumentNode } from 'graphql';

interface ApolloQueryArgs {
  document: DocumentNode;           // gql sorgusu/mutasyonu
  variables?: Record<string, any>;  // opsiyonel değişkenler
}

// “operationType” alabilmek için GraphQL AST’i inceleyebiliriz:
// Ayrıca “definitions[0].operation” = 'query' | 'mutation' gibi
export const baseQueryApollo: BaseQueryFn<ApolloQueryArgs, unknown, unknown> = async ({
  document,
  variables,
}) => {
  try {
    // Belki birden fazla definition olabilir, en basiti ilkini alıyoruz
    const [definition] = document.definitions;
    const operationType = (definition as any).operation as 'query' | 'mutation';

    if (operationType === 'mutation') {
      const result = await apolloClient.mutate({
        mutation: document,
        variables,
      });
      return { data: result.data };
    } else {
      const result = await apolloClient.query({
        query: document,
        variables,
        fetchPolicy: 'network-only', // isteğe bağlı
      });
      return { data: result.data };
    }
  } catch (error) {
    console.error('[baseQueryApollo] Error:', error);
    return { error };
  }
};
