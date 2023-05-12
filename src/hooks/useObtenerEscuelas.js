import  {useEffect,useState} from 'react';
import {firebaseApp} from '../firebase/firebaseConfig';

import {getFirestore,collection, getDocs, query, where, limit,startAfter} from "firebase/firestore"
import {useAuth} from './../contextos/AuthContext';

const useObtenerEscuelas = () => {
    const firestore = getFirestore(firebaseApp);
    const { usuario } = useAuth();
    const [escuelas, cambiarEscuelas] = useState([]);
    const [ultimoEscuela, cambiarUltimoEscuela] = useState(null);
    const [hayMasPorCargar, cambiarHayMasPorCargar] = useState(false);
  
    const obtenerMasEscuelas = () => {
      const consultaSuperior = query(
        collection(firestore, "Escuelas Superior"),
        where("uidUsuario", "==", usuario.uid),
        limit(10),
        startAfter(ultimoEscuela)
      );
  
      const consultaMediaSuperior = query(
        collection(firestore, "Escuelas Media Superior"),
        where("uidUsuario", "==", usuario.uid),
        limit(10),
        startAfter(ultimoEscuela)
      );
  
      const consultas = [consultaSuperior, consultaMediaSuperior];
  
      Promise.all(consultas.map((consulta) => getDocs(consulta)))
        .then((snapshots) => {
          const escuelasSnapshot = snapshots.reduce(
            (result, snapshot) => result.concat(snapshot.docs),
            []
          );
  
          if (escuelasSnapshot.length > 0) {
            cambiarUltimoEscuela(
              escuelasSnapshot[escuelasSnapshot.length - 1]
            );
  
            cambiarEscuelas(
              escuelas.concat(
                escuelasSnapshot.map((escuela) => ({
                  ...escuela.data(),
                  id: escuela.id,
                }))
              )
            );
          } else {
            cambiarHayMasPorCargar(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    useEffect(() => {
      const consultaSuperior = query(
        collection(firestore, "Escuelas Superior"),
        where("uidUsuario", "==", usuario.uid),
        limit(10)
      );
  
      const consultaMediaSuperior = query(
        collection(firestore, "Escuelas Media Superior"),
        where("uidUsuario", "==", usuario.uid),
        limit(10)
      );
  
      const consultas = [consultaSuperior, consultaMediaSuperior];
  
      Promise.all(consultas.map((consulta) => getDocs(consulta)))
        .then((snapshots) => {
          const escuelasSnapshot = snapshots.reduce(
            (result, snapshot) => result.concat(snapshot.docs),
            []
          );
  
          if (escuelasSnapshot.length > 0) {
            cambiarUltimoEscuela(
              escuelasSnapshot[escuelasSnapshot.length - 1]
            );
            cambiarHayMasPorCargar(true);
          } else {
            cambiarHayMasPorCargar(false);
          }
  
          cambiarEscuelas(
            escuelasSnapshot.map((escuela) => ({
              ...escuela.data(),
              id: escuela.id,
            }))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }, [usuario]);
  
    return [escuelas, obtenerMasEscuelas, hayMasPorCargar];
  };
export default useObtenerEscuelas;
  