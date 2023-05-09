import React from 'react';
import { Helmet } from 'react-helmet';
const EstadisticasFR = () => {
    const nameUsuario = sessionStorage.getItem("name")
    return (  
        <div className="hero">
            <nav>
            <img src="https://tinyurl.com/2b2ek3ck"/>
              <center><h2> Registro de Resultados </h2></center> 
              <div>
                <h3><img src="https://tinyurl.com/233pns5r"/></h3>
                <h2>{nameUsuario}</h2>
            </div>
            </nav>
            <Helmet>
                <title> Tabla General de Posiciones Fútbol Rápido </title>
            </Helmet>
        </div>
    );
}
 
export default EstadisticasFR;