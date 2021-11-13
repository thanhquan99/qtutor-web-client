import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from './contexts/UserContext';
const user = {};

ReactDOM.render(
  <UserProvider value={user}>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </UserProvider>,
  document.getElementById("root")
);

