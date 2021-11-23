import React from 'react';
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2';

// Redux
import { useDispatch } from 'react-redux';
import { borrarDespachoAction, obtenerDespachoEditar } from '../actions/despachoActions';


const Despacho = ({despacho}) => {

    const { nombre, precio, id } = despacho;

    const dispatch = useDispatch();

    const history = useHistory();

    // Confirmar si desea eliminarlo
    const confirmarEliminarDespacho = id => {

        // preguntar al usuario
        Swal.fire({
            title: 'Estas seguro?',
            text: "Un despacho eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo!'
          }).then((result) => {
            if (result.isConfirmed) {
            // pasarlo al action
            dispatch( borrarDespachoAction(id));
            }
          })
    }

    // Funcion que redirige de forma programada
    const redireccionarEdicion = despacho => {
        dispatch( obtenerDespachoEditar(despacho));
        history.push(`/despachos/editar/${despacho.id}`)
    }

    return ( 
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">$ {precio}</span></td>
            <td>
                <button 
                    className=" btn btn-primary mr-2"
                    type="button"
                    onClick={ () => redireccionarEdicion(despacho)}
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={( ) => confirmarEliminarDespacho(id)}
                >Eliminar</button>
            </td>
        </tr>
     );
}
 
export default Despacho;