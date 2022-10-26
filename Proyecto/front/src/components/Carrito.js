import React, { Fragment } from 'react'

const Carrito = () => {

  const productosjson = [
    {
        "id": 1,
        "nombre": "Curso de React",
        "descripcion": "Curso de React",
        "precio": 150000,
        "image":"https://www.datocms-assets.com/45470/1631110818-logo-react-js.png"
    },
    {
        "id": 2,
        "nombre": "Curso de Angular",
        "descripcion": "Curso de Angular",
        "precio": 250000,
        "image":"https://mydigitalbo.com/cursos/uploads/curso_25_portada.jpg"
    }           
];

  return (
    <div>
    <Fragment>
    <h1>Carrito HU_011 Andres V</h1>
    <div class="container">
		<h1><i class="fa fa-shopping-cart" aria-hidden="true"></i>Carrito</h1>
		<hr/>
		<table class="table">
			<thead>
			  <tr>
				<th scope="col">#</th>
				<th scope="col">Item</th>
				<th scope="col">Descripcion</th>
				<th scope="col">Precio</th>
				<th scope="col">Cantidad</th>
        <th scope="col">Total</th>
			  </tr>
			</thead>
			<tbody id="items">
        {productosjson.map((producto) => (
          <tr> 
            <th scope="row">{producto.id}</th>
            <td>{producto.nombre}</td>
            <td>{producto.descripcion}</td>
            <td>{producto.precio}</td>
            <td><input type="number" min="1" max="10" value="1" class="form-control" /></td>
            <td>{producto.precio}</td>
          </tr>
        ))}
      </tbody>
			<tfoot>
			  <tr id="footer">
				<th scope="row" colspan="5">Soporte: admin@correo.com</th>
			  </tr>
			</tfoot>
		  </table>
		<div class="row" id="cards"></div>
	</div>

	<template id="template-footer">
        <th scope="row" colspan="2">Total productos</th>
        <td>10</td>
        <td>
            <button class="btn btn-danger btn-sm" id="vaciar-carrito">
                vaciar todo
            </button>
        </td>
        <td class="font-weight-bold">$ <span>5000</span></td>
    </template>
    
    <template id="template-carrito">
      <tr>
        <th scope="row">id</th>
        <td>Café</td>
        <td>1</td>
        <td>
            <button class="btn btn-info btn-sm">
                +
            </button>
            <button class="btn btn-danger btn-sm">
                -
            </button>
        </td>
        <td>$ <span>500</span></td>
      </tr>
    </template>


	<template id="template-card">
		<div class="col-12 mb-2 col-md-4">
		  <div class="card">
			<div class="card-body">
			  <h5>Titulo</h5>
			  <p>precio</p>
			  <button class="btn btn-dark">Comprar</button>
			</div>
		  </div>
		</div>
	  </template>
    </Fragment>
      

    </div>
  )
}

export default Carrito