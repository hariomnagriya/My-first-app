import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
//import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
//import Home from './components/Home/home'
//import Login from './components/Login/login'
//import "./App.css";
// import LogIn from './LogIn';

import * as serviceWorker from './serviceWorker';
//import {ToastContainer} from 'react-toastify';
//import { ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.min.css'; 


   
  ReactDOM.render(
    <App/>,
    document.getElementById('root')
  );
   
//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
