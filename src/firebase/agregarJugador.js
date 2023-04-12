import {getFirestore, collection, addDoc } from 'firebase/firestore';
import {firebaseApp} from "../firebase/firebaseConfig";


const agregarJugador = ({nombreJugador,apellidosJugador,fechaNacJugador,sexoJugador,nssJugador,curpJugador,escuelaJugador,boletaJugador,semestreJugador,uidUsuario}) => {
    const firestore = getFirestore(firebaseApp);
    return addDoc(collection(firestore,'jugadores'),{
        nombreJugador: nombreJugador,
        apellidosJugador: apellidosJugador,
        fechaNacJugador: fechaNacJugador,
        sexoJugador: sexoJugador,
        nssJugador: nssJugador,
        curpJugador: curpJugador,
        escuelaJugador: escuelaJugador,
        boletaJugador: boletaJugador,
        semestreJugador: semestreJugador,
        uidUsuario: uidUsuario,
    });
}
 
export default agregarJugador;