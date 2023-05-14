import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import useObtenerEscuela  from '../hooks/useObtenerEscuela';
import RegistrarEscuela from './RegistrarEscuela';
import BtnRegresar from '../elementos/BtnRegresar';

const EditarEscuela = () => {
    const {id} = useParams();
    console.log(id);
    const[escuela] = useObtenerEscuela(id);
    return (
        <>
        <Helmet>
            <title>Editar Escuela</title>
        </Helmet>
        <RegistrarEscuela escuela={escuela}/>
        </>
     );
}
 
export default EditarEscuela;