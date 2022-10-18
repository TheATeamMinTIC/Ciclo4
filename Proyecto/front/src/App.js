
import React from 'react';
import Carrito from './components/Carrito';
import Productosadmin from './components/Productosadmin';
import Productoscliente from './components/Productoscliente';
import Ventasadmin from './components/Ventasadmin';
import Verproductos from './components/Verproductos';

function App() {
  return (
    <div className="App">
      <h1>Proyecto</h1>
      
      <Carrito/>
      <Productosadmin/>
      <Productoscliente/>
      <Ventasadmin />
      <Verproductos/>

    </div>
  );
}

export default App;
 