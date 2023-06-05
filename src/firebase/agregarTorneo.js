import {getFirestore, collection, addDoc } from 'firebase/firestore';
import {firebaseApp} from "../firebase/firebaseConfig";

const agregarTorneo = ({nombreTorneo, sistemaCompetencia, uidUsuario}) => {
    const firestore = getFirestore(firebaseApp);
    return addDoc(collection(firestore,'torneos'),{
        nombreTorneo: nombreTorneo,
        sistemaCompetencia: sistemaCompetencia,
        uidUsuario: uidUsuario,
    });

}
 
export default agregarTorneo;