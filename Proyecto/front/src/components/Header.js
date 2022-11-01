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
            <Nav.Link href="/cart">Carrito</Nav.Link> 
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <nav className='navbar row'>
            <div className='col-12 col-md-3'>
                <div className='navbar-brand'>
                <Link to="/" ><img  className='logo' src="./nova.png" alt="NOVA COURSES"></img></Link>
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
            <div className="ml-4 dropdown d-inline">
                        <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button"
                        id="dropDownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span>Panel de Control</span></Link>
                            <div className='dropdown-menu' aria-labelledby='dropDownMenu'>
                                <Link className="dropdown-item" to="/admin/dashboard">Adm. Productos</Link>
                                <Link className="dropdown-item" to="/">Pedidos</Link>
                                <Link className="dropdown-item" to="/">Mi cuenta</Link>
                                <Link className="dropdown-item" to="/">Cerrar Sesion</Link>
                            </div>
                    </div>
                    <Link to="/cart"><i class="fa fa-shopping-cart fa-2x text-white" aria-hidden="false"></i>
                        <span className="ml-1" id="cart_count">2</span></Link>
            </div>

        </nav>

    </Fragment>
  )
}

export default Header