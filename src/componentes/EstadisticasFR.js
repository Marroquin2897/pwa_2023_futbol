import React from 'react';
import { useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { getFirestore,collection, getDocs } from 'firebase/firestore';
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
    
              equipos[local].golesAFavor += golesLocal;
              equipos[local].golesEnContra += golesVisitante;
    
              equipos[visitante].golesAFavor += golesVisitante;
              equipos[visitante].golesEnContra += golesLocal;
    
              if (golesLocal > golesVisitante) {
                equipos[local].juegosGanados += 1;
                equipos[visitante].juegosPerdidos += 1;
              } else if (golesLocal < golesVisitante) {
                equipos[local].juegosPerdidos += 1;
                equipos[visitante].juegosGanados += 1;
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
                {estadisticasEquipos.map((equipo, index) => (
                <tr key={index}>
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