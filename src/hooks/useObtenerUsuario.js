import {useEffect, useState} from 'react';
import {firebaseApp} from '../firebase/firebaseConfig';
import {useNavigate} from 'react-router-dom';
import {getFirestore,doc, getDoc} from 'firebase/firestore';

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