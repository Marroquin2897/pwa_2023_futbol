import {useEffect, useState} from 'react';
import {firebaseApp} from '../firebase/firebaseConfig';
import {getFirestore,doc, getDoc} from 'firebase/firestore';

const useObtenerEscuela = ({id}) => {
    const firestore = getFirestore(firebaseApp);
	const [escuela, establecerEscuela] = useState('');
	
	useEffect(() => { //Acceder a la BD una sola vez 
		const obtenerEscuela = async() => {
		// Consulta en la colección "Escuelas Superior" con el ID proporcionado
		const escuelaSuperior= doc(firestore, "Escuelas Superior", id);
  		const escuelaSuperiorSnap = await getDoc(escuelaSuperior);

		if (escuelaSuperiorSnap.exists()) {
			establecerEscuela(escuelaSuperiorSnap.data());
			console.log(escuelaSuperiorSnap.id)
		} else {
			// Si el documento no se encuentra en la colección "Escuelas Superior", se verifica en la colección "Escuelas Media Superior"
			const escuelaMediaSuperior = doc(firestore, "Escuelas Media Superior", id);
			const escuelasMSSnap = await getDoc(escuelaMediaSuperior);

			if (escuelasMSSnap.exists()) {
				establecerEscuela(escuelasMSSnap.data());
				console.log(escuelasMSSnap.id)
			} else {
			console.log('El documento no se encuentra en ninguna colección');
			}
		  }
		}

		obtenerEscuela();
	}, [id]);

	return [escuela];
}
 
export default useObtenerEscuela;