import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Shop from './components/Shop';
import DefaultLayout from './components/Containers/default';
import Login from './components/Login';
import CreateCategory from './components/CreateCategory';
import Register from './components/Register';



function App() {
  return (

    <Routes>
      <Route path="/" element={<DefaultLayout />} >
        <Route index element={<Shop />} />
        <Route path='Login' element={<Login />} />
        <Route path='Register' element={<Register />} />
        <Route path='Category' element={<CreateCategory />} />

      </Route>
    </Routes>
  );
}

export default App;
