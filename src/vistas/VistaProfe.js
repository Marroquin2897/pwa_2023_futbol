import React from 'react';
import MenuProfesor from '../componentes/MenuProfesor';

const VistaProfe = () => {
    return ( 
        <div>
            <MenuProfesor/>
            <div className='hero'>
                <nav>
                    <h2 className='saludosMenu'>¡Hola Profesor!</h2>
                </nav>
            </div>
            
        </div>
        
     );
}
 


export default VistaProfe;