import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import AppContent from './AppContent';
import { ModalProvider } from './components/Modal/context/ModalContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
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
  );
}

export default App;
