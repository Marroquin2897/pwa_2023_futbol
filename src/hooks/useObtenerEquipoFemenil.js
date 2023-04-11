import  {useEffect,useState} from 'react';
import {firebaseApp} from '../firebase/firebaseConfig';
import {useAuth} from './../contextos/AuthContext';
import {getFirestore,collection, onSnapshot, query, where, limit,startAfter} from "firebase/firestore"

const useObtenerEquipoFemenil = () => {
    const firestore = getFirestore(firebaseApp);
    const{usuario} = useAuth();
    const [femenil, cambiarFemenil] = useState([]);
    const[ultimoFemenil,cambiarUltimoFemenil] = useState(null)
    const[hayMasPorCargar,cambiarHayMasPorCargar] = useState(false);

    const obtenerMasFemenil = () => { //Mostrar el resto de jugadores
        const consulta = query (
            collection(firestore,'jugadores'),
            where('uidUsuario','==',usuario.uid),
            where('sexoJugador','==','Femenino'),
            limit(10),
            startAfter(ultimoFemenil)
        );
        onSnapshot(consulta,(snapshot) => {
            if(snapshot.docs.length > 0){
                cambiarUltimoFemenil(snapshot.docs[snapshot.docs.length -1]);

                cambiarFemenil(femenil.concat(snapshot.docs.map((jugador) => {
                    return{...jugador.data(), id: jugador.id}
                })))
            } else{
                cambiarHayMasPorCargar(false);
            }
        },error => {console.log(error)});
    }
    useEffect (() => {
        const consulta = query(
            collection(firestore,'jugadores'),
            where('uidUsuario', '==', usuario.uid ),
            where('sexoJugador','==','Femenino'),
            limit(10)
        );

        const unsuscribe = onSnapshot(consulta,(snapshot) => {
            if(snapshot.docs.length > 0){
                cambiarUltimoFemenil(snapshot.docs[snapshot.docs.length-1]);
                cambiarHayMasPorCargar(true);
            } else{
                cambiarHayMasPorCargar(false);
            }
            cambiarFemenil(snapshot.docs.map((escuela) => {
                return{...escuela.data(), id: escuela.id}
            }));
        });

        return unsuscribe;
    },[usuario])
    return [femenil,obtenerMasFemenil,hayMasPorCargar];

}
 
export default useObtenerEquipoFemenil;