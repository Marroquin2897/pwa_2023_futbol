import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import RegistrarJugador from './RegistrarJugador';
import useObtenerJugador from './../hooks/useObtenerJugador';

const EditarJugadores = () => {
    const {id} = useParams();
    const[jugador] = useObtenerJugador(id);
    return (
        <>
        <Helmet>
            <title>Editar Jugador</title>
        </Helmet>
        <h1> EDITAR JUGADOR </h1>
        <RegistrarJugador jugador={jugador}/>
        </>
     );
}
 
export default EditarJugadores;