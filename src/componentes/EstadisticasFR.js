import React from 'react';
import { useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { getFirestore,collection, getDocs,addDoc, setDoc,doc } from 'firebase/firestore';
import { firebaseApp } from '../firebase/firebaseConfig';

const EstadisticasFR = () => {
    const nameUsuario = sessionStorage.getItem("name")
    const [estadisticasEquipos, setEstadisticasEquipos] = useState({});
    const firestore = getFirestore(firebaseApp);
    useEffect(() => {
        const fetchEstadisticasEquipos = async () => {
          try {
            const resultadosRef = collection(firestore, 'resultadosFemenilSuperiorRapido');
            const querySnapshot = await getDocs(resultadosRef);
    
            const equipos = {};
            querySnapshot.forEach((doc) => {
              const resultado = doc.data();
              const { local, visitante, golesLocal, golesVisitante, golesPenalesLocal, golesPenalesVisitante } = resultado;
    
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
                if (golesPenalesLocal > golesPenalesVisitante) {
                  equipos[local].juegosGanadosPenales += 1;
                  equipos[local].puntos += 2;
                  equipos[local].golesAFavor += 1;
                  equipos[visitante].juegosPerdidosPenales += 1;
                  equipos[visitante].puntos += 1;
                } else {
                  equipos[visitante].juegosGanadosPenales += 1;
                  equipos[visitante].puntos += 2;
                  equipos[visitante].golesAFavor += 1;
                  equipos[local].juegosPerdidosPenales += 1;
                  equipos[local].puntos += 1;
                }
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
                // Guardar estadísticas en la colección "tablaposicionesFRFemenilSuperior"
                equiposArray.forEach(async (equipo) => {
                  const docRef = doc(firestore, 'tablaposicionesFRFemenilSuperior', equipo.equipo);
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
                console.error('Error al obtener las estadísticas de los equipos:', error);
            }
            };
            fetchEstadisticasEquipos();
            }, []);
           
    return (  
        <div className="hero">
            <nav>
            <img src="https://tinyurl.com/2b2ek3ck"/>
              <center><h2> Tabla General de Posiciones Fútbol Rápido Femenil Nivel Superior </h2><h2>{nameUsuario}</h2></center> 
            <h3><img src="https://tinyurl.com/233pns5r"/></h3>
            </nav>
            <Helmet>
                <title> Tabla General de Posiciones Fútbol Rápido Femenil Nivel Superior</title>
            </Helmet>
            <div>
            <h2>Tabla General de Posiciones</h2>
            <h2>Tabla de Posiciones</h2>
            <table>
				        <thead>
                    <tr>
                        <th>Equipo</th>
                        <th>Juegos Jugados</th>
                        <th>Juegos Ganados</th>
                        <th>Juegos Perdidos</th>
                        <th>Juegos Ganados Penales</th>
                        <th>Juegos Perdidos Penales</th>
                        <th>Goles a Favor</th>
                        <th>Goles en Contra</th>
                        <th>Diferencia de Goles</th>
                        <th>Puntos</th>
                        <th>Posición</th>
                    </tr>
				        </thead>
                <tbody>
                {Array.isArray(estadisticasEquipos) && estadisticasEquipos.map((equipo, index) => (
                <tr key={equipo.equipo}>
                        <td>{equipo.equipo}</td>
                        <td>{equipo.juegosJugados}</td>
                        <td>{equipo.juegosGanados}</td>
                        <td>{equipo.juegosPerdidos}</td>
                        <td>{equipo.juegosGanadosPenales}</td>
                        <td>{equipo.juegosPerdidosPenales}</td>
                        <td>{equipo.golesAFavor}</td>
                        <td>{equipo.golesEnContra}</td>
                        <td>{equipo.diferenciaGoles}</td>
                        <td>{equipo.puntos}</td>
                        <td>{equipo.posicion}</td>
                        </tr>
                ))}
				        </tbody>
            </table>    
            </div>  
        </div>
    );
}
export default EstadisticasFR;