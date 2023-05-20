import React from 'react';
import { useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { getFirestore, collection, addDoc,where,updateDoc,getDocs,doc,query,setDoc} from 'firebase/firestore';
import { firebaseApp } from '../firebase/firebaseConfig';
const RegistrarResultadosFemenilSuperiorFut7 = () => {
    return (
        <div>
            <nav>
            <img src="https://tinyurl.com/2b2ek3ck"/>
              <center><h2> Registro de Resultados Fútbol 7 Femenil Nivel Superior</h2></center> 
              <h3><img src="https://tinyurl.com/233pns5r"/></h3>
            </nav>
            <Helmet>
                <title> Registro de Resultados Fútbol 7 Femenil Nivel Superior </title>
            </Helmet>
        </div>
      );
}
 
export default RegistrarResultadosFemenilSuperiorFut7;