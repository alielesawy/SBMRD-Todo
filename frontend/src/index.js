import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App';

const history = createBrowserHistory();
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <App />
  </BrowserRouter>
);