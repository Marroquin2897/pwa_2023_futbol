import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { firebaseApp } from '../firebase/firebaseConfig';
import { Helmet } from 'react-helmet';
import {Label, GrupoInput, ContenedorBotonCentrado, Boton, Input } from '../elementos/ElementosFormularioJuegos';
import BtnRegresar from '../elementos/BtnRegresar';
import Alerta from '../elementos/Alerta';

const PartidosFemenilSuperiorFA = () => {
  const [partidos, setPartidos] = useState([]);
  const [jornada, setJornada] = useState('');
  const firestore = getFirestore(firebaseApp);
  const[estadoAlerta,cambiarEdoAlerta] = useState(false);
  const[alerta,cambiarAlerta] = useState({});
  const [mostrarMensaje, setMostrarMensaje] = useState(null);
  const nameUsuario = sessionStorage.getItem("name")

  // Función para obtener los partidos de la jornada seleccionada
  const obtenerPartidos = async () => {
    try {
      const partidosRef = collection(firestore, 'partidos');
      const q = query(partidosRef,
        where('categoria', '==', 'Femenil'),
        where('nivelAcademico', '==', 'Superior'),
        where('modalidadTorneo', '==', 'Fútbol Asociación'),
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

  const handleMostrarPartidos = () => {
    if (jornada !== '') {
      obtenerPartidos();
    }
  };

  return (
    <div className="hero">
      <nav>
        <img src="https://tinyurl.com/2obtocwe" alt="" />
        <center>
          <h2>Partidos Fútbol Asociación Femenil Nivel Superior</h2>
          <h3>{nameUsuario}</h3>
        </center>
        <h3>
          <img src="https://tinyurl.com/2kaldmbh" alt="" />
        </h3>
      </nav>
      <Helmet>
        <title>Partidos Fútbol Asociación Femenil Nivel Superior</title>
      </Helmet>
      <main>
        <Label htmlFor="jornada">Ingrese el Número de la Jornada:</Label>
        <GrupoInput>
        <Input type="text" id="jornada" value={jornada} onChange={e => setJornada(e.target.value)} />
        </GrupoInput>
        <br/>
        <ContenedorBotonCentrado>
          <Boton onClick={handleMostrarPartidos}> Mostrar partidos </Boton>
        </ContenedorBotonCentrado>
        {jornada !== '' && mostrarMensaje !== null && partidos.length > 0 && (
          <div>
            <Label>
              Jornada {jornada}
            </Label>
            <ul>
              {partidos.map((partido) => (
                <li key={partido.id}>
                  <Label>
                    {partido.local} VS {partido.visitante}
                  </Label>
                </li>
              ))}
            </ul>
          </div>
        )}

        {jornada !== '' && mostrarMensaje !== null && partidos.length === 0 && (
          <p>No hay partidos para mostrar</p>
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
export default PartidosFemenilSuperiorFA;
