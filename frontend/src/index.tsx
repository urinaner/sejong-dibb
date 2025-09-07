import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  if (process.env.REACT_APP_API_MOCKING !== 'enabled') {
    return;
  }

  const { worker } = await import('./mocks/browser');
  // 서비스 워커 시작 + 미핸들 요청 경고
  return worker.start({ onUnhandledRequest: 'warn' });
}

enableMocking().then(() => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
  );
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
