import React, { useEffect, useState } from 'react';

import './App.css';
import { Route, Routes } from 'react-router-dom';

import Shop from './components/Shop';
import DefaultLayout from './components/Containers/default';
import Login from './components/Login';


import NotFound from './components/NotFound';


import { ProductDashboard } from './components/admin/products/Dashboard';

import ProductListPage from './components/Shop/Products/ProductListPage';
import Product from './components/Shop/Products';
import { useTypedSelector } from './hooks/useTypedSelector';
import { Register } from './components/Register';
import CreateProduct from './components/admin/products/ProductCreate';
import EditProduct from './components/admin/products/ProductEdit';

import AdminLayout from './components/Containers/admin';
import CreateCategory from './components/admin/categories/CategoryCreate';
import EditCategory from './components/admin/categories/CategoryEdit';
import { Dashboard } from './components/admin/categories/Dashboard';


declare global {
  interface Window {
    google: any; // 👈️ turn off type checking
  }
}

function App() {

  return (

    <Routes>
      <Route path="/" element={<DefaultLayout />} >



        <Route index element={<Shop />} />
        <Route path='Login' element={<Login />} />
        <Route path='Register' element={<Register />} />
        <Route path='Product/list' element={<ProductListPage />} />
        <Route path='Product/:id' element={<Product />} />


      </Route>
      <Route path='/admin/' element={<AdminLayout />}>
        <Route index element={<Shop />} />
        <Route path='Product' element={<ProductDashboard />} />
        <Route path='Product/Create' element={<CreateProduct />} />
        <Route path='Product/Edit/:id' element={<EditProduct />} />
        <Route path='Category' element={<Dashboard />} />
        <Route path='Category/Create' element={<CreateCategory />} />
        <Route path='Category/Edit/:id' element={<EditCategory />} />
      </Route>
      <Route path="*" element={<NotFound />} />

    </Routes >
  );
}

export default App;
