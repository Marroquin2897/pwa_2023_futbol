import React, {useState,useEffect} from 'react';
import Login from './componentes/Login';
import HomePrincipal from './componentes/HomePrincipal';
import {firebaseApp} from './firebase/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {getFirestore,doc,getDoc} from "firebase/firestore"
import { ContenedorBotonCentrado, Boton } from './elementos/ElementosFormularioJuegos';
import { getMessaging } from 'firebase/messaging';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Rol = () => {
  
  let initialUserValue= sessionStorage.getItem("infoUser") ? JSON.parse( sessionStorage.getItem("infoUser")) : null;
  const [usuario, setUsuario] = useState (initialUserValue);

  async function getRol(uid){
   
    const docuRef = doc (firestore,`usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol; //para interpretar la informacion del usuario ya que viene cifrada

    return infoFinal;
  }
  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUsuario(userData);
    
    });
  }

  //saber si cambio de sesion
  onAuthStateChanged(auth,(usuarioFirebase) => {
    if (usuarioFirebase) {
      //funcion final 
        
      if (!usuario) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
    } else {
      setUsuario(null);
    }
  });

  
  return ( 
    <>
    
    {usuario ? <HomePrincipal usuario = {usuario}/> : <Login/>}
  
    </>
   );
}
 
export default Rol;