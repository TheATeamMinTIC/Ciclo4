import axios from 'axios';

import { ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants'; //importamos las constantes  

// Get all products
export const getUsers = (keyword = '', currentPage = 1, price, category, rating = 0) => async (dispatch) => { //dispatch es una funcion que me permite ejecutar una accion
    try { //intente hacer esto
        dispatch({ type: ALL_USERS_REQUEST }); //ejecutar la accion de tipo ALL_PRODUCTS_REQUEST

        const {data} = await axios.get('api/usuarios') //obtener los productos de la base de datos')

        dispatch({ //ejecutar la accion de tipo ALL_PRODUCTS_SUCCESS
            type: ALL_USERS_SUCCESS,
            payload: data //paquete de productos
        })

        
    }catch(error){
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message //mensaje de error
        }) //ejecutar la accion de tipo ALL_PRODUCTS_FAIL
    } //si algo sale mal haga esto 
}

// Clear errors
export const clearErrors = () => async (dispatch) => { //funcion asincrona que recibe dispatch como parametro
    dispatch({
        type: CLEAR_ERRORS
    })
}; //limpiar errores