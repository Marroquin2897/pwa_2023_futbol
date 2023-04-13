import {getFirestore, collection, addDoc } from 'firebase/firestore';
import {firebaseApp} from "../firebase/firebaseConfig";

const agregarEscuela = ({nombreEntrenador,nombreAsistente,escuela,modalidades,categoria,uidUsuario}) => {
    const firestore = getFirestore(firebaseApp);
    return addDoc(collection(firestore,'escuelas'),{
        nombreEntrenador: nombreEntrenador,
        nombreAsistente: nombreAsistente,
        escuela: escuela,
        modalidades: modalidades,
        categoria: categoria,
        uidUsuario: uidUsuario,
    });
}
 
export default agregarEscuela;