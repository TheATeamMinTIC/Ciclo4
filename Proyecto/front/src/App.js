
import './App.css';
import React from 'react';
import Carrito from './components/Carrito';
import Footer from './components/Footer';
import Header from './components/Header';
import Productosadmin from './components/Productosadmin';
//import Productoscliente from './components/Productoscliente';
import Ventasadmin from './components/Ventasadmin';
import Verproductos from './components/Verproductos';
import { ProductDetails } from './components/products/ProductDetails';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
      
      <Header/>
      {/* Navegacion */}
      <Routes>
        <Route path="/" element={<Verproductos/>}/>
        <Route path="/carrito" element={<Carrito/>}/>
        <Route path="/productosadmin" element={<Productosadmin/>}/>
        <Route path="/productoscliente" element={<Verproductos/>}/>
        <Route path="/ventasadmin" element={<Ventasadmin/>}/> 
        <Route path="/producto/:id" element={<ProductDetails/>}/>
        
        
        
        
      </Routes>
      
      <Footer/>

    </div>

    </Router>
  );
}

export default App;
 