import  {useEffect,useState} from 'react';
import firebaseApp from '../firebase/firebaseConfig';

const useObtenerJugadores = () => {
    const [jugadores, cambiarJugadores] = useState([]);

    useEffect (() => {

    },[])
    return [jugadores];
}
 
export default useObtenerJugadores;