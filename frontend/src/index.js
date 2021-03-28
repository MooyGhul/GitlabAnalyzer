import React from 'react';
import ReactDOM from 'react-dom';
import NewApp from './NewApp';
import App from './App';
import NavbarSide from './NavbarSide';
import reportWebVitals from './reportWebVitals';
import Login from './components/Login';
import UrlToken from './components/UrlToken';
import SideBar from './SideBar';
import App1 from './App1';

ReactDOM.render(
  <React.StrictMode>
    <NavbarSide />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
