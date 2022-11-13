
import './App.css';
import React from 'react';

import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Productosadmin from './components/Productosadmin';
//import Productoscliente from './components/Productoscliente';
import Ventasadmin from './components/Ventasadmin';
import Verproductos from './components/Verproductos';
import { ProductDetails } from './components/products/ProductDetails';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import {Dashboard} from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/newProduct';
import UserList from './components/admin/UserList';
import Cart from './components/cart/Cart';


function App() {
  return (
    <Router>
      <div className="App">
      
      <Header/>
      {/* Navegacion */}
      <Routes>
        <Route path="/" element={<Verproductos/>}/>
        
        <Route path="/productosadmin" element={<Productosadmin/>}/>
        <Route path="/productoscliente" element={<Verproductos/>}/>
        <Route path="/ventasadmin" element={<Ventasadmin/>}/> 
        <Route path="/producto/:id" element={<ProductDetails/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="/productList" element={<ProductList />}/>
        <Route path="/nuevoProducto" element={<NewProduct />}/>     
        <Route path="/userlist" element={<UserList />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="*" element={<h1>404: Not Found</h1>}/>
        
        
        
      </Routes>
      
      <Footer/>

    </div>

    </Router>
  );
}

export default App;
 