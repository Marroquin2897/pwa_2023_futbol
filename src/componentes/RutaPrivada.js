import React from 'react';
import { useAuth } from '../contextos/AuthContext';
import {Navigate} from 'react-router-dom';

const RutaProtegida = ({children}) => {
    //Saber si el usuario a iniciado sesión
    const {usuario} = useAuth();
    
    if(usuario){
        return children;
    } else{
        return <Navigate replace to="/iniciar-sesion"/>
    }

}
 
export default RutaProtegida;