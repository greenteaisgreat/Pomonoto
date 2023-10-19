import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './components/App';
window.React = React;

const root = createRoot(document.querySelector('#root'));
root.render(
  <App />
);
