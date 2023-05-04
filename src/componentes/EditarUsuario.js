import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import RegistroUsuario from './RegistroUsuario';
import useObtenerUsuario from '../hooks/useObtenerUsuario';
import BtnRegresar from '../elementos/BtnRegresar';
import {ContenedorBotonCentral} from '../elementos/ElementosDeLista';

const EditarUsuario = () => {
   
    const{id} = useParams();
    const[usuario] = useObtenerUsuario(id);
    
    
    return (
        <>
        <Helmet>
            <title>Editar Usuario</title>
        </Helmet> 
        <RegistroUsuario usuario={usuario}/>
        <ContenedorBotonCentral>
            <BtnRegresar ruta={usuario.rol === "jugador" ? '/menu-profe' : '/rol'} />
        </ContenedorBotonCentral>        
        </>
     );
}
 
export default EditarUsuario;