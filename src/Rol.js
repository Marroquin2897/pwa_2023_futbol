import React, {useState,useEffect} from 'react';
import Login from './componentes/Login';
import HomePrincipal from './componentes/HomePrincipal';
import {firebaseApp} from './firebase/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {getFirestore,doc,getDoc} from "firebase/firestore"
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig"
import {ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ContenedorBotonCentrado, Boton } from './elementos/ElementosFormularioJuegos';

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

  const activarMensajes = async ()=>{
    const token = await getToken(messaging, {
        vapidKey: "BOzYf25OuRZEMHM1yjxf5q5Qu0yJTNFgvOXwjBOn4YzwRnENLuLjo-sDY6XUe68ocnp89CQ_m-kdRQhWy6cOQN4"
    }).catch(error => console.log("Tuviste un error al generar el token",error));

    if(token){
        console.log("tu token", token);
    }
    if(!token){
        console.log("No tienes token");
    }
  }

  React.useEffect(()=>{
    onMessage(messaging, message =>{
      console.log("tu mensaje: ", message);
      toast(message.notification.title);
      
    })
    activarMensajes()
  }, []);

  return ( 
    <>
    <ToastContainer/>
    {/* <ContenedorBotonCentrado>
      <Boton  onClick={activarMensajes}>Recibir notificaciones</Boton>
    </ContenedorBotonCentrado>*/}
    
    {usuario ? <HomePrincipal usuario = {usuario}/> : <Login/>}
    
     
    </>
   );
}
 
export default Rol;