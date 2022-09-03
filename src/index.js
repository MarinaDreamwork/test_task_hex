import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from './app/store/createStore';
import history from './app/utils/history';
import "bootstrap-icons/font/bootstrap-icons.css";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
