






import React from 'react';
import './App.css';
import Header from './Header/header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Favorites from './Header/favorites';
import Cart from './Header/cart';
import Homepage from './Pages/Homepage';
import Login from './Header/login';
import Register from './Header/register';
import Dell from './Pages/Labtops/dell';
import Dellitem from './Pages/Labtops/dell-item';
import Alert from './Header/alert';


function App() {
  return (
       <BrowserRouter>
         <Header/>
       <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dell'  element={<Dell/>}/>
          <Route path='/dell-item' element={<Dellitem/>}/>
          <Route path="*" element={<h2>not found</h2>} />
          <Route path='/alert' element={<Alert/>} />
       </Routes>
       
       </BrowserRouter>
  );
}

export default App;
