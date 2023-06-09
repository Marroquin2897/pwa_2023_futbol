import {useState} from 'react';
import { Helmet } from 'react-helmet';
import {Formulario, Label, GrupoInput, ContenedorBotonCentrado, Boton, Input } from '../elementos/ElementosFormularioJuegos';
import {firebaseApp} from "../firebase/firebaseConfig";
import {getFirestore, collection, addDoc,query,where, getDocs, doc,setDoc } from 'firebase/firestore';
import BtnRegresar from '../elementos/BtnRegresar';
import Alerta from '../elementos/Alerta';
import { element } from 'prop-types';

const RoundRobin = () => {
  const nameUsuario = sessionStorage.getItem("name")
  const [numEquipos, setNumEquipos] = useState(0);
  const [equipos, setEquipos] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [nivelAcademico, setNivelAcademico] = useState("");
  const [categoria, setCategoria] = useState("");
  const [escuelas, setEscuelas] = useState([]);
  const [mostrarPartidos, setMostrarPartidos] = useState(false); 
  const firestore = getFirestore(firebaseApp);
  const [modalidadTorneo, setModalidadTorneo] = useState("");
  const[estadoAlerta,cambiarEdoAlerta] = useState(false);
  const[alerta,cambiarAlerta] = useState({});
  const [disponible, setDisponible] = useState(false);
  const [arrayLleno, setArrayLleno] = useState(false);
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
    if (nuevosEquipos.some((elemento) => elemento.includes(nombre))) {
      console.log('El nombre ya ha sido seleccionado previamente.');
      cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'El nombre ya ha sido seleccionado previamente.'
            });
    } else {    
            nuevosEquipos[index] = nombre;
            console.log("array esta formado por ",nuevosEquipos)
            setEquipos(nuevosEquipos);         
    }
    if(nuevosEquipos.some((elemento) => elemento.includes('Equipo')) || nuevosEquipos.some((elemento) => elemento.includes('opcionPredeterminada'))){
      const equipoId = nuevosEquipos.findIndex((elemento) => elemento.includes('Equipo'))
      const equipoOpc = nuevosEquipos.findIndex((elemento) => elemento.includes('opcionPredeterminada'))
      if(equipoId > 0){
        console.log('Debes elegir una escuela en: ',equipoId+1);
        cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:`Debes elegir una escuela en el Equipo "${equipoId+1}"`
            });
      }else {
        console.log('Debes elegir una escuela en: ',equipoOpc+1);
        cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:`Debes elegir una escuela en el Equipo "${equipoOpc+1}"`
            });
      }
      
      setArrayLleno(false)
    }else{
      setDisponible(true)
      setArrayLleno(true)
    }
  };

  async function generarPartidosImpar(equipos,categoria,nivelAcademico,modalidadTorneo){
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
          nivelAcademico: nivelAcademico,
          modalidadTorneo: modalidadTorneo
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
  function handleGenerarCalendario (numEquipos,categoria,nivelAcademico,modalidadTorneo)  {
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
          nivelAcademico: nivelAcademico,
          modalidadTorneo: modalidadTorneo
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
      
      const consultaSuperior = query(escuelasSuperiorRef, where("nivelAcademico", "==", nivelAcademico), where("categoria", "==", categoria),where("modalidades", "==", modalidadTorneo));
      const consultaMediaSuperior = query(escuelasMediaSuperiorRef, where("nivelAcademico", "==", nivelAcademico), where("categoria", "==", categoria),where("modalidades", "==", modalidadTorneo));
  
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
      cambiarEdoAlerta(true); 
      if(escuelas.length >= 6){
        setDisponible(true)
        cambiarAlerta({
            tipo: 'exito',
            mensaje:`Se encontraron ${escuelas.length} escuelas`
        });
      } else if(escuelas.length >= 1 && escuelas.length < 6){
        setDisponible(false)
        cambiarAlerta({
          tipo: 'error',
          mensaje:'El número de escuelas encontradas es menor a 6'
        });
      } else {
        setDisponible(false)
          setEscuelas([]);
          cambiarAlerta({
            tipo: 'error',
            mensaje:'No se encontraron escuelas'
          });
      }
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

  const handleGenerateMatches = async (e) => {
    e.preventDefault();
    // Verificar si ya existen partidos con los mismos criterios de búsqueda
    const partidosQuery = query(
      collection(firestore, 'partidos'),
      where('modalidadTorneo', '==', modalidadTorneo),
      where('nivelAcademico', '==', nivelAcademico),
      where('categoria', '==', categoria)
    );

    const partidosSnapshot =  await getDocs(partidosQuery);

    if (!partidosSnapshot.empty) {
      cambiarEdoAlerta(true);
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'Ya hay partidos para esta categoría, nivel académico y modalidad'
      });
      return;
    }
    if (numEquipos % 2 === 0) {
      handleGenerarCalendario(numEquipos,categoria,nivelAcademico,modalidadTorneo);
    } else {
      generarPartidosImpar(equipos,categoria,nivelAcademico,modalidadTorneo);
    }
    setMostrarPartidos(true);
  };
    return (
        <div className="hero">  
            <nav>
            <img src="https://tinyurl.com/2obtocwe" alt=""/>
              <center><h2>Round Robin</h2>
              <h3>{nameUsuario}</h3></center> 
              <h3><img src="https://tinyurl.com/2kaldmbh" alt=""/></h3>
            </nav>
            <Helmet>
                <title> Round Robin </title>
            </Helmet>
            <main>
              <div>
                <div>
                    <Label htmlFor='rama'> Selecciona la categoría a jugar </Label>
                    <GrupoInput>
                        <select name="rama" value={categoria}onChange = {(e) => setCategoria(e.target.value)}>
                            <option value="opcDeter">Elige la categoría</option>
                            <option value="Femenil"> Femenil </option>
                            <option value="Varonil"> Varonil </option>
                        </select> 
                    </GrupoInput>   
                </div>
                <div>
                    <Label htmlFor='nivelA'> Selecciona el nivel académico a jugar </Label>
                    <GrupoInput>
                        <select name="nivelA" value={nivelAcademico} onChange = {(e) => setNivelAcademico(e.target.value)}>
                            <option value="opcDeter">Elige el nivel académico</option>
                            <option value="Media Superior"> Media Superior </option>
                            <option value="Superior"> Superior </option> 
                        </select> 
                    </GrupoInput>   
                </div>
                <div>
                    <Label htmlFor='modalidad'> Selecciona la modalidad a jugar </Label>
                    <GrupoInput>
                        <select name="modalidad" value={modalidadTorneo} onChange = {(e) => setModalidadTorneo(e.target.value)}>
                            <option value="opcDeter">Elige la modalidad</option>
                            <option value="Fútbol Rápido"> Fútbol Rápido</option>
                            <option value="Fútbol 7"> Fútbol 7 </option>
                            <option value="Fútbol Asociación"> Fútbol Asociación</option> 
                        </select> 
                    </GrupoInput>   
                </div>
                <br/>
                <div>
                <ContenedorBotonCentrado>
                <Boton  onClick={handleBuscarEscuelas}  > Escuelas Disponibles </Boton>  
                </ContenedorBotonCentrado>
                
                </div>
              </div>
              <Formulario type="submit" onSubmit={handleGenerateMatches}>
                <div>
                <Label> Número de Equipos </Label>
                  <GrupoInput>
                    <Input
                      type='number'
                      name='numE'
                      min="6"
                      max="15"
                      value = {numEquipos}
                      onChange = {handleNumEquiposChange}
                      disabled = {disponible ? false : true}
                    />
                  </GrupoInput>
                </div>
                <div>
                    {equipos.map((equipo, index) => (
                    <div key={index}>
                      <Label htmlFor='escuelasDisponibles'> Equipo {index + 1}: </Label>
                      <GrupoInput>
                      <select name="idEscuela" onChange = {(event) => handleEquipoChange(index, event.target.value)}>
                            <option value="opcionPredeterminada">Elige una escuela </option>
                      {escuelas.map((escuela) => (

                            <option key={escuela.id} value={escuela ? escuela.escuela : "No Existe"}> {escuela.escuela}  </option>
                            
                     ))} 
                     
                     </select> 
                      </GrupoInput>        
                    </div>
                  ))}
                </div>   
              <ContenedorBotonCentrado>
              <Boton type="submit" onClick={handleGenerateMatches} disabled = {disponible && arrayLleno ? false : true}> Generar Partidos</Boton>
              </ContenedorBotonCentrado>
              </Formulario>
              <br/>
              {mostrarPartidos && (
                <div>
                  <Label>
                    <h2>Partidos</h2>
                  </Label>
                  <ul>
                    {partidos.map((jornada, index) => (
                      <li key={index}>
                        <Label>
                          Jornada {index + 1}
                        </Label>             
                        <ul>
                          {jornada.map((partido, index) => (
                            <li key={index}>
                              <Label> <span> {partido.local}   </span> VS <span> {partido.visitante} </span>
                              </Label> 
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <ContenedorBotonCentrado>
              <BtnRegresar ruta = '/menu-admin'/>
              </ContenedorBotonCentrado>
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