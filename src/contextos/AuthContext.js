import React, { useState, useContext, useEffect } from 'react';
import {getAuth, onAuthStateChanged, sendPasswordResetEmail} from 'firebase/auth';
import firebaseApp from "../firebase/firebaseConfig";

const AuthContext = React.createContext();
const auth = getAuth(firebaseApp);

//Hookd para acceder al contexto
const useAuth = () =>{
    return useContext(AuthContext);
}

//Estado global para verificar que el usuario este activo 
const AuthProvider = ({children}) => {
    const[usuario,cambiarUsuario] = useState();
  
    //State para saber cuando termina de cargar onAuthStateChanged
    const[cargando,cambiarCargando] = useState();
    //Comprobación de que el usuario ha iniciado sesion

    
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth,email);
      }
    
      function updatePassword(password) {
        return usuario.updatePassword(password)
      }
    //Efecto para que la comprobación se haga una vez
    useEffect(()=> {
       const cancelarSuscripcion = onAuthStateChanged(auth,(usuario) => {
            cambiarUsuario(usuario);
            cambiarCargando(false);
        });
        return cancelarSuscripcion
    },[]); 

    const value = {
        usuario,
        resetPassword,
        updatePassword
      }
    return (
        <AuthContext.Provider value={value}>
            {!cargando && children}
        </AuthContext.Provider>
    );
}

export {AuthProvider, AuthContext,useAuth} 