import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { firebaseApp } from '../firebase/firebaseConfig';
import { Helmet } from 'react-helmet';
import {Label, GrupoInput, ContenedorBotonCentrado, Boton, Input } from '../elementos/ElementosFormularioJuegos';
import BtnRegresar from '../elementos/BtnRegresar';
import Alerta from '../elementos/Alerta';

const PartidosVaronilMediaSuperiorF7 = () => {
  const [partidos, setPartidos] = useState([]);
  const [jornada, setJornada] = useState('');
  const firestore = getFirestore(firebaseApp);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const[estadoAlerta,cambiarEdoAlerta] = useState(false);
  const[alerta,cambiarAlerta] = useState({});


  // Función para obtener los partidos de la jornada seleccionada
  const obtenerPartidos = async () => {
    try {
      const partidosRef = collection(firestore, 'partidos');
      const q = query(partidosRef,
        where('categoria', '==', 'varonil'),
        where('nivelAcademico', '==', 'Media Superior'),
        where('modalidadTorneo', '==', 'Futbol 7'),
        where('jornada', '==', parseInt(jornada, 10))
      );

      const snapshot = await getDocs(q);

      const partidosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPartidos(partidosData);
      setMostrarMensaje(true);
    } catch (error) {
        cambiarEdoAlerta(true);
        cambiarAlerta({
        tipo: "error",
        mensaje: "Error al obtener los partidos.",
        });
      console.error('Error al obtener los partidos:', error);
    }
  };
  // Actualizar la lista de partidos cuando cambie la jornada seleccionada
  useEffect(() => {
    obtenerPartidos();
  }, [jornada]);

  useEffect(() => {
    console.log(partidos); // Verificar el contenido de partidos
  }, [partidos]);

  return (
    <div className="hero">
      <nav>
        <img src="https://tinyurl.com/2obtocwe" alt="" />
        <center>
          <h2>Partidos Fútbol 7 Varonil Nivel Media Superior</h2>
        </center>
        <h3>
          <img src="https://tinyurl.com/2kaldmbh" alt="" />
        </h3>
      </nav>
      <Helmet>
        <title>Partidos Fútbol 7 Varonil Nivel Media Superior</title>
      </Helmet>
      <main>
        <Label htmlFor="jornada">Seleccione la Jornada:</Label>
        <GrupoInput>
        <Input type="text" id="jornada" value={jornada} onChange={e => setJornada(e.target.value)} />
        </GrupoInput>
        <br/>
        <ContenedorBotonCentrado>
          <Boton onClick={obtenerPartidos}> Mostrar partidos </Boton>
        </ContenedorBotonCentrado>

        {jornada && (
          <Label> <h3>Jornada {jornada}</h3> </Label>
        )}
        {mostrarMensaje && (
          
          <ul>
            {partidos.length > 0 ? (
              partidos.map((partido) => (
                <li key={partido.id}>
                  <Label> {partido.local} VS {partido.visitante} </Label>
                </li>
              ))
            ) : (
              <p>No hay partidos para mostrar</p>
            )}
          </ul>
        )}
        <br/>
        <ContenedorBotonCentrado>
        <BtnRegresar ruta='/rol' />
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
};
export default PartidosVaronilMediaSuperiorF7;