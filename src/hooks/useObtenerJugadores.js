import  {useEffect,useState} from 'react';
import firebaseApp from '../firebase/firebaseConfig';
import {getFirestore,collection, onSnapshot, query, where, limit} from "firebase/firestore"
import {useAuth} from './../contextos/AuthContext';

const useObtenerJugadores = () => {
    const firestore = getFirestore(firebaseApp);
    const{usuario} = useAuth();
    const [jugadores, cambiarJugadores] = useState([]);
    const[ultimoJugador,cambiarUltimoJugador] = useState(null)
    const[hayMasPorCargar,cambiarHayMasPorCargar] = useState(false);

    useEffect (() => {
        const consulta = query(
            collection(firestore,'jugadores'),
            where('uidUsuario', '==', usuario.uid ),
            limit(15)
        );

        const unsuscribe = onSnapshot(consulta,(snapshot) => {
            if(snapshot.docs.length > 0){
                cambiarUltimoJugador(snapshot.docs[snapshot.docs.length-1]);
                cambiarHayMasPorCargar(true);
            } else{
                cambiarHayMasPorCargar(false);
            }
            cambiarJugadores(snapshot.docs.map((jugador) => {
                return{...jugador.data(), id: jugador.id}
            }));
        });

        return unsuscribe;
    },[usuario])

    return [jugadores,hayMasPorCargar];
}
 
export default useObtenerJugadores;