import React, { Fragment, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../actions/userActions'
import {Link } from "react-router-dom"


//import { useAlert } from 'react-alert'




export const UserList = () => {
    
    const { loading, usuarios} = useSelector(state=> state.users)
    //const alert= useAlert();
    
    const dispatch = useDispatch();
    useEffect(() => {
        // if (error){
        //     return alert.error(error)
        // }

        dispatch(getUsers()); //llamamos a la accion de userActions para obtener los usuarios de la base de datos y los guardamos en el state de redux users 
    }, [dispatch])


    const setUser = () => { //funcion para mostrar los usuarios 
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
                    label: 'Password',
                    field: 'password',
                    sort: 'asc'
                },
                {
                    label: 'Avatar',
                    field: 'avatar',
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
        usuarios.map(function(user) { //recorro todos los usuarios por cada usuario que encuentre voy a crear una fila
            data.rows.push({ //agrego una fila a la tabla con los datos del usuario que estoy recorriendo en ese momento
                name: user.name,
                email: user.email,
                password: user.password,
                avatar: user.avatar,
                role: user.role,
                actions: <Fragment> {/* fragment es un contenedor que no se muestra en el html */}
                    <Link to={`/usuarios/${user._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2">
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;

    }

    
        

  return (
    <Fragment>
            <MetaData title={'All Users'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar /> {/* sidebar requerido*/}
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Usuarios Registrados</h1>

                        {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> :(
                            <MDBDataTable //tabla de mdbreact para mostrar los productos
                                data={setUser()} //le paso la data que cree con la funcion setProducts
                                className="px-3"
                                bordered //borde de la tabla
                                striped //filas alternadas
                                hover   //efecto hover en las filas de la tabla 
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
  )
}

export default UserList