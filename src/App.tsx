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
import EditProduct from './components/Products/ProductEdit';
import ProductListPage from './components/Shop/Products/ProductListPage';
import Product from './components/Shop/Products';
import { useTypedSelector } from './hooks/useTypedSelector';



function App() {
  const { role } = useTypedSelector((store) => store.accountReducer);
  console.log(role);
  return (

    <Routes>
      <Route path="/" element={<DefaultLayout />} >
        {role === 'ADMIN' ?
          <>
            <Route path='Product' element={<ProductDashboard />} />
            <Route path='Product/Create' element={<CreateProduct />} />
            <Route path='Product/Edit/:id' element={<EditProduct />} />
            <Route path='Category' element={<Dashboard />} />
            <Route path='Category/Create' element={<CreateCategory />} />
            <Route path='Category/Edit/:id' element={<EditCategory />} />
          </>
          : null}
        <Route index element={<Shop />} />
        <Route path='Login' element={<Login />} />
        <Route path='Register' element={<Register />} />
        <Route path='Product/list' element={<ProductListPage />} />
        <Route path='Product/:id' element={<Product />} />


      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
