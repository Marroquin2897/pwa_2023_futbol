import {getFirestore ,doc, updateDoc } from 'firebase/firestore';
import firebaseApp from "../firebase/firebaseConfig";

const editarJugador = async ({id,nameJugador,lastnameJugador,fechaNacJugador,nssJugador,curpJugador,boletaJugador,semestreJugador}) => {
    const firestore = getFirestore(firebaseApp);
    const documento = doc(firestore,'jugadores',id);
    return await updateDoc(documento,{
        nameJugador: nameJugador,
        lastnameJugador: lastnameJugador,
        fechaNacJugador: fechaNacJugador,
        nssJugador: nssJugador,
        curpJugador: curpJugador,
        boletaJugador: boletaJugador,
        semestreJugador: semestreJugador,
    });  
}
 
export default editarJugador;