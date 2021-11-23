import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editarDespachoAction } from '../actions/despachoActions';
import { useHistory } from 'react-router-dom';

const EditarDespacho = () => {

    const history = useHistory();

    // Dispatch para mandar a llamar al action
    const dispatch = useDispatch();

    const [ despacho, guardarDespacho ] = useState({
        nombre: '',
        precio: ''
    })

    // despacho a editar
    const despachoEditar = useSelector(state => state.despachos.despachoeditar);
    /* if(!despachoEditar) return null; */

    // Llenar el state automaticamente con el useEffect
    useEffect(() => {
        guardarDespacho(despachoEditar);
    }, [despachoEditar]);

    // Recordar nunca colocar un return antes de un useEffect
    if(!despachoEditar) return null;

    // Leer los datos del formulario
    const onChangeFormulario = e => {
        guardarDespacho({
            ...despacho,
            [e.target.name] : e.target.value
        })
    }

    const { nombre, precio } = despacho;

    const submitEditarDespacho = e => {
        e.preventDefault();

        dispatch( editarDespachoAction(despacho) );

        history.push('/');
    }





    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Despacho
                        </h2>

                        <form
                            onSubmit={submitEditarDespacho}
                        >
                            <div className="form-groud mt-3">
                                <label>Nombre Despacho</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onChangeFormulario}
                                />
                                
                            </div>

                            <div className="form-groud mt-3">
                                <label>Precio</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="precio"
                                    value={precio}
                                    onChange={onChangeFormulario} 
                                />
                                
                            </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary font-weight-bold text-uppercase d-block w-100 mt-4"
                                >Editar</button>

                        </form>

                        {/* { cargando ? <p>Cargando</p> : null }
                        { error ? <p className=" alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null} */}

                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default EditarDespacho;