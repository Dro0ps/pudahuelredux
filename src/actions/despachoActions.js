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
    COMENZAR_EDICION_DESPACHO,
    DESPACHO_EDITADO_EXITO,
    DESPACHO_EDITADO_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// Crear nuevos despachos
export function crearNuevoDespachoAction(despacho){
    return async (dispatch) => {
        dispatch( agregarDespacho() );

        try {
            // insertar en la API
            await clienteAxios.post('/despachos', despacho);

            // Si todo sale bien, actualizar el state
            dispatch( agregarDespachoExito(despacho));

            // Alerta
            Swal.fire(
                'Correcto',
                'El despacho se agrego correctamente',
                'success'
            )

        } catch (error) {
            console.log(error);
            // Si hay un error cambiar el state
            dispatch( agregarDespachoError(true));


            Swal.fire(
                'Error',
                'Intenta de nuevo, si el error persiste consulte al administrador',
                'error'
            )
        }

    }
}

const agregarDespacho = ()=> ({
    type: AGREGAR_DESPACHO,
    payload: true
});

const agregarDespachoExito = despacho => ({
    type: AGREGAR_DESPACHO_EXITO,
    payload: despacho
});

const agregarDespachoError = estado => ({
    type: AGREGAR_DESPACHO_ERROR,
    payload: estado
});


// Funcion que descarga los despachos de la base de datos
export function obtenerDespachosAction(){
    return async (dispatch) => {
        dispatch(descargarDespachos() );

        try {
            const respuesta = await clienteAxios.get('/despachos');
            dispatch( descargarDespachosExitosa( respuesta.data ));
        } catch (error) {
            console.log(error);
            dispatch( descargarDespachosError(true) );
        }
    }
}

const descargarDespachos = () => ({
    type: COMENZAR_DESCARGA_DESPACHOS,
    payload: true
});

const descargarDespachosExitosa = despachos =>( {
    type: DESCARGA_DESPACHOS_EXITO,
    payload: despachos
});

// si hubo un error
const descargarDespachosError = estado => ({
    type: DESCARGA_DESPACHOS_ERROR,
    payload: estado
});


// Selecciona y elimina el despacho
export function borrarDespachoAction(id){
    return async (dispatch) => {
        dispatch(obtenerDespachoEliminar(id));

        try {
            await clienteAxios.delete(`/despachos/${id}`);
            dispatch( eliminarDespachoExito() );
            Swal.fire(
                'Eliminado!',
                'El despacho se ha eliminado con correctamente',
                'success'
              )
        } catch (error) {
            console.log(error);
            dispatch( eliminarDespachoError() );
            
        }
        
    }
}

const obtenerDespachoEliminar = id => ({
    type: OBTENER_DESPACHO_ELIMINAR,
    payload: id
});

const eliminarDespachoExito = () => ({
    type: DESPACHO_ELIMINADO_EXITO
});

const eliminarDespachoError = () => ({
    type: DESPACHO_ELIMINADO_ERROR,
    payload: true
});

// Colocar despacho en Edición
export function obtenerDespachoEditar(despacho) {
    return (dispatch) => {
        dispatch( obtenerDespachoEditarAction(despacho))
    }
}

const obtenerDespachoEditarAction = despacho => ({
    type: OBTENER_DESPACHO_EDITAR,
    payload: despacho
})

// Edita un registro en la api y state
export function editarDespachoAction(despacho) {
    return async (dispatch) => {
        dispatch( editarDespacho())
        try {
            await clienteAxios.put(`/despachos/${despacho.id}`, despacho);
            dispatch( editarDespachoExito(despacho));
        } catch (error) {
            dispatch( editarDespachoError());
        }
    }
}

const editarDespacho = () => ({
    type: COMENZAR_EDICION_DESPACHO
})

const editarDespachoExito = despacho => ({
    type: DESPACHO_EDITADO_EXITO,
    payload: despacho
})
const editarDespachoError = despacho => ({
    type: DESPACHO_EDITADO_ERROR,
    payload: true
})

