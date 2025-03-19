import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd';

import App from './App';
import apolloClient from './graphql/apolloClient';
import { store, persistor } from './app/store';
import ApolloProviderWithAuth from './graphql/ApolloProviderWithAuth';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConfigProvider>
            <ApolloProviderWithAuth>
              <App /></ApolloProviderWithAuth>
          </ConfigProvider>
        </PersistGate>
      </ReduxProvider>
    </ApolloProvider>
  </React.StrictMode>
);
