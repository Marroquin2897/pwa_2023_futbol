import  {useEffect,useState} from 'react';
import {firebaseApp} from '../firebase/firebaseConfig';
import {getFirestore,collection, onSnapshot, query, where, limit,startAfter} from "firebase/firestore"
import {useAuth} from './../contextos/AuthContext';

const useObtenerTorneos = () => {
    const firestore = getFirestore(firebaseApp);
    const{usuario} = useAuth();
    const [torneos, cambiarTorneos] = useState([]);
    const[ultimoTorneo,cambiarUltimoTorneo] = useState(null)
    const[hayMasPorCargar,cambiarHayMasPorCargar] = useState(false);

    const obtenerMasTorneos = () => { //Mostrar el resto de jugadores
        const consulta = query (
            collection(firestore,'torneos'),
            where('uidUsuario','==',usuario.uid),
            limit(10),
            startAfter(ultimoTorneo)
        );
        onSnapshot(consulta,(snapshot) => {
            if(snapshot.docs.length > 0){
                cambiarUltimoTorneo(snapshot.docs[snapshot.docs.length -1]);

                cambiarTorneos(torneos.concat(snapshot.docs.map((torneo) => {
                    return{...torneo.data(), id: torneo.id}
                })))
            } else{
                cambiarHayMasPorCargar(false);
            }
        },error => {console.log(error)});
    }

    useEffect (() => {
        const consulta = query(
            collection(firestore,'torneos'),
            where('uidUsuario', '==', usuario.uid ),
            limit(10)
        );

        const unsuscribe = onSnapshot(consulta,(snapshot) => {
            if(snapshot.docs.length > 0){
                cambiarUltimoTorneo(snapshot.docs[snapshot.docs.length-1]);
                cambiarHayMasPorCargar(true);
            } else{
                cambiarHayMasPorCargar(false);
            }
            cambiarTorneos(snapshot.docs.map((torneo) => {
                return{...torneo.data(), id: torneo.id}
            }));
        });

        return unsuscribe;
    },[usuario])
    return [torneos,obtenerMasTorneos,hayMasPorCargar];

}
 
export default useObtenerTorneos;