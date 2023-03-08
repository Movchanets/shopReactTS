import React from 'react';

import './App.css';
import { Route, Routes } from 'react-router-dom';

import Shop from './components/Shop';
import DefaultLayout from './components/Containers/default';
import Login from './components/Login';
import CreateCategory from './components/Category/CategoryCreate';
import Register from './components/Register';
import NotFound from './components/NotFound';

import { Dashboard } from './components/Category/Dashboard';
import EditCategory from './components/Category/CategoryEdit';
import CreateProduct from './components/Products/ProductCreate';
import { ProductDashboard } from './components/Products/Dashboard';



function App() {
  return (

    <Routes>
      <Route path="/" element={<DefaultLayout />} >
        <Route index element={<Shop />} />
        <Route path='Login' element={<Login />} />
        <Route path='Register' element={<Register />} />
        <Route path='Category' element={<Dashboard />} />
        <Route path='Product' element={<ProductDashboard />} />
        <Route path='Category/Create' element={<CreateCategory />} />
        <Route path='Product/Create' element={<CreateProduct />} />
        <Route path='Category/Edit/:id' element={<EditCategory />} />

      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
