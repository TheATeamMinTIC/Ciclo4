import React, { Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    
    <Fragment>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">NOVA.com</Navbar.Brand> 
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">
            <Nav.Link href="/ventasadmin">Ventas</Nav.Link>
            <Nav.Link href="/productoscliente">Cliente</Nav.Link>
            <Nav.Link href="/productosadmin">Admin</Nav.Link> 
            <Nav.Link href="/carrito">Carrito</Nav.Link> 
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <nav className='navbar row'>
            <div className='col-12 col-md-3'>
                <div className='navbar-brand'>
                    <img src="./images/logo.png" alt="NOVA COURSES"></img>
                </div>
            </div>

            <div className='col-12 col-md-6 mt-2 mt-md-0'>
                <div className="input-group">
                    <input 
                        type="text"
                        id="search_field"
                        class="form-control"
                        placeholder='¿Que curso busca?'></input>
                        <div class="input-group-append">
                            <button id="search-btn" class="btn">
                                <i class="fa fa-search-plus fa-2x text-white" aria-hidden="true"></i>
                                
                                </button>    
                        </div>
                </div>
            </div>
            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                <span><button type="button" class="btn btn-warning">Iniciar sesión</button></span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <i class="fa fa-shopping-cart fa-2x text-white" aria-hidden="true"><Link to={`/carrito`} ></Link></i>   
                <span className="ml-1" id="cart_count">2</span>
            </div>

        </nav>

    </Fragment>
  )
}

export default Header