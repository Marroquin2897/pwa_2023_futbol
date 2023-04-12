import {getFirestore ,doc, updateDoc } from 'firebase/firestore';
import {firebaseApp} from "../firebase/firebaseConfig";


const editarJugador = async ({id,nombreJugador,apellidosJugador,fechaNacJugador,nssJugador,curpJugador,escuelaJugador,boletaJugador,semestreJugador}) => {
    const firestore = getFirestore(firebaseApp);
    const documento = doc(firestore,'jugadores',id);
    return await updateDoc(documento,{
        nombreJugador: nombreJugador,
        apellidosJugador: apellidosJugador,
        fechaNacJugador: fechaNacJugador,
        nssJugador: nssJugador,
        curpJugador: curpJugador,
        escuelaJugador: escuelaJugador,
        boletaJugador: boletaJugador,
        semestreJugador: semestreJugador,
    });  
}
 
export default editarJugador;