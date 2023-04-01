import {useEffect, useState} from 'react';
import firebaseApp from '../firebase/firebaseConfig';
import {useNavigate} from 'react-router-dom';
import {getFirestore,doc, getDoc, onSnapshot, collection} from 'firebase/firestore';
import { useAuth } from '../contextos/AuthContext'; 
import { useRef } from 'react';
import { dblClick } from '@testing-library/user-event/dist/click';

const useObtenerUsuario = (id) => {
    const firestore = getFirestore(firebaseApp);
	const navigate = useNavigate();
	const [usuario, establecerUsuario] = useState('');
	
	useEffect(() => { //Acceder a la BD una sola vez 
		const obtenerUsuario = async() => {
			const documento = await getDoc(doc(firestore, `usuarios`,id));
			console.log(documento.data())
			if(documento.exists){
				establecerUsuario(documento);
			} else {	
				navigate('/rol');
			}
		}
		
		obtenerUsuario();
	}, [navigate,id]);
	return [usuario];
}
 
export default useObtenerUsuario;