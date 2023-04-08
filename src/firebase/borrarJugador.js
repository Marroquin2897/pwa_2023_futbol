
import {getFirestore, doc, deleteDoc} from "firebase/firestore";
import {firebaseApp} from "../firebase/firebaseConfig";


const borrarJugador = async (id) => {
    const firestore = getFirestore(firebaseApp);
    await deleteDoc(doc(firestore,'jugadores',id));

}

export default borrarJugador;