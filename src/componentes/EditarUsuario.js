import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import RegistroUsuario from './RegistroUsuario';
import useObtenerUsuario from '../hooks/useObtenerUsuario';
import BtnRegresar from '../elementos/BtnRegresar';

const EditarUsuario = () => {
    const{id} = useParams();
    const[usuario] = useObtenerUsuario(id);
    console.log({usuario})
    return (
        <>
        <Helmet>
            <title>Editar Usuario</title>
        </Helmet>
        <h1> EDITAR Usuario </h1>
        <RegistroUsuario usuario={usuario}/>
        </>
     );
}
 
export default EditarUsuario;