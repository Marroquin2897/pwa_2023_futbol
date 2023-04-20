import React, {useState} from 'react';
import MenuAdmin from '../componentes/MenuAdmin';
import {firebaseApp} from '../firebase/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {getFirestore,doc,getDoc} from "firebase/firestore"

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);


const VistaAdmi = () => {
    const [usuario, setUsuario] = useState (null);
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


