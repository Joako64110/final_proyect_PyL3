import React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';  // Asegúrate de usar 'react-dom/client'
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
