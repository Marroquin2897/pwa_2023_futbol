import React from 'react';
import { useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { getFirestore, collection,where,getDocs,doc,query,setDoc} from 'firebase/firestore';
import { firebaseApp } from '../firebase/firebaseConfig';
import { Label, GrupoInput, ContenedorBotonCentrado, Boton, Input } from '../elementos/ElementosFormularioJuegos';
import Alerta from '../elementos/Alerta';
import BtnRegresar from '../elementos/BtnRegresar';

const RRVaronilMediaSuperiorFutAsociacion = () => {
    const [partidos, setPartidos] = useState([]);
    const [resultados, setResultados] = useState({});
    const [jornada, setJornada] = useState('');
    const [grupo, setGrupo] = useState('');
    const [mostrarPartidos, setMostrarPartidos] = useState(false);
    const [guardado, setGuardado] = useState(false);
    const [resultadosRegistrados, setResultadosRegistrados] = useState([]);
    const[estadoAlerta,cambiarEdoAlerta] = useState(false);
    const[alerta,cambiarAlerta] = useState({});
    const nameUsuario = sessionStorage.getItem("name")
 
    const firestore = getFirestore(firebaseApp);
    const partidosCollection = collection(firestore, 'partidos');
    const resultadosCollection = collection(firestore, 'resultadosVaronilMediaSuperiorAsociacion');

    useEffect(() => {
      const fetchPartidos = async () => {
        try {
          const partidosRef = collection(firestore, 'partidos');
          const querySnapshot = await getDocs(
            query(
              partidosRef,
              where('grupo', '==', grupo),
              where('jornada', '==', jornada),
              where('categoria', '==', 'Varonil'),
              where('nivelAcademico', '==', 'Media Superior')
            )
          );
  
        const partidos = [];
        const resultados = {};
        const resultadosRegistrados = [];
  
        querySnapshot.forEach((doc) => {
          const partido = { id: doc.id, ...doc.data() };
          partidos.push(partido);
          resultados[partido.id] = {
            golesLocal: '',
            golesVisitante: '',
          };
          resultadosRegistrados.push(partido.id);
        });
        setPartidos(partidos);
        setResultados(resultados);
        setResultadosRegistrados(resultadosRegistrados);
      } catch (error) {
        console.error(error);
        setPartidos([]);
        setResultados({});
        setResultadosRegistrados([]);
      }
    };
  
    if (jornada && grupo) {
      fetchPartidos();
    }
  }, [jornada, grupo, firestore]);

      const handleVerPartidos = async () => {
        try {
          const querySnapshot = await getDocs(
            query(
              partidosCollection,
              where('grupo', '==', parseInt(grupo)),
              where('jornada', '==', parseInt(jornada)),
              where('categoria', '==', 'Varonil'),
              where('nivelAcademico', '==', 'Media Superior')
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
    
      const guardarResultados = async () => {
        for (const [partidoId, resultado] of Object.entries(resultados)) {
          const partido = partidos.find((partido) => partido.id === partidoId);
      
          const querySnapshot = await getDocs(
            query(
              resultadosCollection,
              where('grupo', '==', partido.grupo),
              where('jornada', '==', partido.jornada),
              where('local', '==', partido.local),
              where('visitante', '==', partido.visitante)
            )
          );
      
          if (!querySnapshot.empty) {
            cambiarEdoAlerta(true);
            cambiarAlerta({
              tipo: 'error',
              mensaje: 'Los resultados ya han sido registrados para este partido.',
            });
            return;
          }
      
          const resultadoPartido = {
            grupo: partido.grupo,
            jornada: partido.jornada,
            local: partido.local,
            visitante: partido.visitante,
            golesLocal: resultado.golesLocal,
            golesVisitante: resultado.golesVisitante,
          };
      
          const docRef = doc(
            resultadosCollection,
            `${partido.local}-${partido.visitante}-${partido.jornada}`
          );
      
          try {
            await setDoc(docRef, resultadoPartido);
          } catch (error) {
            console.error(error);
            cambiarEdoAlerta(true);
            cambiarAlerta({
              tipo: 'error',
              mensaje: 'Error al guardar el resultado.',
            });
            return;
          }
        }
      
        cambiarEdoAlerta(true);
        cambiarAlerta({
          tipo: 'exito',
          mensaje: 'Resultado guardado exitosamente.',
        });
      
        setGuardado(true);
      };
    return ( 
        <div className='hero'>
        <nav>
            <img src="https://tinyurl.com/2obtocwe"/>
              <center><h2> Registro de Resultados Fútbol Asociación Varonil Nivel Media Superior</h2>
              <h3>{nameUsuario}</h3></center> 
              <h3><img src="https://tinyurl.com/2kaldmbh"/></h3>
            </nav>
            <Helmet>
                <title> Registro de Resultados Fútbol Asociación Varonil Nivel Media Superior </title>
            </Helmet>
        <main>
        <Label htmlFor="grupo">Grupo:</Label>
          <GrupoInput>
            <Input type="text" id="grupo" value={grupo} onChange={(e) => setGrupo(e.target.value)} />
          </GrupoInput>
          <Label htmlFor="jornada">Jornada:</Label>
          <GrupoInput>
            <Input type="text" id="jornada" value={jornada} onChange={(e) => setJornada(e.target.value)} />
          </GrupoInput>
          
          <br/>
          <ContenedorBotonCentrado>
            <Boton onClick={handleVerPartidos} > Ver Partido </Boton>
          </ContenedorBotonCentrado>

          {mostrarPartidos && (
                  <div>
                    {partidos.length === 0 ? (         
                      <p> No hay partidos.</p> 
                    ) : (
                      <div>
                        <Label>
                          <h3>Partidos</h3>
                        </Label>
                        <ul>
                          {partidos.map((partido) => (
                            <li key={partido.id}>
                              <div>
                                <Label>
                                <center> <span>{partido.local}</span>  VS <span> {partido.visitante}</span></center> 
                                </Label>
                              </div>
                              <div className="golesContainer">
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
                                  <Label htmlFor="golesVisitante">Goles Visitante:</Label>
                                  <Input
                                    type="number"
                                    id="golesVisitante"
                                    value={resultados[partido.id]?.golesVisitante || ''}
                                    onChange={(e) => handleResultadoChange(partido.id, 'golesVisitante', e.target.value)}
                                  />
                                </div>
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
              <Boton onClick={guardarResultados}> Guardar Resultado </Boton>
            </ContenedorBotonCentrado>
          )}
          <br/>
          <ContenedorBotonCentrado>
              <BtnRegresar ruta = '/RR-FutbolAsociacion'/>
            </ContenedorBotonCentrado>
          {guardado && (
            <div>
              <p>Resultados guardados exitosamente.</p>
            </div>
          )}
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
 
export default RRVaronilMediaSuperiorFutAsociacion;