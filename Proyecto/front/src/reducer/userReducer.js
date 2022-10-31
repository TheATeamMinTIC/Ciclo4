import { ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants'; //importamos las constantes  

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
                count: action.payload.count
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