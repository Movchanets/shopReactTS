import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { store } from './store';
import { getToken } from './store/Action-Creators/Actions/accountActions';
import jwtDecode from 'jwt-decode';
import { AccountActionTypes, IUser } from './store/Types';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if (localStorage.token) {
  const token = localStorage.token;
  const user: IUser = jwtDecode(token) as IUser;
  store.dispatch({ type: AccountActionTypes.LOGIN_SUCCESS, user: user })
}

root.render(
  <Provider store={store}>
    <BrowserRouter>

      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
