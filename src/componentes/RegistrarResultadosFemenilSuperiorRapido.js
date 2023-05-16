import React from 'react';
import { useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { getFirestore, collection, addDoc,where,updateDoc,getDocs,doc,query,setDoc} from 'firebase/firestore';
import { firebaseApp } from '../firebase/firebaseConfig';
import { Formulario, Label, GrupoInput, ContenedorBotonCentrado, Boton, Input } from '../elementos/ElementosFormularioJuegos';
import Alerta from '../elementos/Alerta';

const RegistrarResultadosFemenilSuperiorRapido = () => {
    const [jornada, setJornada] = useState('');
    const [partidos, setPartidos] = useState([]);
    const [resultados, setResultados] = useState({}); 
    const [guardado, setGuardado] = useState(false);
    const firestore = getFirestore(firebaseApp);

    useEffect(() => {
        const fetchPartidos = async () => {
          try {
            const partidosRef = collection(firestore, 'partidos');
            const querySnapshot = await getDocs(
              query(partidosRef, where('jornada', '==', jornada), where('categoria', '==', 'femenil'), where('nivelAcademico', '==', 'Superior'))
            );
    
            const partidos = [];
            const resultados = {}; // Objeto para almacenar los resultados de cada partido
    
            querySnapshot.forEach((doc) => {
              const partido = { id: doc.id, ...doc.data() };
              partidos.push(partido);
              resultados[partido.id] = { golesLocal: '', golesVisitante: '', ganadorPenalesLocal: false, ganadorPenalesVisitante: false }; // Inicializa el resultado vacío para cada partido
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
            const firestore = getFirestore(firebaseApp);
            const partidosRef = collection(firestore, 'partidos');
            const querySnapshot = await getDocs(
              query(
                partidosRef,
                where('jornada', '==', parseInt(jornada)),
                where('categoria', '==', 'femenil'),
                where('nivelAcademico', '==', 'Superior')
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
        if (jornada !== "") {
          handleVerPartidos();
        }
      }, [jornada]);

      const handleResultadoChange = (partidoId, campo, valor) => {
        setResultados((prevState) => {
          const nuevosResultados = { ...prevState };
          if (!nuevosResultados[partidoId]) {
            nuevosResultados[partidoId] = {};
          }
          nuevosResultados[partidoId][campo] = valor;
          return nuevosResultados;
        });
      };
      const handleGanadorPenalesChange = (partidoId, campo, valor) => {
        setResultados((prevState) => {
          const nuevosResultados = { ...prevState };
          if (!nuevosResultados[partidoId]) {
            nuevosResultados[partidoId] = {};
          }
          nuevosResultados[partidoId][campo] = valor;
          return nuevosResultados;
        });
      };

      const guardarResultados = () => {
        Object.entries(resultados).forEach(([partidoId, resultado]) => {
          const partido = partidos.find((partido) => partido.id === partidoId);
          const golesPenalesLocal = resultado.ganadorPenalesLocal ? 1 : 0;
          const golesPenalesVisitante= resultado.ganadorPenalesVisitante ? 1 : 0;
          const resultadoPartido = {
            jornada: partido.jornada,
            local: partido.local,
            visitante: partido.visitante,
            golesLocal: resultado.golesLocal,
            golesVisitante: resultado.golesVisitante,
            golesPenalesLocal: golesPenalesLocal,
            golesPenalesVisitante: golesPenalesVisitante,
          };
          const docRef = doc(
            firestore,
            'resultadosFemenilSuperiorRapido',
            `${partido.local}-${partido.visitante}-${partido.jornada}`
          );
          setDoc(docRef, resultadoPartido)
            .then(() => {
              console.log('Resultado guardado exitosamente');
            })
            .catch((error) => {
              console.error('Error al guardar el resultado:', error);
            });
        });
        setGuardado(true);
      };

    return ( 
        <div className="hero">
            <nav>
            <img src="https://tinyurl.com/2b2ek3ck"/>
              <center><h2> Registro de Resultados Fútbol Rápido Femenil Nivel Superior</h2></center> 
              <h3><img src="https://tinyurl.com/233pns5r"/></h3>
            </nav>
            <Helmet>
                <title> Registro de Resultados Fútbol Rápido Femenil Nivel Superior </title>
            </Helmet>
            <main>
            <div>
                <label htmlFor="jornada">Jornada:</label>
                <input type="text" id="jornada" value={jornada} onChange={(e) => setJornada(e.target.value)} />
                <button onClick={handleVerPartidos}>Ver Partidos</button>
            </div>
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
                            <label htmlFor="ganadorPenalesLocal">Ganador Penales Local:</label>
                            <input
                            type="checkbox"
                            id="ganadorPenalesLocal"
                            checked={resultados[partido.id]?.ganadorPenalesLocal || false}
                            onChange={(e) =>handleGanadorPenalesChange(partido.id,'ganadorPenalesLocal',e.target.checked)}
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
                        <div>
                            <label htmlFor="ganadorPenalesVisitante">Ganó en penales Visitante:</label>
                            <input
                            type="checkbox"
                            id="ganadorPenalesVisitante"
                            checked={resultados[partido.id]?.ganadorPenalesVisitante || false}
                            onChange={(e) =>handleGanadorPenalesChange(partido.id,'ganadorPenalesVisitante',e.target.checked)}
                            />
                        </div>
                    </li>
                    ))}  
                </ul>
                </div>
                {partidos.length > 0 && (
                  <button onClick={guardarResultados}>Guardar Resultado</button>
                )}
            </main>
        </div>
     );
}
export default RegistrarResultadosFemenilSuperiorRapido;