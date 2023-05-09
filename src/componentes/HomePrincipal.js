import React from 'react';
import VistaAdmi from '../vistas/VistaAdmi';
import JugadorVista from '../vistas/VistaJugador';
import VistaProfe from '../vistas/VistaProfe';
import '../MenuSide.css';



function HomePrincipal({usuario}) {
    
    sessionStorage.setItem("name", usuario.rol);
    console.log(usuario.rol);
      
    return (  
        <>
        <div >   
            {usuario.rol === "administrador" ? <VistaAdmi /> : usuario.rol === "alumno" ?  <JugadorVista/> : <VistaProfe /> }  
        </div>
        
        </>
    );
}
 
export default HomePrincipal;