import {useState,useEffect} from 'react';
import { Helmet } from 'react-helmet';
import {Formulario, Label, GrupoInput, ContenedorBotonCentrado, Boton, Input } from '../elementos/ElementosFormularioJuegos';
import {firebaseApp} from "../firebase/firebaseConfig";
import {getFirestore, collection, addDoc,query,where, getDocs,updateDoc, doc,onSnapshot,setDoc,runTransaction } from 'firebase/firestore';
import {Lista,ElementoLista,ContenedorBotonCentral,ContenedorBotones,BotonAccion,Nombre,BotonCargarMas,
  ContenedorSubtitulo,
  Subtitulo} from './../elementos/ElementosListaRoundRobin';

const RoundRobin = () => {
  
  const [numEquipos, setNumEquipos] = useState(0);
  const [equipos, setEquipos] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [jornadas, setJornadas] = useState([]);

  // Función que se ejecuta cuando se cambia el número de equipos
  const handleNumEquiposChange = (event) => {
    const num = parseInt(event.target.value);
    setNumEquipos(num);

    // Crea un array de equipos vacío con la longitud del número de equipos
    const nuevosEquipos = new Array(num).fill("").map((_, i) => `Equipo ${i + 1}`);
    setEquipos(nuevosEquipos);
  };

  // Función que se ejecuta cuando se cambia el nombre de un equipo
  const handleEquipoChange = (index, nombre) => {
    const nuevosEquipos = [...equipos];
    nuevosEquipos[index] = nombre;
    setEquipos(nuevosEquipos);
  };

  // Función que se ejecuta cuando se genera el calendario
  const handleGenerarCalendario = () => {
    const nuevosPartidos = [];
    const numPartidosPorJornada = numEquipos / 2;
  
    // Crea una lista de equipos
    const equiposList = equipos.map((equipo, index) => ({ nombre: equipo, index }));
  
    // Itera sobre cada jornada
    for (let j = 0; j < numEquipos - 1; j++) {
      const jornada = [];
  
      // Itera sobre cada partido en la jornada
      for (let i = 0; i < numPartidosPorJornada; i++) {
        const equipoLocal = equiposList[i];
        const equipoVisitante = equiposList[numEquipos - 1 - i];
  
        // Asegúrate de que los equipos no se hayan enfrentado antes
        if (partidos.some((partido) => (partido.local === equipoLocal.nombre && partido.visitante === equipoVisitante.nombre) || (partido.local === equipoVisitante.nombre && partido.visitante === equipoLocal.nombre))) {
          alert(`El equipo ${equipoLocal.nombre} ya se enfrentó con el equipo ${equipoVisitante.nombre}. Intente de nuevo.`);
          return;
        }
  
        // Crea un objeto con la información del partido
        const partido = {
          local: equipoLocal.nombre,
          visitante: equipoVisitante.nombre,
          jornada: j + 1
        };
  
        // Agrega el partido a la lista de partidos
        nuevosPartidos.push(partido);
        
        const firestore = getFirestore(firebaseApp);
        // Agrega el partido a la subcolección "partidos"
        setDoc(doc(firestore, "partidos", `${partido.local}-${partido.visitante}-${partido.jornada}`), partido)
          .then(() => {
            console.log("Partido agregado a la subcolección 'partidos'");
          })
          .catch((error) => {
            console.error("Error al agregar el partido a la subcolección 'partidos':", error);
          });
      }
  
      // Mueve los equipos hacia arriba en la lista
      equiposList.splice(1, 0, equiposList.pop());
    }
  
    // Actualiza el estado de los partidos
    setPartidos(nuevosPartidos);
  };

    return (
        <div>
          <label>
          Número de equipos:
           <input
            type="number"
            min="6"
            max="15"
            value={numEquipos}
            onChange={handleNumEquiposChange}
          />
          </label>
          {equipos.map((equipo, index) => (
            <div key={index}>
              <label>
                Equipo {index + 1}:
                <input
                  type="text"
                  value={equipo}
                  onChange={(event) => handleEquipoChange(index, event.target.value)}
                />
              </label>
            </div>
          ))}
          <button onClick={handleGenerarCalendario}>Generar calendario</button>
          {/* Renderiza los partidos */}
          <h2>Partidos</h2>
          {partidos.map((partido, index) => (
            <div key={index}>
              <p>Jornada {partido.jornada}: {partido.local} vs {partido.visitante}</p>
            </div>
          ))}
        </div>
        
      );
  }
    
 
export default RoundRobin;