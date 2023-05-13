import {useEffect, useState} from 'react';
import {firebaseApp} from '../firebase/firebaseConfig';

import {useNavigate} from 'react-router-dom';
import {getFirestore,doc, getDoc} from 'firebase/firestore';

const useObtenerEscuela = (id) => {
    const firestore = getFirestore(firebaseApp);
	const navigate = useNavigate();
	const [escuela, establecerEscuela] = useState('');
	
	useEffect(() => { //Acceder a la BD una sola vez 
		const obtenerEscuela = async() => {
            var escuelaRef=''
            if (escuelaRef){
                escuelaRef = doc(firestore, "Escuelas Media Superior", id);
            }else{
                escuelaRef = doc(firestore, "Escuelas Superior", id);
            }
			const documento = await getDoc(escuelaRef);

			if(documento.exists){
				establecerEscuela(documento);
			} else {	
				navigate('/lista-escuelas');
			}
		}

		obtenerEscuela();
	}, [navigate, id]);

	return [escuela];
}
 
export default useObtenerEscuela;