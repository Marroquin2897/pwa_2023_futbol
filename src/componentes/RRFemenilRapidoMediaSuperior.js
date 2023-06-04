import React from 'react';
import { useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { getFirestore, collection,where,getDocs,doc,query,setDoc} from 'firebase/firestore';
import { firebaseApp } from '../firebase/firebaseConfig';
import { Label, GrupoInput, ContenedorBotonCentrado, Boton, Input } from '../elementos/ElementosFormularioJuegos';
import Alerta from '../elementos/Alerta';
import BtnRegresar from '../elementos/BtnRegresar';

const RRFemenilRapidoMediaSuperior = () => {
    const [jornada, setJornada] = useState('');
    const [partidos, setPartidos] = useState([]);
    const [resultados, setResultados] = useState({}); 
    const [guardado, setGuardado] = useState(false);
    const [mostrarPartidos, setMostrarPartidos] = useState(false);
    const[estadoAlerta,cambiarEdoAlerta] = useState(false);
    const[alerta,cambiarAlerta] = useState({});
    const firestore = getFirestore(firebaseApp);
  
    useEffect(() => {
        const fetchPartidos = async () => {
          try {
            const partidosRef = collection(firestore, 'partidos');
            const querySnapshot = await getDocs(
              query(partidosRef, where('jornada', '==', jornada), where('categoria', '==', 'femenil'), where('nivelAcademico', '==', 'Media Superior'),where('modalidadTorneo', '==', 'Futbol Rapido'))
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
                where('nivelAcademico', '==', 'Media Superior'),
                where('modalidadTorneo', '==', 'Futbol Rapido')
              )
            );
        
            const partidos = [];
            querySnapshot.forEach((doc) => {
              partidos.push({ id: doc.id, ...doc.data() });
            });
            setMostrarPartidos(true);
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
            'resultadosFemenilMediaSuperiorRapido',
            `${partido.local}-${partido.visitante}-${partido.jornada}`
          );
          setDoc(docRef, resultadoPartido)
            .then(() => {
              cambiarEdoAlerta(true); 
              cambiarAlerta({
                tipo: 'exito',
                mensaje: 'Resultado Guardado Exitosamente'
            });
            })
            .catch((error) => {
              cambiarEdoAlerta(true); 
              cambiarAlerta({
                  tipo: 'error',
                  mensaje: 'Error al Guardar el Resultado'
              });
            });
        });
        setGuardado(true);
      };
    return ( 
        <div className="hero">
            <nav>
            <img src="https://tinyurl.com/2obtocwe" alt=''/>
              <center><h2> Registro de Resultados Fútbol Rápido Femenil Nivel Media Superior</h2></center> 
              <h3><img src="https://tinyurl.com/2kaldmbh" alt=''/></h3>
            </nav>
            <Helmet>
                <title> Registro de Resultados Fútbol Rápido Femenil Nivel Media Superior </title>
            </Helmet>
            <main>
            <div>
                <Label htmlFor="jornada">Jornada:</Label>
                <GrupoInput>
                <Input type="text" id="jornada" value={jornada} onChange={(e) => setJornada(e.target.value)} />
                </GrupoInput>
                <br/>
                <ContenedorBotonCentrado>
                  <Boton onClick={handleVerPartidos}> Ver Partidos </Boton>
                </ContenedorBotonCentrado>
                <br/>
            </div>
            {mostrarPartidos && ( 
                <div>
                  {partidos.length === 0 ? (
                    <p> No hay partidos para esta modalidad.</p>
                  ) : (
                    <div> 
                        <Label> <h3>Partidos</h3> </Label>
                        <ul>
                        {partidos.map((partido) => (
                        <li key={partido.id}>
                            <div>
                              <Label> 
                              <center> <span>{partido.local}</span>  VS <span> {partido.visitante}</span></center> 
                              </Label>
                            </div>
                            <div>
                            <Label htmlFor="golesLocal">Goles Local</Label>
                            <Input
                            type="number"
                            id="golesLocal"
                            value={resultados[partido.id]?.golesLocal || ''}
                            onChange={(e) => handleResultadoChange(partido.id, 'golesLocal', e.target.value)}
                            />
                            </div>
                            <div>
                                <Label htmlFor="ganadorPenalesLocal">Ganador en Shoot Out Local:</Label>
                                <Input
                                type="checkbox"
                                id="ganadorPenalesLocal"
                                checked={resultados[partido.id]?.ganadorPenalesLocal || false}
                                onChange={(e) =>handleGanadorPenalesChange(partido.id,'ganadorPenalesLocal',e.target.checked)}
                                />
                            </div>
                            <div>
                            <Label htmlFor="golesVisitante">Goles Visitante:</Label>
                            <Input
                            type="number"
                            id="golesVisitante"
                            value={resultados[partido.id]?.golesVisitante || ''}
                            onChange={(e) => handleResultadoChange(partido.id, 'golesVisitante', e.target.value)}
                            />
                            </div>
                            <div>
                                <Label htmlFor="ganadorPenalesVisitante">Ganador en Shoot Out Visitante:</Label>
                                <Input
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
                  )}  
                </div>
            )}
            <br/>
                {partidos.length > 0 && (
                  <ContenedorBotonCentrado>
                  <Boton onClick={guardarResultados} >  Guardar Resultado </Boton>
                  </ContenedorBotonCentrado>
                )}
                <ContenedorBotonCentrado>
                <BtnRegresar ruta = '/RR-FutbolRapido'/>
                </ContenedorBotonCentrado>
            </main>
            <Alerta 
            tipo= {alerta.tipo}
            mensaje= {alerta.mensaje}
            estadoAlerta={estadoAlerta}
            cambiarEdoAlerta={cambiarEdoAlerta}
            />
        </div>
     );
}
 
export default RRFemenilRapidoMediaSuperior;