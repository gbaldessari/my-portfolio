import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

/**
 * Punto de entrada principal de la aplicación.
 * Renderiza el componente raíz `App` dentro del elemento con id `root`.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename='/my-portfolio'>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
