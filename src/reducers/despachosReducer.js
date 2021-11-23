import {
    AGREGAR_DESPACHO,
    AGREGAR_DESPACHO_EXITO,
    AGREGAR_DESPACHO_ERROR,
    COMENZAR_DESCARGA_DESPACHOS,
    DESCARGA_DESPACHOS_EXITO,
    DESCARGA_DESPACHOS_ERROR,
    OBTENER_DESPACHO_ELIMINAR,
    DESPACHO_ELIMINADO_EXITO,
    DESPACHO_ELIMINADO_ERROR,
    OBTENER_DESPACHO_EDITAR,
    DESPACHO_EDITADO_EXITO,
    DESPACHO_EDITADO_ERROR
    
} from '../types';

// Cada reducer tiene su propio state

const initialState = {
    despachos: [], 
    error: null,
    loading: false,
    despachoeliminar: null,
    despachoeditar: null
}
// eslint-disable-next-line
export default function(state = initialState, action) {
    switch(action.type) {
        case COMENZAR_DESCARGA_DESPACHOS:
        case AGREGAR_DESPACHO:
            return{
                ...state,
                loading: action.payload
            }
        case AGREGAR_DESPACHO_EXITO:
            return{
                ...state,
                loading: false,
                despachos:[...state.despachos, action.payload]
            }
        case DESPACHO_EDITADO_ERROR:    
        case DESPACHO_ELIMINADO_ERROR:
        case DESCARGA_DESPACHOS_ERROR:
        case AGREGAR_DESPACHO_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case DESCARGA_DESPACHOS_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                despachos: action.payload
            }
        case OBTENER_DESPACHO_ELIMINAR:
            return{
                ...state,
                despachoeliminar: action.payload
            }
        case DESPACHO_ELIMINADO_EXITO:
            return{
                ...state,
                despachos: state.despachos.filter( despacho => despacho.id !== state.despachoeliminar ),
                despachoeliminar: null
            }
        case OBTENER_DESPACHO_EDITAR:
            return{
                ...state,
                despachoeditar: action.payload
            }
        case DESPACHO_EDITADO_EXITO:
            return{
                ...state,
                despachoeditar: null,
                despachos: state.despachos.map( despacho => 
                    despacho.id === action.payload.id ? despacho = action.payload : despacho     
                )
            }

        default:
            return state;
    }
}