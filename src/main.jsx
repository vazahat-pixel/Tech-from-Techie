import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initSmoothScroll, destroySmoothScroll } from './lib/smoothScroll';
import './index.css';

function Root() {
  useEffect(() => {
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
