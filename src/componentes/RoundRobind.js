import {useState,useEffect} from 'react';
import { Helmet } from 'react-helmet';
import {Formulario, Label, GrupoInput, ContenedorBotonCentrado, Boton, Input } from '../elementos/ElementosFormularioJuegos';
import {firebaseApp} from "../firebase/firebaseConfig";
import {getFirestore, collection, addDoc,query,where, getDocs, doc,setDoc } from 'firebase/firestore';
import {Lista,ElementoLista,Nombre } from './../elementos/ElementosListaRoundRobin';
import Alerta from '../elementos/Alerta';

const RoundRobin = () => {
  
  const [numEquipos, setNumEquipos] = useState(0);
  const [equipos, setEquipos] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [nivelAcademico, setNivelAcademico] = useState("");
  const [categoria, setCategoria] = useState("");
  const [escuelas, setEscuelas] = useState([]);
  const firestore = getFirestore(firebaseApp);
  const partidosCollection = collection(firestore, 'partidos');
  const[estadoAlerta,cambiarEdoAlerta] = useState(false);
  const[alerta,cambiarAlerta] = useState({});


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

  async function generarPartidosImpar(equipos,categoria,nivelAcademico){
    const nEquipos = equipos.length;
    const nJornadas = nEquipos;
    const nPartidosXJornada = (nEquipos+1)/2;
    const partidosCollection = collection(firestore, "partidos");

    const jornadas = []
    for(let i = 0; i < nJornadas; i++){
      const jornada = []
      for(let j = 0; j < nPartidosXJornada; j++){
        const local = (i + j) % nEquipos;
        const visitante = (nEquipos - 1 - j + i) % nEquipos;
        const partido = {
          jornada: i + 1,
          local: equipos[local],
          visitante: equipos[visitante],
          categoria: categoria,
          nivelAcademico: nivelAcademico
        };
        jornada.push(partido);

        try {
          const docRef = await addDoc(partidosCollection, partido);
          console.log("Partido guardado con ID: ", docRef.id);
        } catch (error) {
          console.error(error);
        }
      }
      jornadas.push(jornada);
    }
    setPartidos(jornadas);
  }

  // Función para generar partidos equipos Par
  function handleGenerarCalendario (numEquipos,categoria,nivelAcademico)  {
    const nuevosPartidos = [];
    const numPartidosPorJornada = Math.floor(numEquipos / 2);
  
    // Crea una lista de equipos
    const equiposList = equipos.map((equipo, index) => ({nombre: equipo, index }));

    const jornadas = [];
    // Itera sobre cada jornada
    for (let j = 0; j < numEquipos - 1; j++) {
      const jornada = [];
      // Itera sobre cada partido en la jornada
      for (let i = 0; i < numPartidosPorJornada; i++) {
        const equipoLocal = equiposList[i];
        let equipoVisitante;

        // Si numEquipos es impar y estamos en la última jornada, el equipo extra se enfrenta a "Equipo 0"
        if (numEquipos % 2 !== 0 && j === numEquipos - 2 && i === 0) {
          equipoVisitante = equiposList[numEquipos - 1]; 
        } else {
            equipoVisitante = equiposList[numEquipos - 1 - i];
          }

        // Crea un objeto con la información del partido
        const partido = {
          local: equipoLocal.nombre,
          visitante: equipoVisitante.nombre,
          jornada: j + 1,
          categoria: categoria,
          nivelAcademico: nivelAcademico
        };
  
        // Agrega el partido a la lista de partidos
        jornada.push(partido);  
        const firestore = getFirestore(firebaseApp);
        // Agrega el partido a la subcolección "partidos"
        setDoc(doc(firestore, "partidos", `${partido.local}-${partido.visitante}-${partido.jornada}`), partido)
          .then(() => {
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'exito',
                mensaje:'Enfrentamientos Guardados Exitosamente'
            });
            console.log("Partido agregado a la colección 'partidos'");
            console.log(partido);
          })
          .catch((error) => {
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Error al Guardar Enfrentamientos'
            });
            
          });
      }
      // Mueve los equipos hacia arriba en la lista
      equiposList.splice(1, 0, equiposList.pop());
      jornadas.push(jornada)
    }
    // Actualiza el estado de los partidos
    setPartidos(jornadas);
  };
  
  const handleBuscarEscuelas = async () => {
    try {
      const firestore = getFirestore(firebaseApp);
      const escuelasSuperiorRef = collection(firestore, "Escuelas Superior");
      const escuelasMediaSuperiorRef = collection(firestore, "Escuelas Media Superior");
      
      const consultaSuperior = query(escuelasSuperiorRef, where("nivelAcademico", "==", nivelAcademico), where("categoria", "==", categoria));
      const consultaMediaSuperior = query(escuelasMediaSuperiorRef, where("nivelAcademico", "==", nivelAcademico), where("categoria", "==", categoria));
  
      const [resultadoSuperior, resultadoMediaSuperior] = await Promise.all([getDocs(consultaSuperior), getDocs(consultaMediaSuperior)]);
      
      const escuelas = [];
  
      resultadoSuperior.forEach((doc) => {
        escuelas.push({ id: doc.id, ...doc.data() });
      });
  
      resultadoMediaSuperior.forEach((doc) => {
        escuelas.push({ id: doc.id, ...doc.data() });
      });
  
      console.log("Escuelas encontradas:", escuelas);
      setEscuelas(escuelas);
    } catch (error) {
      cambiarEdoAlerta(true); 
      cambiarAlerta({
          tipo: 'error',
          mensaje: 'No hay escuelas para esta categoría y nivel académico'
      });
      console.error(error);
      setEscuelas([]);
    }
  };

  const handleGenerateMatches = (e) => {
    e.preventDefault();
    if (numEquipos % 2 === 0) {
      handleGenerarCalendario(numEquipos,categoria,nivelAcademico);
    } else {
      generarPartidosImpar(equipos,categoria,nivelAcademico);
    }
  };
    return (
        <div className="hero"> 
            <nav>
            <img src="https://tinyurl.com/2b2ek3ck"/>
              <center><h2>Round Robin</h2></center> 
              <h3><img src="https://tinyurl.com/233pns5r"/></h3>
            </nav>
            <Helmet>
                <title> Round Robin </title>
            </Helmet>
            <main>
              <div>
                <div>
                    <Label htmlFor='rama'> Selecciona la rama a jugar </Label>
                    <GrupoInput>
                        <select name="rama" value={categoria}onChange = {(e) => setCategoria(e.target.value)}>
                            <option value="femenil"> Femenil </option>
                            <option value="varonil"> Varonil </option>
                        </select> 
                    </GrupoInput>   
                </div>
                <div>
                    <Label htmlFor='nivelA'> Selecciona el nivel académico a jugar </Label>
                    <GrupoInput>
                        <select name="nivelA" value={nivelAcademico} onChange = {(e) => setNivelAcademico(e.target.value)}>
                            <option value="Media Superior"> Media Superior </option>
                            <option value="Superior"> Superior </option> 
                        </select> 
                    </GrupoInput>   
                </div>
                <div>
                <ContenedorBotonCentrado>
                <Boton  onClick={handleBuscarEscuelas}  > Escuelas Disponibles </Boton>  
                </ContenedorBotonCentrado>
                <Lista>
                {escuelas.map((escuela) => {
                  return(
                    <ElementoLista key={escuela.id}>
                      <Label> Escuela
                        <Nombre>
                            {escuela.escuela}
                        </Nombre>
                        </Label>
                    </ElementoLista>
                  );
                })}
                </Lista>
                </div>
              </div>
              <Formulario type="submit" onSubmit={handleGenerateMatches}>
                <div>
                <Label> Número de Equipos </Label>
                  <GrupoInput>
                    <Input
                      type='text'
                      name='numE'
                      min="6"
                      max="15"
                      value = {numEquipos}
                      onChange = {handleNumEquiposChange}
                    />
                  </GrupoInput>
                </div>
                <div>
                    {equipos.map((equipo, index) => (
                    <div key={index}>
                      <Label>
                        Equipo {index + 1}:
                        <Input
                          type="text"
                          value={equipo}
                          onChange={(event) => handleEquipoChange(index, event.target.value)}
                        />
                      </Label>
                    </div>
                  ))}
                </div>   
              <ContenedorBotonCentrado>
              <Boton type="submit" onClick={handleGenerateMatches} >Generar Partidos</Boton>
              </ContenedorBotonCentrado>
              </Formulario>
              <h2>Partidos</h2>
              <ul>
                {partidos.map((jornada, index) => (
                  <li key={index}>
                    <h3>Jornada {index + 1}</h3>
                    <ul>
                      {jornada.map((partido, index) => (
                        <li key={index}>
                          {partido.local} vs. {partido.visitante}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>

                <Alerta 
                  tipo= {alerta.tipo}
                  mensaje= {alerta.mensaje}
                  estadoAlerta={estadoAlerta}
                  cambiarEdoAlerta={cambiarEdoAlerta}
                />
            </main>  
        </div>   
      );
  }
export default RoundRobin;