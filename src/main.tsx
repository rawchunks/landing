import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import { Brand } from './pages/brand';

const isBrandPage = window.location.pathname.replace(/\/+$/, '') === '/brand';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isBrandPage ? <Brand /> : <App />}
  </React.StrictMode>
);
