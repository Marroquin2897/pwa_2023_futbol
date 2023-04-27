import  {useEffect,useState} from 'react';
import {firebaseApp} from '../firebase/firebaseConfig';
import {useAuth} from './../contextos/AuthContext';
import {getFirestore,collection, onSnapshot, query, where, limit,startAfter, getDoc, doc} from "firebase/firestore"

const useObtenerEquipoFemenil = ({id}) => {
    const firestore = getFirestore(firebaseApp);
    const{usuario} = useAuth();
    const [femenil, cambiarFemenil] = useState([]);
    const[ultimoFemenil,cambiarUltimoFemenil] = useState(null)
    const[hayMasPorCargar,cambiarHayMasPorCargar] = useState(false);

    const obtenerMasFemenil = ({id}) => { //Mostrar el resto de jugadores
        const obtenerEscuela = async () => {
            const escuelaRef = doc(firestore, "escuelas", id);   
            const escuelaSnap = await getDoc(escuelaRef);
            if (escuelaSnap.exists() && escuelaSnap.data()) {
                const nombreEsc = escuelaSnap.data().escuela;
                const consulta = query (
                    collection(firestore,'jugadores'),
                    where('uidUsuario','==',usuario.uid),
                    where('sexoJugador','==','Femenino'),
                    where('escuelaJugador','==',nombreEsc),
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
            }else{
                console.log("No hay documentos")
                }
    };
            obtenerEscuela();
    }
    useEffect (() => {
        const obtenerEscuela = async () => {
            const escuelaRef = doc(firestore, "escuelas", id);   
            const escuelaSnap = await getDoc(escuelaRef);
            if (escuelaSnap.exists() && escuelaSnap.data()) {
              const nombreEsc = escuelaSnap.data().escuela; 
              const consulta = query(
                collection(firestore,'jugadores'),
                where('uidUsuario', '==', usuario.uid ),
                where('sexoJugador','==','Femenino'),
                where('escuelaJugador','==',nombreEsc),
                limit(10)
            );
                const unsuscribe = onSnapshot(consulta,(snapshot) => {
                    if(snapshot.docs.length > 0){
                        cambiarUltimoFemenil(snapshot.docs[snapshot.docs.length-1]);
                        cambiarHayMasPorCargar(true);
                    } else{
                        cambiarHayMasPorCargar(false);
                    }
                    cambiarFemenil(snapshot.docs.map((jugador) => {
                        return{...jugador.data(), id: jugador.id}
                    }));
                });
        

                return unsuscribe;
            }else{
                console.log("No hay documentos")
            }
            };
            obtenerEscuela();
    },[usuario,id])
    return [femenil,obtenerMasFemenil,hayMasPorCargar];
}
 
export default useObtenerEquipoFemenil;