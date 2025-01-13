import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import AppContent from './AppContent';
import { ModalProvider } from './components/Modal/context/ModalContext';
import { AuthProvider } from './context/AuthContext';
import { Providers as QueryProvider } from './lib/react-query/provider';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        오류가 발생했습니다
      </h2>
      <pre className="text-sm bg-gray-100 p-4 rounded-lg">{error.message}</pre>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => window.location.reload()}
      >
        새로고침
      </button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <BrowserRouter>
            <ModalProvider>
              <AuthProvider>
                <AppContent />
              </AuthProvider>
            </ModalProvider>
          </BrowserRouter>
        </ThemeProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
}

export default App;
