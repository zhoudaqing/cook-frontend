import './App.css';
import { Suspense } from 'react';
import Routes from "./routes/Routes";
import ErrorBoundary from './components/ErrorBoundary';

const Loader = () => (
  <div style={{ textAlign: "center" }}>
    <div>loading...</div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
