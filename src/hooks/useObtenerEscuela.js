import {useEffect, useState} from 'react';
import {firebaseApp} from '../firebase/firebaseConfig';
import {getFirestore,doc, getDoc} from 'firebase/firestore';

const useObtenerEscuela = (id) => {
    const firestore = getFirestore(firebaseApp);
	const [escuela, establecerEscuela] = useState('');
	
	useEffect(() => { //Acceder a la BD una sola vez 
		const obtenerEscuela = async() => {
		// Consulta en la colección "Escuelas Superior" con el ID proporcionado
		const escuelaSuperior= doc(firestore, "Escuelas Superior", id);
  		const escSupSnap = await getDoc(escuelaSuperior);

		if (escSupSnap.exists()) {
			establecerEscuela(escSupSnap);
			console.log(escSupSnap.data())
		} else {
			// Si el documento no se encuentra en la colección "Escuelas Superior", se verifica en la colección "Escuelas Media Superior"
			const escuelaMediaSuperior = doc(firestore, "Escuelas Media Superior", id);
			const escuelasMSSnap = await getDoc(escuelaMediaSuperior);

			if (escuelasMSSnap.exists()) {
				establecerEscuela(escuelasMSSnap);
				console.log(escuelasMSSnap.data())
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