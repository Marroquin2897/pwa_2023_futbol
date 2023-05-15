import React from 'react';
import MenuJugador from '../componentes/MenuJugador';

const VistaJugador = () => {
    return ( 
        <div> 
            <MenuJugador/>
            <div className='hero'>
                <nav>
                    <h2 className='saludosMenu'>¡Hola Alumno!</h2>
                </nav>
            </div>         
        </div>
     );
}
 
export default VistaJugador;