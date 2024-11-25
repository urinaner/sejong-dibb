import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppContent from './AppContent';
import { ModalProvider } from './components/Modal/context/ModalContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
