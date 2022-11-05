import React, { Fragment, useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact'
import Sidebar from './Sidebar'
import MetaData from '../layout/MetaData'

import {Link } from "react-router-dom"



export const UserList = () => {
    
    const [usuarios, setUsuarios] = useState([])

 //fetch get http://localhost:4000/api/usuarios
    useEffect(() => {
        fetch('http://localhost:4000/api/usuarios') //fetch es una funcion que recibe como parametro la url a la que quiero hacer la peticion
        .then(res => res.json()) //res es la respuesta que me da el servidor, res.json() es para convertir la respuesta en un json
        .then(data => setUsuarios(data)) //data es el json que me devuelve el servidor, setProducts es la funcion que me permite cambiar el estado de products
    }, [])

    setUsuarios = () => { //funcion para mostrar los productos en la tabla
        const data = { //data es un objeto
            columns: [ //se reemplaza luego por la data de la base de datos
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                
                {
                    label: 'Acciones',
                    field: 'actions',
                },
            ],
            rows: [] //tantas filas como productos haya en la base de datos
        }
        usuarios.forEach(usuario => { //recorro todos los productos por cada producto que encuentre voy a crear una fila
            data.rows.push({ //agrego una fila a la tabla con los datos del producto que estoy recorriendo en ese momento
                name: usuario.name,
                email: usuario.email,
                role: usuario.role,
                actions: <Fragment> {/* fragment es un contenedor que no se muestra en el html */}
                    <Link to={`/admin/product/${usuario._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-eye"></i>
                    </Link><Link to="/" className="btn btn-warning py-1 px-2">
                    <i class="fa fa-pencil"></i>
                    </Link>
                    
                    <Link to="/" className="btn btn-danger py-1 px-2">
                        <i className="fa fa-trash"></i>
                    </Link>

                </Fragment>
            })
        })

        return data; //devuelvo la data con los productos

        
    }

    


  return (
    <Fragment>
        <MetaData title={'All Products'} />
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>

            <div className="col-12 col-md-10">
                <Fragment>
                    <h1 className="my-5">All Products</h1>

                    <MDBDataTable
                        data={setUsuarios()}
                        className="px-3"
                        bordered
                        striped
                        hover
                    />
                </Fragment>
            </div>
        </div>
    </Fragment>

  )
}



export default UserList