import axios from 'axios';

import { ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants'; //importamos las constantes  

// Get all products
export const getUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST }); //enviamos la peticion
        const { data } = await axios.get(`/api/usuarios`); //enviamos la peticion al backend

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get product details
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST }); //enviamos la peticion

        const { data } = await axios.get(`/api/usuario/${id}`); //enviamos la peticion al backend

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear errors
export const clearErrors = () => async (dispatch) => { //funcion asincrona que recibe dispatch como parametro
    dispatch({
        type: CLEAR_ERRORS
    })
}; //limpiar errores