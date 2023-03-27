import React from 'react';
import { Helmet } from 'react-helmet';
import useObtenerJugadores from '../hooks/useObtenerJugadores';

const ListaJugadores = () => {
    const jugadores = useObtenerJugadores();
    
    return ( 
        <>
        <Helmet>
            <title>Lista de Jugadores</title>
        </Helmet>
        <h1> Lista de Jugadores </h1>
        </>
     );
}
 
export default ListaJugadores;