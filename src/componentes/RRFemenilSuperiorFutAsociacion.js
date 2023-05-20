import React from 'react';
import { useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { getFirestore, collection, addDoc,where,updateDoc,getDocs,doc,query,setDoc} from 'firebase/firestore';
import { firebaseApp } from '../firebase/firebaseConfig';
import { Formulario, Label, GrupoInput, ContenedorBotonCentrado, Boton, Input } from '../elementos/ElementosFormularioJuegos';
import Alerta from '../elementos/Alerta';

const RRFemenilSuperiorFutAsociacion = () => {
    const [partidos, setPartidos] = useState([]);
    const [resultados, setResultados] = useState({});
    const [jornada, setJornada] = useState('');
    const [guardado, setGuardado] = useState(false);
    const [alerta, setAlerta] = useState({ tipo: '', mensaje: '' });

    const firestore = getFirestore(firebaseApp);
    const partidosCollection = collection(firestore, 'partidos');
    const resultadosCollection = collection(firestore, 'resultadosFemenilSuperiorAsociacion');

    useEffect(() => {
        const fetchPartidos = async () => {
          try {
            const partidosRef = collection(firestore, 'partidos');
            const querySnapshot = await getDocs(
              query(partidosRef, where('jornada', '==', jornada), where('categoria', '==', 'femenil'), where('nivelAcademico', '==', 'Media Superior'))
            );
    
            const partidos = [];
            const resultados = {}; // Objeto para almacenar los resultados de cada partido
    
            querySnapshot.forEach((doc) => {
              const partido = { id: doc.id, ...doc.data() };
              partidos.push(partido);
              resultados[partido.id] = { golesLocal: '', golesVisitante: '' }; // Inicializa el resultado vacío para cada partido
            });
    
            setPartidos(partidos);
            setResultados(resultados);
          } catch (error) {
            console.error(error);
            setPartidos([]);
            setResultados({});
          }
        };
    
        if (jornada) {
          fetchPartidos();
        }
      }, [jornada, firestore]);
    
      const handleVerPartidos = async () => {
        try {
          const querySnapshot = await getDocs(
            query(
              partidosCollection,
              where('jornada', '==', parseInt(jornada)),
              where('categoria', '==', 'femenil'),
              where('nivelAcademico', '==', 'Media Superior')
            )
          );
    
          const partidos = [];
          querySnapshot.forEach((doc) => {
            partidos.push({ id: doc.id, ...doc.data() });
          });
    
          console.log('Partidos encontrados:', partidos);
          setPartidos(partidos);
        } catch (error) {
          console.error(error);
          setPartidos([]);
        }
      };
    
      useEffect(() => {
        if (jornada !== '') {
          handleVerPartidos();
        }
      }, [jornada]);
    
      const handleResultadoChange = (partidoId, campo, valor) => {
        setResultados((prevState) => ({
          ...prevState,
          [partidoId]: {
            ...prevState[partidoId],
            [campo]: valor,
          },
        }));
      };
    
      const guardarResultados = () => {
        Object.entries(resultados).forEach(([partidoId, resultado]) => {
          const partido = partidos.find((partido) => partido.id === partidoId);
          const resultadoPartido = {
            jornada: partido.jornada,
            local: partido.local,
            visitante: partido.visitante,
            golesLocal: resultado.golesLocal,
            golesVisitante: resultado.golesVisitante,
          };
          const docRef = doc(resultadosCollection, `${partido.local}-${partido.visitante}-${partido.jornada}`);
          setDoc(docRef, resultadoPartido)
            .then(() => {
              setAlerta({ tipo: 'exito', mensaje: 'Resultado Guardado Exitosamente' });
            })
            .catch((error) => {
              setAlerta({ tipo: 'error', mensaje: 'Error al Guardar el Resultado' });
            });
        });
        setGuardado(true);
      };




  return (
    <div>
      <h2>Registrar Resultados de Partidos</h2>

      <label htmlFor="jornada">Jornada:</label>
      <input type="text" id="jornada" value={jornada} onChange={(e) => setJornada(e.target.value)} />
      <button onClick={handleVerPartidos}>Ver Partidos</button>

      <div>
        <h3>Partidos</h3>
        <ul>
          {partidos.map((partido) => (
            <li key={partido.id}>
              <div>
                <span>{partido.local}</span> vs <span>{partido.visitante}</span>
              </div>
              <div>
                <label htmlFor="golesLocal">Goles Local</label>
                <input
                  type="number"
                  id="golesLocal"
                  value={resultados[partido.id]?.golesLocal || ''}
                  onChange={(e) => handleResultadoChange(partido.id, 'golesLocal', e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="golesVisitante">Goles Visitante:</label>
                <input
                  type="number"
                  id="golesVisitante"
                  value={resultados[partido.id]?.golesVisitante || ''}
                  onChange={(e) => handleResultadoChange(partido.id, 'golesVisitante', e.target.value)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {partidos.length > 0 && (
        <button onClick={guardarResultados}>Guardar Resultado</button>
      )}

      {guardado && (
        <div>
          <p>Resultados guardados exitosamente.</p>
        </div>
      )}

      {alerta.tipo === 'exito' && (
        <div>
          <p>{alerta.mensaje}</p>
        </div>
      )}

      {alerta.tipo === 'error' && (
        <div>
          <p>{alerta.mensaje}</p>
        </div>
      )}
    </div>
  );
};

export default RRFemenilSuperiorFutAsociacion;
