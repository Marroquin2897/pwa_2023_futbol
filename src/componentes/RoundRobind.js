import {useState,useEffect} from 'react';
import { Helmet } from 'react-helmet';
import {Formulario, Label, GrupoInput, ContenedorBotonCentrado, Boton, Input } from '../elementos/ElementosFormulario';
import {firebaseApp} from "../firebase/firebaseConfig";
import {getFirestore, collection, addDoc,query,where, getDocs,onSnapshot, doc } from 'firebase/firestore';
import {Lista,ElementoLista,ContenedorBotonCentral,ContenedorBotones,BotonAccion,Nombre,BotonCargarMas,
  ContenedorSubtitulo,
  Subtitulo} from './../elementos/ElementosListaRoundRobin';

const RoundRobin = () => {
    
    const [escuelas, setEscuelas] = useState([]);
    const [categoria, setCategoria] = useState(""); // Estado para almacenar la categoría seleccionada en el formulario
    const [nivelAcademico, setNivelAcademico] = useState("");
    const [numEquipos, setNumEquipos] = useState("");
    const [enfrentamientos, setEnfrentamientos] = useState([]);


      const handleChangeNumEquipos = (e) => {
        setNumEquipos(e.target.value);
      };

      const generarEnfrentamientos = (numEquipos) => {
        if (numEquipos % 2 !== 0) {
          // Si el número de equipos es impar, agregamos un equipo ficticio para hacerlo par
          numEquipos += 1;
        }
      
        const numJornadas = numEquipos - 1;
        const numPartidosPorJornada = numEquipos / 2;
      
        const enfrentamientos = [];
      
        for (let jornada = 0; jornada < numJornadas; jornada++) {
          const partidosJornada = [];
          for (let i = 0; i < numPartidosPorJornada; i++) {
            const equipoLocal = (jornada + i) % (numEquipos - 1);
            const equipoVisitante = (numEquipos - 1 - i + jornada) % (numEquipos - 1);
            // Ignoramos el equipo ficticio si es impar
            if (equipoLocal === numEquipos - 1) {
              continue;
            }
            if (equipoVisitante === numEquipos - 1) {
              continue;
            }
            partidosJornada.push({ equipoLocal, equipoVisitante });
          }
          enfrentamientos.push(partidosJornada);
        }
      
        return enfrentamientos;
      };
      // Función para obtener los enfrentamientos desde Firestore de acuerdo al número de equipos ingresado por el usuario
      const obtenerEnfrentamientos = async (numEquipos) => {
        try {
          const db = getFirestore(firebaseApp);
          const partidosRef = collection(db, 'partidos');
          const partidosQuery = query(partidosRef, where('numEquipos', '==', numEquipos));
          const partidosSnapshot = await getDocs(partidosQuery);
          const enfrentamientosFirestore = partidosSnapshot.docs.map(doc => doc.data());
          setEnfrentamientos(enfrentamientosFirestore);
        } catch (error) {
          console.error('Error al obtener los enfrentamientos:', error);
        }
      };
      useEffect(() => {
        const fetchData = async () => { //Para seleccionar la categoria y el nivel academico 
          try {
            const firestore = getFirestore(firebaseApp);
            const q = query(collection(firestore, 'escuelas'),
              where('categoria', '==', categoria),
              where('nivelAcademico', '==', nivelAcademico)
            );
            const querySnapshot = await getDocs(q);
            const escuelasData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }));
            setEscuelas(escuelasData);
          } catch (error) {
            console.error('Error al obtener las escuelas:', error);
          }
        };
        fetchData();
        }, [categoria, nivelAcademico]);
      
      useEffect(() => {
        const enfrentamientosGenerados = generarEnfrentamientos(numEquipos);
        setEnfrentamientos(enfrentamientosGenerados);
        obtenerEnfrentamientos(numEquipos);
      }, [numEquipos]);

      const handleGenerarEnfrentamientos = async (e) => {
        e.preventDefault();
        const enfrentamientosGenerados = generarEnfrentamientos(numEquipos);
        setEnfrentamientos(enfrentamientosGenerados);
      };


    return ( 
        <>
        <Helmet>
            <title>Round Robin</title>
        </Helmet>
        <h1> Round Robin</h1>
        <main>
        <Formulario>
            <div>
                <Label htmlFor='rama'> Selecciona la categoria </Label>
                  <GrupoInput>
                      <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>    
                        <option value="femenil"> Femenil </option>
                        <option value="varonil"> Varonil </option>
                            
                      </select> 
                  </GrupoInput>   
            </div>
            <div>
                <Label htmlFor='rama'> Selecciona el Nivel Académico: </Label>
                  <GrupoInput>
                      <select value={nivelAcademico} onChange={(e) => setNivelAcademico(e.target.value)}>    
                        <option value="Superior"> Superior </option>
                        <option value="Media Superior"> Media Superior </option>
                            
                      </select> 
                  </GrupoInput>   
            </div>
            <div>
                <Label htmlFor='rama'> Ingresa Numero de Equipos (Mínimo 6 equipos, Máximo 15 equipos): </Label>
                  <GrupoInput>
                  <Input
						        type='text'
						        name='numE'
                    value = {numEquipos}
                    onChange = {handleChangeNumEquipos}
					        /> 
                  </GrupoInput>   
            </div>
            
            <div>
                <Label htmlFor='rama'> Selecciona Rival </Label>
                  <GrupoInput>
                      <select>    
                        {escuelas.map((escuela) => (   
                          <option key={escuela.id} value={escuela.id}>
                          {escuela.escuela}   
                          </option>
                        ))}
                      </select> 
                  </GrupoInput>   
            </div>
            <ContenedorBotonCentrado>
                <Boton  type = 'submit' onClick={handleGenerarEnfrentamientos}> Generar partidos </Boton>  
                </ContenedorBotonCentrado>
                <Lista>
                  {enfrentamientos.map((jornada, index) => (
                    <ElementoLista key={index}>
                      <h2>Jornada {index + 1}</h2>
                      {jornada.map((partido, index) => (
                        <div key={index}>
                          <Nombre>
                            {escuelas[partido.equipoLocal].escuela} vs{' '}
                            {escuelas[partido.equipoVisitante].escuela}
                          </Nombre>
                        </div>
                      ))}
                    </ElementoLista>
                  ))}
                </Lista>
        </Formulario>
        </main>
       
        
        </>
     );
}
 
export default RoundRobin;