
import './App.css';
import React from 'react';
import Carrito from './components/Carrito';
import Footer from './components/Footer';
import Header from './components/Header';
import Productosadmin from './components/Productosadmin';
import Productoscliente from './components/Productoscliente';
import Ventasadmin from './components/Ventasadmin';
import Verproductos from './components/Verproductos';

function App() {
  return (
    <div className="App">
      
      <Header/>
      <Carrito/>
      <Productosadmin/>
      <Productoscliente/>
      <Ventasadmin />
      <Verproductos/>
      <Footer/>

    </div>
  );
}

export default App;
 