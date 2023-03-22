import React from 'react';
import firebaseApp from '../firebase/firebaseConfig';
import { getAuth,signOut } from 'firebase/auth';
import VistaAdmi from '../vistas/VistaAdmi';
import JugadorVista from '../vistas/VistaJugador';
import VistaProfe from '../vistas/VistaProfe';



const auth=getAuth(firebaseApp);

function HomePrincipal({usuario}) {
    return (  
        <>
        <p> HOME </p>
        <div className='btnContainer'>
          <button onClick={()=>signOut(auth)}> Cerrar sesion</button>
            
            {usuario.rol === "administrador" ? <VistaAdmi /> : usuario.rol === "jugador" ?  <JugadorVista /> : <VistaProfe/> }  
        </div>
        
        </>
    );
}
 
export default HomePrincipal;