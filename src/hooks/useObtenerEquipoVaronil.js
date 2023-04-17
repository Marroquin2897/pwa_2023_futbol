import  {useEffect,useState} from 'react';
import {firebaseApp} from '../firebase/firebaseConfig';
import {useAuth} from './../contextos/AuthContext';
import {getFirestore,collection, onSnapshot, query, where, limit,startAfter} from "firebase/firestore"

const useObtenerEquipoVaronil = () => {
    const firestore = getFirestore(firebaseApp);
    const{usuario} = useAuth();
    const [varonil, cambiarVaronil] = useState([]);
    const[ultimoVaronil,cambiarUltimoVaronil] = useState(null)
    const[hayMasPorCargar,cambiarHayMasPorCargar] = useState(false);

    const obtenerMasVaronil = () => { //Mostrar el resto de jugadores
        const consulta = query (
            collection(firestore,'jugadores'),
            where('uidUsuario','==',usuario.uid),
            where('sexoJugador','==','Masculino'),
            limit(10),
            startAfter(ultimoVaronil)
        );
        onSnapshot(consulta,(snapshot) => {
            if(snapshot.docs.length > 0){
                cambiarUltimoVaronil(snapshot.docs[snapshot.docs.length -1]);

                cambiarVaronil(varonil.concat(snapshot.docs.map((jugador) => {
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
            where('sexoJugador','==','Masculino'),
            limit(10)
        );

        const unsuscribe = onSnapshot(consulta,(snapshot) => {
            if(snapshot.docs.length > 0){
                cambiarUltimoVaronil(snapshot.docs[snapshot.docs.length-1]);
                cambiarHayMasPorCargar(true);
            } else{
                cambiarHayMasPorCargar(false);
            }
            cambiarVaronil(snapshot.docs.map((jugador) => {
                return{...jugador.data(), id: jugador.id}
            }));
        });

        return unsuscribe;
    },[usuario])
    return [varonil,obtenerMasVaronil,hayMasPorCargar];
}
 
export default useObtenerEquipoVaronil;