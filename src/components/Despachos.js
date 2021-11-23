import React, { useEffect } from 'react';
import Despacho from './Despacho';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { obtenerDespachosAction } from '../actions/despachoActions'


const Despachos = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        // consultar la api
        const cargarDespachos = () => dispatch( obtenerDespachosAction());
        cargarDespachos();
        // eslint-disable-next-line
    }, [])

    // Obtener el state
    const despachos = useSelector(state => state.despachos.despachos);
    const error = useSelector(state => state.despachos.error);
    const loading = useSelector(state => state.despachos.loading)

    

    return ( 
    <>
        <h2 className="text-center my-5">Despachos Pendientes</h2>

        { error ? <p className="font-weight-bold alert-danger text-center mt-4">Hubo un error</p> : null}

        { loading ? <p className="text-center">Cargando...</p> : null}

        <table className="table table-striped">
            <thead className="bg-primary table-dark">
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                { despachos.lenght === 0 ? ' No hay despachos' : (
                    despachos.map( despacho => (
                        <Despacho
                            key={despacho.id}
                            despacho={despacho}
                        />
                    ))
                )}
                
            </tbody>

        </table>

    </>
     );
}
 
export default Despachos;