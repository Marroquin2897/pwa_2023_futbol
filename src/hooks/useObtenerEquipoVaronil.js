import  {useEffect,useState} from 'react';
import {firebaseApp} from '../firebase/firebaseConfig';
import {useAuth} from './../contextos/AuthContext';
import {getFirestore,collection, onSnapshot, query, where, limit,startAfter,doc,getDoc} from "firebase/firestore"
import { Escuela } from '../elementos/ElementosDeLista';

const useObtenerEquipoVaronil = ({id}) => {
    const firestore = getFirestore(firebaseApp);
    const{usuario} = useAuth();
    const [varonil, cambiarVaronil] = useState([]);
    const[ultimoVaronil,cambiarUltimoVaronil] = useState(null)
    const[hayMasPorCargar,cambiarHayMasPorCargar] = useState(false);

    const obtenerMasVaronil = ({id}) => { //Mostrar el resto de jugadores.
        const obtenerEscuela = async () => {
            var escuelaRef=''
            if (escuelaRef){
                escuelaRef = doc(firestore, "Escuelas Media Superior", id);
            }else{
                escuelaRef = doc(firestore, "Escuelas Superior", id);
            }  
            const escuelaSnap = await getDoc(escuelaRef);
            if (escuelaSnap.exists() && escuelaSnap.data()) {
                const nombreEsc = escuelaSnap.data().escuela;
                const consulta = query (
                    collection(firestore,'jugadores'),
                    where('uidUsuario','==',usuario.uid),
                    where('sexoJugador','==','Masculino'),
                    where('escuelaJugador','==',nombreEsc),
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
            }else{
                    console.log("No hay documentos")
                }
        };
        obtenerEscuela();

    }
    useEffect (() => {
        const obtenerEscuela = async () => {
            var escuelaRef=''
            if (escuelaRef){
                escuelaRef = doc(firestore, "Escuelas Media Superior", id);
            }else{
                escuelaRef = doc(firestore, "Escuelas Superior", id);
            }
            const escuelaSnap = await getDoc(escuelaRef);
            if (escuelaSnap.exists() && escuelaSnap.data()) {
              const nombreEsc = escuelaSnap.data().escuela; 
              const consulta = query(
                collection(firestore,'jugadores'),
                where('uidUsuario', '==', usuario.uid ),
                where('sexoJugador','==','Masculino'),
                where('escuelaJugador','==',nombreEsc),
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
            }else{
                    console.log("No hay documentos")
                }
        };
        obtenerEscuela();
      
    },[id,usuario])
    return [varonil,obtenerMasVaronil,hayMasPorCargar];  
}
export default useObtenerEquipoVaronil;