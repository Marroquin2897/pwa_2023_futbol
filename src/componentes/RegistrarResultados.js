import React,{useState,useEffect} from 'react';
import { Helmet } from 'react-helmet';
import {firebaseApp} from "../firebase/firebaseConfig";
import {getFirestore, collection, addDoc,query,where, getDocs, doc,setDoc,onSnapshot } from 'firebase/firestore';
import {Formulario, Label, GrupoInput, ContenedorBotonCentrado, Boton, Input } from '../elementos/ElementosFormularioJuegos';

const RegistrarResultados = () => {

  const [resultados, setResultados] = useState([]);
  const [jornada, setJornada] = useState('');
  const [local, setLocal] = useState('');
  const [visitante, setVisitante] = useState('');
  const firestore = getFirestore(firebaseApp);
  const resultadosCollection = collection(firestore, 'resultadosFemenilSuperiorRapido');
  const partidosCollection = collection(firestore, 'partidos');

  useEffect(() => {
    const obtenerResultados = async () => {
      try {
        const consulta = await getDocs(resultadosCollection);
        const resultadosData = [];
        consulta.forEach((doc) => {
          resultadosData.push({ id: doc.id, ...doc.data() });
        });
        setResultados(resultadosData);
      } catch (error) {
        console.error(error);
      }
    };
    obtenerResultados();
  }, []);
  
  const handleGuardarResultado = async (e) => {
    e.preventDefault();
    const resultado = {
      jornada,
      local,
      visitante,
    };
    try {
      await setDoc(doc(resultadosCollection), resultado);
      console.log('Resultado guardado exitosamente.');
    } catch (error) {
      console.error(error);
    }
  };

  const handleObtenerEnfrentamientos = async (e) => {
    e.preventDefault();
    try {
      const consulta = await getDocs(query(partidosCollection, where('jornada', '==', parseInt(jornada))));
      const enfrentamientos = [];
      consulta.forEach((doc) => {
        const enfrentamiento = doc.data();
        enfrentamientos.push(enfrentamiento);
      });
      console.log(`Enfrentamientos de la jornada ${jornada}:`, enfrentamientos);
      // Aquí puedes usar la variable 'enfrentamientos' para renderizar los datos en una tabla
    } catch (error) {
      console.error(error);
    }
  };

    return (  
        <div className="hero">
            <nav>
            <img src="https://tinyurl.com/2b2ek3ck"/>
              <center><h2> Registro de Resultados Fútbol Rápido Femenil Nivel Superior</h2></center> 
              <h3><img src="https://tinyurl.com/233pns5r"/></h3>
            </nav>
            <Helmet>
                <title> Registro de Resultados Fútbol Rápido </title>
            </Helmet>
            <form onSubmit={handleGuardarResultado}>
              <label>
                Jornada:
                <input type="number" value={jornada} onChange={(e) => setJornada(e.target.value)} />
              </label>
              <label>
                Local:
                <input type="text" value={local} onChange={(e) => setLocal(e.target.value)} />
              </label>
              <label>
                Visitante:
                <input type="text" value={visitante} onChange={(e) => setVisitante(e.target.value)} />
              </label>
              <button type="submit">Guardar resultado</button>
            </form>
            <form onSubmit={handleObtenerEnfrentamientos}>
              <label>
                Jornada:
                <input type="number" value={jornada} onChange={(e) => setJornada(e.target.value)} />
              </label>
              <button type="submit">Obtener enfrentamientos</button>
            </form>
        </div>
    );
}
export default RegistrarResultados;