import React from 'react';
import { Helmet } from 'react-helmet';
import {useState} from 'react';
import {getFirestore, collection,query,where, getDocs, doc,setDoc } from 'firebase/firestore';
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
  const [modalidadTorneo, setModalidadTorneo] = useState("");
  const[estadoAlerta,cambiarEdoAlerta] = useState(false);
  const[alerta,cambiarAlerta] = useState({});
  const firestore = getFirestore(firebaseApp);
  const [disponible, setDisponible] = useState(false);
  const [arrayLleno, setArrayLleno] = useState(false); 
  const nameUsuario = sessionStorage.getItem("name")
  //Funcion para buscar escuelas disponible para jugar torneo
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
      if(escuelas.length >= 6){
        setDisponible(true)
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
  };

  // Función para manejar el cambio en el número de equipos
  const handleNumEquiposChange = (event) => {
    const numEquipos = parseInt(event.target.value);
    setNumEquipos(numEquipos);

    // Inicializa el estado de los equipos con un arreglo vacío con la longitud del número de equipos
    setEquipos(Array.from({ length: numEquipos }, () => ''));
  };
  // Función para manejar el cambio en el nombre de un equipo
  const handleEquipoChange = (index,nombre) => {
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
    if(nuevosEquipos.some((elemento) => elemento.trim().length === 0) ){
      console.log("valor del arrayLleno", arrayLleno)
      const equipoId = nuevosEquipos.findIndex((elemento) => elemento.includes(''))
      if(equipoId > 0){
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
    const numGrupos = parseInt(event.target.value);
    setNumGrupos(numGrupos);
  };

  // Función para crear los grupos y enfrentamientos
  const handleCrearCalendario = (e) => {
    e.preventDefault();
    const partidosRef = collection(firestore, 'partidos');
    const grupos = dividirEnGrupos(equipos, numGrupos);

  // Crea los enfrentamientos para cada grupo
  grupos.forEach((grupo, numGrupo) => {
    const enfrentamientos = crearEnfrentamientos(grupo);

    // Guarda los partidos en la colección de partidos
    enfrentamientos.forEach((enfrentamiento, numEnfrentamiento) => {
      const idGrupo = numGrupo + 1; // Agrega la variable idGrupo
      const idPartido = `grupo${idGrupo}-partido${numEnfrentamiento + 1}`;
      const partidoDocRef = doc(partidosRef,idPartido);
      setDoc(partidoDocRef,{
        equipo1: enfrentamiento.equipo1,
        equipo2: enfrentamiento.equipo2,
        idGrupo,
        categoria,
        modalidadTorneo,
        nivelAcademico
      })
      .then(()=> {
        cambiarEdoAlerta(true);
        cambiarAlerta({
          tipo:'exito',
          mensaje: 'Enfrentamientos Guardados Exitosamente'
        });
      })
      .catch((error) => {
        cambiarEdoAlerta(true);
        cambiarAlerta({
          tipo:'error',
          mensaje: 'Error al Guardar Enfrentamientos'
        });
      })
    });

    // Actualiza el estado de los grupos creados
    setGrupos((gruposAnteriores) => [
      ...gruposAnteriores,
      {
        numGrupo: numGrupo + 1, // Agrega la variable numGrupo
        enfrentamientos,
      },
    ]);
  });
  setMostrarPartidos(true);
  };
      // Función para dividir los equipos en grupos
    function dividirEnGrupos(equipos, numGrupos) {
      const grupos = Array.from({ length: numGrupos }, () => []);

      equipos.forEach((equipo, index) => {
        const numGrupo = index % numGrupos;
        grupos[numGrupo].push(equipo);
      });
      return grupos;
    }
    // Función para crear los enfrentamientos dentro de un grupo
function crearEnfrentamientos(equipos) {
  const numEquipos = equipos.length;
  const enfrentamientos = [];

  // Crea un arreglo con los números de equipo
  //const numsEquipos = Array.from({ length: numEquipos }, (_, index) => index + 1);

  // Crea los enfrentamientos para cada jornada
  for (let i = 0; i < numEquipos - 1; i++) {
    const jornada = [];
    for (let j = 0; j < numEquipos / 2; j++) {
      const equipo1 = equipos[j];
      const equipo2 = equipos[numEquipos - 1 - j];
      jornada.push({ equipo1, equipo2 });
    }
    enfrentamientos.push(jornada);

    // Rota los equipos para la siguiente jornada
    equipos.splice(1, 0, equipos.pop());
  }

  return enfrentamientos.flat();
  
}
    return ( 
        <div className="hero">
            <nav>
            <img src="https://tinyurl.com/2obtocwe" alt=""/>
              <center><h2>Grupos</h2>
              <h3>{nameUsuario}</h3>
              </center> 
              <h3><img src="https://tinyurl.com/2kaldmbh" alt=""/></h3>
            </nav>
            <Helmet>
                <title> Grupos </title>
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
                            <option value="Media Superior"> Nivel Media Superior </option>
                            <option value="Superior"> Nivel Superior </option> 
                        </select> 
                    </GrupoInput>   
                </div>
                <div>
                    <Label htmlFor='modalidad'> Selecciona la modalidad a jugar </Label>
                    <GrupoInput>
                        <select name="modalidad" value={modalidadTorneo} onChange = {(e) => setModalidadTorneo(e.target.value)}>
                            <option value="Fútbol Rapido"> Fútbol Rápido</option>
                            <option value="Fútbol 7"> Fútbol 7 </option>
                            <option value="Fútbol Asociacion"> Fútbol Asociación</option> 
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
              <Formulario onSubmit={handleCrearCalendario}>
                <div>
                  <Label> Número de Equipos </Label>
                    <GrupoInput>
                      <Input
                        type='text'
                        name='numE'
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
                      <select name="idEscuela" onChange = {(event) => handleEquipoChange( index,event.target.value)}>
                            <option value="opcionPredeterminada">Elige una escuela </option>
                      {escuelas.map((escuela) => (

                            <option key={escuela.id} value={escuela ? escuela.escuela : "No Existe"}> {escuela.escuela}  </option>
                     ))} 
                     </select> 
                      </GrupoInput>        
                    </div>
                  ))}
                </div>  
  
                 <div>
                  <Label> Número de Grupos: </Label>
                    <GrupoInput>
                      <Input
                        type='text'
                        name='numE'
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
              </Formulario>
             
              {mostrarPartidos && (
                <>
                  <Label>
                    <h2>Partidos</h2>
                  </Label>
                  {grupos.map((grupo) => (
                    <div key={grupo.numGrupo}>
                      <Label> Grupo {grupo.numGrupo} </Label>       
                      <ul>
                        {grupo.enfrentamientos.map((enfrentamiento, numEnfrentamiento) => (
                          <li key={numEnfrentamiento}>
                           <Label> <span> {enfrentamiento.equipo1} </span> VS <span>{enfrentamiento.equipo2} </span> </Label> 
                          </li>
                        ))}
                      </ul>
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