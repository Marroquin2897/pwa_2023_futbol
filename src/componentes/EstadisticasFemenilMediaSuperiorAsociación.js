import React from 'react';
import { useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { getFirestore,collection, getDocs,addDoc, setDoc,doc } from 'firebase/firestore';
import { firebaseApp } from '../firebase/firebaseConfig';

const EstadisticasFemenilMediaSuperiorAsociación = () => {
    const [estadisticasEquipos, setEstadisticasEquipos] = useState([]);
    const firestore = getFirestore(firebaseApp);

    
    return ( 
        <div>
            <nav>
            <img src="https://tinyurl.com/2b2ek3ck"/>
              <center><h2> Tabla General de Posiciones Fútbol Asociación Femenil Nivel Media Superior </h2><h2>{rolUsuario}</h2></center> 
            <h3><img src="https://tinyurl.com/233pns5r"/></h3>
            </nav>
            <Helmet>
                <title> Tabla General de Posiciones Fútbol Asociación Femenil Nivel Media Superior</title>
            </Helmet>
        </div>
     );
}
 
export default EstadisticasFemenilMediaSuperiorAsociación;