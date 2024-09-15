import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from "@react-oauth/google";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='1014327754286-emt2refui7rqci9tfrnc5ssi8id3m95a.apps.googleusercontent.com'>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// <React.StrictMode></React.StrictMode>
// React.StrictMode is a wrapper component provided by React 
// that helps you identify potential problems in your application.
// It doesn’t affect the actual rendering of your app, 
// but it does provide additional checks and warnings in development mode 
// to help you catch issues early. 
// For example, it can help find components with unsafe lifecycle methods.