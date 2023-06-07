import React from 'react';
import { Helmet } from 'react-helmet';
import {useState} from 'react';
import {getFirestore, collection,query,where, getDocs, doc,setDoc, addDoc } from 'firebase/firestore';
import {firebaseApp} from "../firebase/firebaseConfig";
import {Formulario, Label, GrupoInput, ContenedorBotonCentrado, Boton, Input } from '../elementos/ElementosFormularioJuegos';
import Alerta from '../elementos/Alerta';
import BtnRegresar from '../elementos/BtnRegresar';
const Grupos = () => {
  const [numEquipos, setNumEquipos] = useState(0);
  const [equipos, setEquipos] = useState([]);
  const [numGrupos, setNumGrupos] = useState(0);
  const [grupos, setGrupos] = useState([]);
  const [nivelAcademico, setNivelAcademico] = useState("");
  const [categoria, setCategoria] = useState("");
  const [escuelas, setEscuelas] = useState([]);
  const [mostrarPartidos, setMostrarPartidos] = useState(false); 
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarSelectEsc, setMostrarSelectEsc] = useState(false);
  const[estadoAlerta,cambiarEdoAlerta] = useState(false);
  const[alerta,cambiarAlerta] = useState({});
  const firestore = getFirestore(firebaseApp);
  const [disponible, setDisponible] = useState(false);
  const [arrayLleno, setArrayLleno] = useState(false); 
  //Funcion para buscar escuelas disponible para jugar torneo
  const handleBuscarEscuelas = async () => {
    setMostrarPartidos(false)
    if(categoria === ""){
      cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Elige una categoría'
            });
    }
    if(nivelAcademico === ""){
      cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Elige el nivelAcadémico'
            });
    }

    if( categoria !== '' && nivelAcademico !== '' ){
      try {
        const firestore = getFirestore(firebaseApp);
        const escuelasSuperiorRef = collection(firestore, "Escuelas Superior");
        const escuelasMediaSuperiorRef = collection(firestore, "Escuelas Media Superior");
        
        const consultaSuperior = query(escuelasSuperiorRef, where("nivelAcademico", "==", nivelAcademico), where("categoria", "==", categoria),where("modalidades", "==", "Fútbol Asociacion"));
        const consultaMediaSuperior = query(escuelasMediaSuperiorRef, where("nivelAcademico", "==", nivelAcademico), where("categoria", "==", categoria),where("modalidades", "==", "Fútbol Asociacion"));
    
        const [resultadoSuperior, resultadoMediaSuperior] = await Promise.all([getDocs(consultaSuperior), getDocs(consultaMediaSuperior)]);
        
        const escuelas = [];
    
        resultadoSuperior.forEach((doc) => {
          escuelas.push({ id: doc.id, ...doc.data() });
        });
    
        resultadoMediaSuperior.forEach((doc) => {
          escuelas.push({ id: doc.id, ...doc.data() });
        });
        console.log(categoria, nivelAcademico)
        console.log("Escuelas encontradas:", escuelas);
        setEscuelas(escuelas);
        setGrupos([]);
        cambiarEdoAlerta(true); 
        if(escuelas.length >= 6){
          setDisponible(true)
              cambiarAlerta({
                  tipo: 'exito',
                  mensaje:`Se encontraron ${escuelas.length} escuelas`
              });
        }else if(escuelas.length >= 1 && escuelas.length < 6){
          setDisponible(false)
          cambiarAlerta({
            tipo: 'error',
            mensaje:'El número de escuelas encontradas es menor a 6'
          });
        }else{
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
                  mensaje:'No hay escuelas para esta categoria y nivel académico'
              });
        console.error(error);
        setEscuelas([]);
      }
    }else{
      cambiarEdoAlerta(true); 
              cambiarAlerta({
                  tipo: 'error',
                  mensaje:'Faltan campos por seleccionar '
              });
    }
    
  };


  // Función para manejar el cambio en el número de equipos 
  const handleNumEquiposChange = (event) => {
    const numEquipos = event.target.value;
    setNumEquipos(numEquipos);
    if(numEquipos<6){
      setMostrarSelectEsc(false)
      cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'El número de equipos debe ser igual o mayor a 6'
            });
    }else if(numEquipos >= 6 && numEquipos <=15 ){
      setMostrarFormulario(true);
      setMostrarSelectEsc(true)
    }else{
      cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'El número de equipos es mayor a 15'
            });
      setMostrarSelectEsc(false)
    }

    

    // Inicializa el estado de los equipos con un arreglo vacío con la longitud del número de equipos
    setEquipos(Array.from({ length: numEquipos }, () => ''));
  }; 

  // Función para manejar el cambio en el nombre de un equipo
  const handleEquipoChange = (index,nombre) => {
    const nuevosEquipos = [...equipos]; //hace una copia del array equipos
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
    if(nuevosEquipos.some((elemento) => elemento.trim().length === 0) ){
      console.log("valor del arrayLleno", arrayLleno)
      const equipoId = nuevosEquipos.findIndex((elemento) => elemento.includes(''))
      const equipoDeter = nuevosEquipos.findIndex((elemento) => elemento.includes('opcionPredeterminada'))
      if(equipoId > 0 || equipoDeter > 0){
        console.log('Debes elegir una escuela en: ',equipoId+1);
        cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:`Elige una escuela en el select "${equipoId+1}"`
            });
      }    
      setArrayLleno(false)
    }else{
      setDisponible(true)
      setArrayLleno(true)
    }
  };

  // Función para manejar el cambio en el número de grupos
 const handleNumGruposChange = (event) => {
    const numGrupos =  event.target.value;
    setNumGrupos(numGrupos);
    if(numGrupos<2){
      cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Deben ser mínimo 2 grupos'
            });
    }else if(numGrupos >= 2 && numGrupos <=3 ){
      setDisponible(true)
    }else{
      cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'El número de equipos es mayor a 3'
            });
    }
  }; 

  // Función para generar partidos equipos Impar
  async function generarPartidosImpar(equipos, numGrupo, categoria,nivelAcademico,modalidadTorneo){
    const nEquipos = equipos.length;
    const nJornadas = nEquipos;
    const nPartidosXJornada = (nEquipos+1)/2;

    const jornadas = []
    for(let i = 0; i < nJornadas; i++){
      const jornada = []
      for(let j = 0; j < nPartidosXJornada; j++){
        const local = (i + j) % nEquipos;
        const visitante = (nEquipos - 1 - j + i) % nEquipos;
        const partido = {
          partido: j + 1,
          jornada: i + 1,
          local: equipos[local],
          visitante: equipos[visitante],
          categoria: categoria,
          nivelAcademico: nivelAcademico,
          grupo: numGrupo + 1
        };
        jornada.push(partido);

        const firestore = getFirestore(firebaseApp);
        // Agrega el partido a la subcolección "partidos"
        setDoc(doc(firestore, "partidos", `Grupo ${partido.grupo}-${partido.local}-${partido.visitante}-${partido.jornada}`), partido)
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
          })
      }
      console.log("jornada",jornada)
      jornadas.push(jornada);
      console.log("jornadasss",jornadas)
    }
    grupos.push(jornadas)
    console.log("gruposss",grupos)
  }

  // Función para generar partidos equipos Par
  function generarPartidosPar (equipos, numGrupo,categoria,nivelAcademico,modalidadTorneo)  {
    const numEquipos = equipos.length
    const numPartidosPorJornada = Math.floor(numEquipos / 2);

    const jornadas = []; //Guarda todas las jornadas del juego correspondiente
    // Itera sobre cada jornada
    for (let j = 0; j < numEquipos - 1; j++) {
      const jornada = []; //Guarda los partidos correspondientes a una sola jornada
      // Itera sobre cada partido en la jornada
      for (let i = 0; i < numPartidosPorJornada; i++) {
        const equipoLocal = equipos[i];
        let equipoVisitante;

        // Si numEquipos es impar y estamos en la última jornada, el equipo extra se enfrenta a "Equipo 0"
        if (numEquipos % 2 !== 0 && j === numEquipos - 2 && i === 0) {
          equipoVisitante = equipos[numEquipos - 1]; 
        } else {
            equipoVisitante = equipos[numEquipos - 1 - i];
          }

        // Crea un objeto con la información del partido
        const partido = {
          partido: i + 1,
          local: equipoLocal,
          visitante: equipoVisitante,
          jornada: j + 1,
          categoria: categoria,
          nivelAcademico: nivelAcademico,
          modalidadTorneo: modalidadTorneo,
          grupo: numGrupo + 1
        };
  
        // Agrega el partido a la lista de partidos
        jornada.push(partido);  
        const firestore = getFirestore(firebaseApp);
        // Agrega el partido a la subcolección "partidos"
        setDoc(doc(firestore, "partidos", `Grupo ${partido.grupo}-${partido.local}-${partido.visitante}-${partido.jornada}`), partido)
          .then(() => {
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'exito',
                mensaje:'Enfrentamientos Guardados Exitosamente'
            });
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
      equipos.splice(1, 0, equipos.pop()); 
      /*
       elimina el último elemento del array equipos y lo agrega en la posición 1 del mismo array 
       sin eliminar ningún otro elemento.  
      */
      jornadas.push(jornada)
    }
    // Guarda las jornadas que jugara cada grupo.
    grupos.push(jornadas)
  };
  // Función para crear los grupos y enfrentamientos
  const handleCrearCalendario = (e) => {
    e.preventDefault();
    if(numGrupos!= "" && numGrupos >= 2){
        const grupos = dividirEnGrupos(equipos, numGrupos);

        // Crea los enfrentamientos para cada grupo
        grupos.forEach((grupo, numGrupo) => {
          if(grupo.length % 2 == 0){
            generarPartidosPar(grupo, numGrupo,categoria,nivelAcademico)
          }else{
            generarPartidosImpar(grupo, numGrupo,categoria, nivelAcademico)
          }
          console.log("este es el grupo ",numGrupo, " contiene ", grupo)    
        });
        setMostrarPartidos(true);
        setDisponible(false);
        setArrayLleno(false);
        setNivelAcademico("")
        setCategoria("")
        setNumGrupos("")
        setNumEquipos("")
        setMostrarSelectEsc(false)
        }else{
            cambiarEdoAlerta(true); 
                  cambiarAlerta({
                      tipo: 'error',
                      mensaje:'Ingresa un número de grupos válido'
                  });
        }
    
  };

  // Función para dividir los equipos en grupos
  function dividirEnGrupos(equipos, numGrupos) {
    const grupos = Array.from({ length: numGrupos }, () => []);

    equipos.forEach((equipo, index) => {
      const numGrupo = index % numGrupos;
      grupos[numGrupo].push(equipo);
    });
    return grupos;
  };

    return ( 
        <div className="hero">
            <nav>
            <img src="https://tinyurl.com/2obtocwe" alt=""/>
              <center><h2>Grupos</h2></center> 
              <h3><img src="https://tinyurl.com/2kaldmbh" alt=""/></h3>
            </nav>
            <Helmet>
                <title> Grupos </title>
            </Helmet>
            <main>
              <div>
                <div>
                    <Label htmlFor='rama'> Selecciona la categoría a jugar </Label>
                    <GrupoInput>
                        <select name="rama" value={categoria} onChange = {(e) => setCategoria(e.target.value)}>
                            <option selected value="opcDeter"> Elige la categoría </option>
                            <option value="femenil"> Femenil </option>
                            <option value="varonil"> Varonil </option>
                        </select> 
                    </GrupoInput>   
                </div>
                <div>
                    <Label htmlFor='nivelA'> Selecciona el nivel académico a jugar </Label>
                    <GrupoInput>
                        <select name="nivelA" value={nivelAcademico} onChange = {(e) => setNivelAcademico(e.target.value)}>
                            <option selected value="opcDeter"> Elige el nivel académico </option>
                            <option selected value="Media Superior"> Nivel Media Superior </option>
                            <option value="Superior"> Nivel Superior </option> 
                        </select> 
                    </GrupoInput>   
                </div>
                {/*<div>
                    <Label htmlFor='modalidad'> Selecciona la modalidad a jugar </Label>
                    <GrupoInput>
                        <select name="modalidad" value={modalidadTorneo} onChange = {(e) => setModalidadTorneo(e.target.value)}>
                            <option selected value="opcDeter"> Elige la modalidad </option>
                            <option selected value="Fútbol Rapido"> Fútbol Rápido</option>
                            <option value="Fútbol 7"> Fútbol 7 </option>
                            <option value="Fútbol Asociacion"> Fútbol Asociación</option> 
                        </select> 
                    </GrupoInput>   
                </div> */}
                
                <br/>
                <div>
                <ContenedorBotonCentrado>
                <Boton  onClick={handleBuscarEscuelas}  > Buscar escuelas </Boton>  
                </ContenedorBotonCentrado>
                </div>
              </div>
              <Formulario onSubmit={handleCrearCalendario}>
                <div>
                  <Label> Número de Equipos </Label>
                    <GrupoInput>
                      <Input
                        type='number'
                        min="6"
                        max="15"
                        name='numEquipos'
                        value = {numEquipos}
                        onChange = {handleNumEquiposChange}
                        disabled = {disponible ? false : true}
                      />
                    </GrupoInput>
                 </div>
                 {mostrarSelectEsc && (
                  <>
                  <div>
                  {equipos.map((equipo, index) => (
                  <div key={index}>
                    <Label htmlFor='escuelasDisponibles'> Equipo {index + 1}: </Label>
                    <GrupoInput>
                    <select name="idEscuela" disabled = {disponible ? false : true} onChange = {(event) => handleEquipoChange( index,event.target.value)}>
                          <option value="opcionPredeterminada">Elige una escuela </option>
                    {escuelas.map((escuela) => (

                          <option key={escuela.id} value={escuela ? escuela.escuela : "No Existe"}> {escuela.escuela}  </option>
                   ))} 
                   </select> 
                    </GrupoInput>        
                  </div>
                ))}
              </div> 
                  {mostrarFormulario && (
                  <>
                    
                 <div>
                  <Label> Número de Grupos: </Label>
                    <GrupoInput>
                      <Input
                        type='number'
                        min = "2"
                        name='numGrupos'
                        value = {numGrupos}
                        onChange = {handleNumGruposChange}
                        disabled = {disponible && arrayLleno ? false : true}
                      />
                    </GrupoInput>
                 </div>
                 <ContenedorBotonCentrado>
                <Boton  type = 'submit' onClick={handleCrearCalendario} disabled = {disponible && arrayLleno ? false : true} > Generar Partidos </Boton> 
                <br/> 
              </ContenedorBotonCentrado>
                  </>


                 )}
                  </>    
                 )}                
              </Formulario>
             
              {mostrarPartidos && (
                <>
                  <Label>
                    <h2>Partidos</h2>
                  </Label>
                  {grupos.map((grupo,index) => (
                    <div key={index}>
                      <Label> Grupo {index + 1} </Label>  
                      {grupo.map((jornada,indexJornada) => ( 
                       <><Label>
                          Jornada {indexJornada + 1}
                        </Label>
                        {jornada.map((partido,indexPartido) => ( 
                          <>
                          <ul>
                            <li key={indexPartido}>
                              <Label> <span> {partido.local}   </span> VS <span> {partido.visitante} </span>
                              </Label>
                            </li>
                          </ul>
                          </>
                        ))}
                        </>
                      ))}                   
                    </div>
                  ))}
                </>
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
export default Grupos;