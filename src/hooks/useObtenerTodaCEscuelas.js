import  {useEffect,useState} from 'react';
import {firebaseApp} from '../firebase/firebaseConfig';

import {getFirestore,collection, onSnapshot, query, where, limit,startAfter} from "firebase/firestore"
import {useAuth} from './../contextos/AuthContext';

const useObtenerTodaCEscuelas = () => {
    const firestore = getFirestore(firebaseApp);
    const{usuario} = useAuth();
    const [escuelas, cambiarEscuelas] = useState([]);
    const[ultimoEscuela,cambiarUltimoEscuela] = useState(null)
    const[hayMasPorCargar,cambiarHayMasPorCargar] = useState(false);

    const obtenerMasEscuelas = () => { //Mostrar el resto de jugadores
        const consulta = query (
            collection(firestore,'escuelas'),
            limit(10),
            startAfter(ultimoEscuela)
        );
        onSnapshot(consulta,(snapshot) => {
            if(snapshot.docs.length > 0){
                cambiarUltimoEscuela(snapshot.docs[snapshot.docs.length -1]);

                cambiarEscuelas(escuelas.concat(snapshot.docs.map((escuela) => {
                    return{...escuela.data(), id: escuela.id}
                })))
            } else{
                cambiarHayMasPorCargar(false);
            }
        },error => {console.log(error)});
    }
    useEffect (() => {
        const consulta = query(
            collection(firestore,'escuelas'),
            limit(10)
        );

        const unsuscribe = onSnapshot(consulta,(snapshot) => {
            if(snapshot.docs.length > 0){
                cambiarUltimoEscuela(snapshot.docs[snapshot.docs.length-1]);
                cambiarHayMasPorCargar(true);
            } else{
                cambiarHayMasPorCargar(false);
            }
            cambiarEscuelas(snapshot.docs.map((escuela) => {
                return{...escuela.data(), id: escuela.id}
            }));
        });

        return unsuscribe;
    },[usuario])
    return [escuelas,obtenerMasEscuelas,hayMasPorCargar];
}
 
export default useObtenerTodaCEscuelas;