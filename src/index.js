import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
// Set the configuration for your app
// TODO: Replace with your project's config object
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBDdUJPdBT0s0TqZpgQzDqkzLIBXDHn3Hs",
    authDomain: "react-queue-d3e89.firebaseapp.com",
    projectId: "react-queue-d3e89",
    storageBucket: "react-queue-d3e89.appspot.com",
    messagingSenderId: "135870202303",
    appId: "1:135870202303:web:29acf5ceb056835109610a",
    measurementId: "G-96RND75CS1"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
