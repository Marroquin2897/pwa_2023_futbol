import React from 'react';
import MenuAdmin from '../componentes/MenuAdmin';

const VistaAdmi = () => {
    return ( 
        <div> 
            <MenuAdmin/>
            <div className='hero'>
                <nav>
                    <h2 className='saludosMenu'>¡Hola administrador!</h2>
                </nav>
            </div>  
        </div>
     );
}
 


export default VistaAdmi;