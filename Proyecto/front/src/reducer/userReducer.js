import { ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants';//importamos las constantes  

export const usersReducer = (state ={ users: []}, action)=>{
    switch(action.type){
        case ALL_USERS_REQUEST:
            return{
                loading:true,
                usuarios:[]
            }

        case ALL_USERS_SUCCESS:
            return{
                loading:false,
                usuarios: action.payload.usuarios,
                count: action.payload.cantidad
            }

        case ALL_USERS_FAIL:
            return{
                loading:false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        

        default:
            return state;
    }
}

//reducer para obtener los detalles de un usuario
export const userDetailsReducer = (state ={ user: {}}, action)=>{
    switch(action.type){
        case USER_DETAILS_REQUEST:
            return{
                ...state,
                loading:true
            }

        case USER_DETAILS_SUCCESS:
            return{
                loading:false,
                user: action.payload
            }

        case USER_DETAILS_FAIL:
            return{
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        

        default:
            return state;
    }
}