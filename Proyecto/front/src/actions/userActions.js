import axios from 'axios';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    REGISTER_USER_FAIL
} from "../constants/userConstants" //importamos las constantes  

//Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })//solicitando esta acción para que se loguee el usuario

        const config={
            headers: { //reviso el header que es a donde me llega la cookie 
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/login', {email, password}, config) //de tipo get y según la ruta del back 
        //le paso el email y el password a la ruta del back
        dispatch({
            type:LOGIN_SUCCESS, //si lo logro
            payload: data.user //trae la data del usuario
        })
    }
    catch (error) {  //si no lo logro le paso el login fail
        dispatch({
            type:LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

//REGISTRAR USUARIO
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })

        const config={
            headers: {
                'Content-Type': 'multipart/form-data' //multipart/form-data es para enviar archivos
            }
        }
        const {data} = await axios.post('/api/usuario/registro', userData, config)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })
    }
    catch (error) { 
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get all products
export const getUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST }); //enviamos la peticion
        
        const { data } = await axios.get('/api/usuarios'); //enviamos la peticion al backend

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