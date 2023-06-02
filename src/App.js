import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CartItem from './components/CartItem';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Product from './components/Product';
import Sidebar from './components/Sidebar';

const App = () => {
  return <div className='overflow-hidden'>
    <Router>
      <Header/>
      <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path='/product/:id' element={<ProductDetails />}/>
      </Routes>
      <Sidebar/>
      <Footer/>
    </Router>
  </div>;
};

export default App;
