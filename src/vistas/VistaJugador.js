import React from 'react';
import MenuJugador from '../componentes/MenuJugador';

const JugadorVista = () => {
    return ( 
        <div> 
            <MenuJugador/>
            <div className='hero'>
                <nav>
                    <h2 className='saludosMenu'>Hola, jugador</h2>
                </nav>
            </div>         
        </div>
     );
}
 
export default JugadorVista;