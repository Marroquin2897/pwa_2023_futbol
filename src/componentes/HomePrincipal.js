import React from 'react';
import VistaAdmi from '../vistas/VistaAdmi';
import VistaJugador from '../vistas/VistaJugador';
import VistaProfe from '../vistas/VistaProfe';
import '../MenuSide.css';




function HomePrincipal({usuario}) {
    
    sessionStorage.setItem("name", usuario.rol);
    let infoUser={
        uid: usuario.id,
        email: usuario.correo,
        rol: usuario.rol,
    }
    sessionStorage.setItem("infoUser",JSON.stringify(infoUser))
      
    return (  
        <>
        <div >   
            {usuario.rol === "Administrador" ? <VistaAdmi /> : usuario.rol === "Alumno" ?  <VistaJugador/> : <VistaProfe /> }  
        </div>
        
        </>
    );
}
 
export default HomePrincipal;