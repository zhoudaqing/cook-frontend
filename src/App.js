import './App.css';
import { Suspense } from 'react';
import Routes from "./routes/Routes";
import ErrorBoundary from './components/ErrorBoundary';

import { ApolloProvider } from '@apollo/client';
import {client} from './pages/Transactions/index'

const Loader = () => (
  <div style={{ textAlign: "center" }}>
    <div>loading...</div>
  </div>
);

function App() {
  return (
    <ApolloProvider client={client}>
    <Suspense fallback={<Loader />}>
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
    </Suspense>
    </ApolloProvider>
  );
}

export default App;
