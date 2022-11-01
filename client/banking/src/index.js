import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LoginContextProvider } from './Contexts/LoginContext';
// import { NotificationContextProvider } from './Contexts/NotificationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <NotificationContextProvider> */}
      <LoginContextProvider>
        <App />
      </LoginContextProvider>
    {/* </NotificationContextProvider> */}
  </React.StrictMode>
);


reportWebVitals();
