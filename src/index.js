import './index.css';
import App from './App';
import React from 'react';
import { store } from './user/store';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
reportWebVitals();
