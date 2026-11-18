import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import './styles.css';

const root = document.getElementById('root')!;

// Hydrate only when the prerendered HTML belongs to this URL (hosts may serve a fallback page).
function sameRoute() {
  const r = (window as unknown as { __ROUTE__?: string }).__ROUTE__;
  const norm = (p: string) => (p.endsWith('/') ? p : p + '/');
  return !!r && norm(r) === norm(decodeURI(location.pathname));
}

if (import.meta.env.VITE_HASH_ROUTER) {
  // Single-file preview build (no server routing available)
  createRoot(root).render(
    <StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </StrictMode>,
  );
} else if (root.hasChildNodes() && sameRoute()) {
  hydrateRoot(
    root,
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
} else {
  root.innerHTML = '';
  createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
}
