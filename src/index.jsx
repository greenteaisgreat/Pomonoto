import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './components/App';
import css from './style.css';
//allows you to render the initial view (possibly a webpack issue?)
window.React = React;

const root = createRoot(document.querySelector('#root'));
root.render(
  <App />
);

