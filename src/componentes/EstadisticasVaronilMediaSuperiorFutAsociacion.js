import React from 'react';
import { useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { getFirestore,collection, getDocs, setDoc,doc } from 'firebase/firestore';
import { firebaseApp } from '../firebase/firebaseConfig';
import { ContenedorBotonCentrado } from '../elementos/ElementosFormularioJuegos';
import BtnRegresar from '../elementos/BtnRegresar';

const EstadisticasVaronilMediaSuperiorAsociación = () => {
  const nameUsuario = sessionStorage.getItem("name")
    const [estadisticasEquipos, setEstadisticasEquipos] = useState([]);
    const firestore = getFirestore(firebaseApp); 

    useEffect(() => {
        const fetchEstadisticasEquipos = async () => {
          try {
            const resultadosRef = collection(firestore, 'resultadosVaronilMediaSuperiorAsociacion');
            const querySnapshot = await getDocs(resultadosRef);
    
            const equipos = {};
            querySnapshot.forEach((doc) => {
              const resultado = doc.data();
              const { local, visitante, golesLocal, golesVisitante } = resultado;
    
              if (!equipos[local]) {
                equipos[local] = {
                  equipo: local,
                  juegosJugados: 0,
                  juegosGanados: 0,
                  juegosPerdidos: 0,
                  juegosGanadosPenales: 0,
                  juegosPerdidosPenales: 0,
                  golesAFavor: 0,
                  golesEnContra: 0,
                  diferenciaGoles: 0,
                  puntos: 0,
                  posicion: 0,
                };
              }
    
              if (!equipos[visitante]) {
                equipos[visitante] = {
                  equipo: visitante,
                  juegosJugados: 0,
                  juegosGanados: 0,
                  juegosPerdidos: 0,
                  juegosGanadosPenales: 0,
                  juegosPerdidosPenales: 0,
                  golesAFavor: 0,
                  golesEnContra: 0,
                  diferenciaGoles: 0,
                  puntos: 0,
                  posicion: 0,
                };
              }
    
              equipos[local].juegosJugados += 1;
              equipos[visitante].juegosJugados += 1;
    
              equipos[local].golesAFavor += parseInt(golesLocal, 10);
              equipos[local].golesEnContra += parseInt(golesVisitante, 10);
    
              equipos[visitante].golesAFavor += parseInt(golesVisitante, 10);
              equipos[visitante].golesEnContra += parseInt(golesLocal, 10);
    
              if (golesLocal > golesVisitante) {
                equipos[local].juegosGanados += 1;
                equipos[local].puntos += 3;
                equipos[visitante].juegosPerdidos += 1;
                equipos[visitante].puntos += 0;
              } else if (golesLocal < golesVisitante) {
                equipos[local].juegosPerdidos += 1;
                equipos[local].puntos += 0;
                equipos[visitante].juegosGanados += 1;
                equipos[visitante].puntos += 3;
              } else {
                equipos[local].puntos += 1;
                equipos[visitante].puntos += 1;
              }
    
              equipos[local].diferenciaGoles = equipos[local].golesAFavor - equipos[local].golesEnContra;
              equipos[visitante].diferenciaGoles = equipos[visitante].golesAFavor - equipos[visitante].golesEnContra;
            });
    
            const equiposArray = Object.values(equipos);
            equiposArray.sort((a, b) => {
              if (a.puntos > b.puntos) {
                return -1;
              } else if (a.puntos < b.puntos) {
                return 1;
              } else {
                if (a.diferenciaGoles > b.diferenciaGoles) {
                  return -1;
                } else if (a.diferenciaGoles < b.diferenciaGoles) {
                  return 1;
                } else {
                  return 0;
                }
              }
            });
    
            equiposArray.forEach((equipo, index) => {
              equipo.posicion = index + 1;
            });
    
            setEstadisticasEquipos(equiposArray);
    
            // Guardar estadísticas en la colección "tablaposicionesFemenilSuperior"
            equiposArray.forEach(async (equipo) => {
              const docRef = doc(firestore, 'tablaposicionesVaronilMediaSuperiorFutAsociacion', equipo.equipo);
              const data = {
                equipo: equipo.equipo,
                juegosJugados: equipo.juegosJugados,
                juegosGanados: equipo.juegosGanados,
                juegosPerdidos: equipo.juegosPerdidos,
                juegosGanadosPenales: equipo.juegosGanadosPenales,
                juegosPerdidosPenales: equipo.juegosPerdidosPenales,
                golesAFavor: equipo.golesAFavor,
                golesEnContra: equipo.golesEnContra,
                diferenciaGoles: equipo.diferenciaGoles,
                puntos: equipo.puntos,
                posicion: equipo.posicion,
              };
    
              await setDoc(docRef, data);
            });
          } catch (error) {
            console.error('Error al obtener la tabla de posiciones de los equipos:', error);
          }
        };
    
        fetchEstadisticasEquipos();
      }, []);


    return ( 
        <div className='hero'>
            <nav>
            <img src="https://tinyurl.com/2obtocwe" alt=''/>
              <center><h2> Tabla General de Posiciones Fútbol Asociación Varonil Nivel Media Superior </h2>
              <h3>{nameUsuario}</h3>
              </center> 
            <h3><img src="https://tinyurl.com/2kaldmbh" alt=''/></h3>
            </nav>
            <Helmet>
                <title> Tabla General de Posiciones Fútbol Asociación Varonil Nivel Media Superior</title>
            </Helmet>
            <table className='TablaGeneralPos'>
            <thead>
            <tr>
                <th className='encabezado'>Posición</th>
                <th className='encabezado'>Equipo</th>
                <th className='encabezado'>Juegos Jugados</th>
                <th className='encabezado'>Juegos Ganados</th>
                <th className='encabezado'>Juegos Perdidos</th>
                <th className='encabezado'>Goles a Favor</th>
                <th className='encabezado'>Goles en Contra</th>
                <th className='encabezado'>Diferencia de Goles</th>
                <th className='encabezado'>Puntos</th>
            </tr>
            </thead>
            <tbody>
            {estadisticasEquipos.map((equipo) => (
                <tr key={equipo.equipo}>
                <td className='descripcion'>{equipo.posicion}</td>
                <td className='descripcion'>{equipo.equipo}</td>
                <td className='descripcion'>{equipo.juegosJugados}</td>
                <td className='descripcion'>{equipo.juegosGanados}</td>
                <td className='descripcion'>{equipo.juegosPerdidos}</td>
                <td className='descripcion'>{equipo.golesAFavor}</td>
                <td className='descripcion'>{equipo.golesEnContra}</td>
                <td className='descripcion'>{equipo.diferenciaGoles}</td>
                <td className='descripcion'>{equipo.puntos}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <ContenedorBotonCentrado>
            <BtnRegresar ruta='/rol' />
            </ContenedorBotonCentrado>   
        </div>
     );
}
 
export default EstadisticasVaronilMediaSuperiorAsociación;