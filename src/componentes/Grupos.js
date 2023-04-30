import React from 'react';
import { Helmet } from 'react-helmet';
import {useState} from 'react';
import {getFirestore, collection, addDoc,query,where, getDocs, doc,setDoc } from 'firebase/firestore';
import {firebaseApp} from "../firebase/firebaseConfig";
import {Formulario, Label, GrupoInput, ContenedorBotonCentrado, Boton, Input } from '../elementos/ElementosFormularioJuegos';
import {Lista,ElementoLista,Nombre } from './../elementos/ElementosListaRoundRobin';
import Alerta from '../elementos/Alerta';

const Grupos = () => {
  const [numEquipos, setNumEquipos] = useState(0);
  const [equipos, setEquipos] = useState([]);
  const [numGrupos, setNumGrupos] = useState(0);
  const [grupos, setGrupos] = useState([]);
  const [nivelAcademico, setNivelAcademico] = useState("");
  const [categoria, setCategoria] = useState("");
  const [escuelas, setEscuelas] = useState([]);
  const[estadoAlerta,cambiarEdoAlerta] = useState(false);
  const[alerta,cambiarAlerta] = useState({});
  const firestore = getFirestore(firebaseApp);

  //Funcion para buscar escuelas disponible para jugar torneo
  const handleBuscarEscuelas = async () => {
    try {
      const firestore = getFirestore(firebaseApp);
      const consulta = await getDocs(query(collection(firestore,'escuelas'),where('nivelAcademico','==',nivelAcademico),where('categoria','==',categoria))); 
      
      const escuelas = [];
  
      consulta.forEach((doc) => {
        escuelas.push({ id: doc.id, ...doc.data() });
      });
      console.log("Escuelas encontradas:", escuelas);
      setEscuelas(escuelas);
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
  const handleEquipoChange = (event, index) => {
    const nuevosEquipos = [...equipos];
    nuevosEquipos[index] = event.target.value;
    setEquipos(nuevosEquipos);
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
  const numsEquipos = Array.from({ length: numEquipos }, (_, index) => index + 1);

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
            <img src="https://tinyurl.com/2b2ek3ck"/>
              <center><h2>Grupos</h2></center> 
              <h3><img src="https://tinyurl.com/233pns5r"/></h3>
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
              <Formulario onSubmit={handleCrearCalendario}>
                <div>
                  <Label> Número de Equipos </Label>
                    <GrupoInput>
                      <Input
                        type='text'
                        name='numE'
                        value = {numEquipos}
                        onChange = {handleNumEquiposChange}
                      />
                    </GrupoInput>
                 </div>
                 <div>
                    {equipos.map((equipo,index)=> (
                      <div key={index}>
                        <Label>
                          Equipo {index+1}
                          <Input
                            type="text"
                            value={equipo}
                            onChange={(event) => handleEquipoChange(event, index)} />
                        </Label>
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
                      />
                    </GrupoInput>
                 </div>
                 <ContenedorBotonCentrado>
                <Boton  type = 'submit' onClick={handleCrearCalendario} > Generar Partidos </Boton>  
              </ContenedorBotonCentrado>
              </Formulario>
              <h2>Partidos</h2>
              {grupos.map((grupo) => (
              <div key={grupo.numGrupo}>
                <h2>Grupo {grupo.numGrupo}</h2>
                <ul>
                  {grupo.enfrentamientos.map((enfrentamiento, numEnfrentamiento) => (
                    <li key={numEnfrentamiento}>
                      {enfrentamiento.equipo1} vs. {enfrentamiento.equipo2}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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