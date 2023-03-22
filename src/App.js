import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
// import Product from './components/Product';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/product/:productId' element={<ProductDetail/>}/>
    <Route path='/cart' element={<Cart/>}/>
   </Routes> 
  );
}

export default App;
