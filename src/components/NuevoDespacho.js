import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



// Actions de Redux
import { crearNuevoDespachoAction } from '../actions/despachoActions';
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions';

const NuevoDespacho = ({history}) => {

    // State del componente
    const [ nombre, guardarNombre ] = useState('');
    const [ precio, guardarPrecio ] = useState('');

    // Utilizar use dispatch y te crea una función
    const dispatch = useDispatch();

    // Acceder al state del store
    const cargando = useSelector( state => state.despachos.loading );
    const error = useSelector( state => state.despachos.error );
    const alerta = useSelector( state => state.alerta.alerta);


    // Manda a llamar el action de despachoAction
    const agregarDespacho = despacho => dispatch(crearNuevoDespachoAction(despacho));

    // Cuando el usuario haga submit
    const submitNuevoDespacho = e => {
        e.preventDefault();

        //Validar Formulario
        if(nombre.trim() === '' || precio <= 0 ) {

            const alerta = {
                msg: 'Todos los campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }

            dispatch(mostrarAlerta(alerta));
            return;
        }


        // Si no hay errores
        dispatch( ocultarAlertaAction() );

        // Crear el nuevo despacho
        agregarDespacho({
            nombre,
            precio
        });

        // Redireccionar
        history.push('/');
    }


    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Despacho
                        </h2>

                        {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null }

                        <form
                            onSubmit={submitNuevoDespacho}
                        >
                            <div className="form-groud mt-3">
                                <label>Nombre Despacho</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Despacho"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
                                />
                                
                            </div>

                            <div className="form-groud mt-3">
                                <label>Precio</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio"
                                    name="precio"
                                    value={precio}
                                    onChange={e => guardarPrecio(Number(e.target.value))}
                                />
                                
                            </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary font-weight-bold text-uppercase d-block w-100 mt-4"
                                >Agregar</button>

                        </form>

                        { cargando ? <p>Cargando</p> : null }
                        { error ? <p className=" alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}

                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoDespacho;