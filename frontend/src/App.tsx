import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import AppContent from './AppContent';
import { ModalProvider } from './components/Modal/context/ModalContext';
import { AuthProvider } from './context/AuthContext';
import { Providers as QueryProvider } from './lib/react-query/provider';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './styles/ErrorFallback';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import muiTheme from './theme/muiTheme';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryProvider>
        <ThemeProvider theme={theme}>
          <MuiThemeProvider theme={muiTheme}>
            <GlobalStyle />
            <BrowserRouter>
              <ModalProvider>
                <AuthProvider>
                  <AppContent />
                </AuthProvider>
              </ModalProvider>
            </BrowserRouter>
          </MuiThemeProvider>
        </ThemeProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
}

export default App;
