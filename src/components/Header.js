import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
            <div className="container">
                <h1>
                    <Link to={'/'} className="text-light">Despachos Homar</Link>
                </h1>
            </div>

            <Link to ={"/productos/nuevo"}
                className="btn btn-danger nuevo-post d-block d-md-inline-block"
            >Agregar Despacho &#43;</Link>


        </nav>
     );
}
 
export default Header;