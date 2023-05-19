import React from 'react';
import VistaAdmi from '../vistas/VistaAdmi';
import VistaJugador from '../vistas/VistaJugador';
import VistaProfe from '../vistas/VistaProfe';
import '../MenuSide.css';




function HomePrincipal({usuario}) {
    
    sessionStorage.setItem("rolUsuario", usuario.rol);
    let infoUser={
        uid: usuario.id,
        email: usuario.correo,
        rol: usuario.rol,
    }
    sessionStorage.setItem("infoUser",JSON.stringify(infoUser))
      
    return (  
        <>
        <div >   
            {usuario.rol === "administrador" ? <VistaAdmi /> : usuario.rol === "alumno" ?  <VistaJugador/> : <VistaProfe /> }  
        </div>
        
        </>
    );
}
 
export default HomePrincipal;