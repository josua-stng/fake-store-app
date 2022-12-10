import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import Product from './components/Product';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/product/:productId' element={<ProductDetail/>}/>
   </Routes> 
  );
}

export default App;
