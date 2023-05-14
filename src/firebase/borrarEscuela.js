
import {getFirestore, doc, deleteDoc} from "firebase/firestore";
import {firebaseApp} from "../firebase/firebaseConfig";


const borrarEscuela = async (id) => {
    const firestore = getFirestore(firebaseApp);
    var escuelaRef=doc(firestore, "Escuelas Media Superior", id)
    if (escuelaRef){
        await deleteDoc(escuelaRef);
    }else{
        escuelaRef = doc(firestore, "Escuelas Superior", id);
        await deleteDoc(escuelaRef);
    }
    

}

export default borrarEscuela;