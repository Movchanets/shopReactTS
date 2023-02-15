import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/Outlet';
import Shop from './components/Shop';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} >
        <Route index element={<Shop />} />

      </Route>
    </Routes>
  );
}

export default App;
