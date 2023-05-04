import React,{useState,useEffect} from 'react';
import { Helmet } from 'react-helmet';
import {firebaseApp} from "../firebase/firebaseConfig";
import {getFirestore, collection, addDoc,query,where, getDocs, doc,setDoc,onSnapshot } from 'firebase/firestore';
import {Formulario, Label, GrupoInput, ContenedorBotonCentrado, Boton, Input } from '../elementos/ElementosFormularioJuegos';

const RegistrarResultados = () => {
    const [jornada, setJornada] = useState(0);
    const [enfrentamientos, setEnfrentamientos] = useState([]);
    const [estadisticas, setEstadisticas] = useState([]);
    const [escuelas, setEscuelas] = useState([]);
    const firestore = getFirestore(firebaseApp);

    useEffect(() => {
      const partidosRef = query(
        collection(firestore, "partidos"),
        where("jornada", "==", jornada)
      );
      const unsubscribe = onSnapshot(partidosRef, (snapshot) => {
        const enfrentamientos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEnfrentamientos(enfrentamientos);
      });
      return () => unsubscribe();
    }, [jornada]);

    //Obtener los equipos que pertenezca a la modalidad de Futbol rapido, categoria femenil y nivel academico superior
    useEffect(() => {
      const escuelasRef = query(
        collection(firestore, "escuelas"),
        where("modalidad", ">=", "Futbol Rapido"),
        where("categoria", "==", "femenil"),
        where("nivelAcademico", "==", "Superior")
      );
      const unsubscribe = onSnapshot(escuelasRef, (snapshot) => {
        const escuelas = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEscuelas(escuelas);
      });
      return () => unsubscribe();
    }, []);

    //Actualizar las estadisticas
    const actualizarEstadisticas = (estadisticas, golesAFavor, golesEnContra, ganadorEnPenales) => {
      // Actualizar las estadísticas existentes o crear nuevas
      const estadisticasActualizadas = estadisticas.map((estadisticasEquipo) => {
        if (estadisticasEquipo) {
          estadisticasEquipo.jj++;
          estadisticasEquipo.gf += golesAFavor;
          estadisticasEquipo.gc += golesEnContra;
          estadisticasEquipo.dif += golesAFavor - golesEnContra;
          if (ganadorEnPenales) {
            estadisticasEquipo.jgp++;
            estadisticasEquipo.puntos += 2;
          } else {
            if (golesAFavor > golesEnContra) {
              estadisticasEquipo.jg++;
              estadisticasEquipo.puntos += 3;
            } else {
              estadisticasEquipo.jp++;
              estadisticasEquipo.puntos++;
            }
          }
        } else {
          estadisticasEquipo = {
            jj: 1,
            jg: golesAFavor > golesEnContra ? 1 : 0,
            jp: estadisticasEquipo.jj - estadisticasEquipo.jg - estadisticasEquipo.jgp - estadisticasEquipo.jpp,
            jgp: ganadorEnPenales ? 1 : 0,
            jpp: ganadorEnPenales ? 0 : 1,
            gf: golesAFavor,
            gc: golesEnContra,
            dif: golesAFavor - golesEnContra,
            puntos:
              golesAFavor > golesEnContra || ganadorEnPenales ? 2 : 1,
          };
        }
        return estadisticasEquipo;
      });
  
      // Actualizar las estadísticas en Firebase
      estadisticasActualizadas.forEach((estadisticasEquipo, index) => {
        if (estadisticasEquipo) {
          const escuelaId = escuelas[index].id;
          const estadisticasRef = doc(
            firestore,
            "tablaposicionesFRFemenilSuperior",
            escuelaId
          );
          setDoc(estadisticasRef, estadisticasEquipo);
        }
      });
    };
    //Enviar los resultados
    const handleSubmit = (event) => {
      event.preventDefault();
      // Actualizar las estadísticas en Firebase
      enfrentamientos.forEach((enfrentamiento) => {
        const golesLocal = parseInt(enfrentamiento.golesLocal);
        const golesVisitante = parseInt(enfrentamiento.golesVisitante);
        if (isNaN(golesLocal) || isNaN(golesVisitante)) {
          return;
        }
        const ganadorEnPenales = enfrentamiento.penales === "1";
        const local = escuelas.find(
          (escuela) => escuela.id === enfrentamiento.local
        );
        const visitante = escuelas.find(
          (escuela) => escuela.id === enfrentamiento.visitante
        );
        if (local && visitante) {
          const estadisticasLocal = estadisticas.find(
            (estadisticasEquipo) => estadisticasEquipo.id === local.id
          );
          const estadisticasVisitante = estadisticas.find(
            (estadisticasEquipo) => estadisticasEquipo.id === visitante.id
          );
          actualizarEstadisticas(
            [estadisticasLocal, estadisticasVisitante],
            golesLocal,
            golesVisitante,
            ganadorEnPenales
          );
        }
      });
      alert("Resultados guardados");
    };
    const tablaPosiciones = estadisticas
    .filter((estadisticasEquipo) => estadisticasEquipo)
    .sort((a, b) => {
      if (a.puntos > b.puntos) {
        return -1;
      } else if (a.puntos < b.puntos) {
        return 1;
      } else {
        if (a.dif > b.dif) {
          return -1;
        } else if (a.dif < b.dif) {
          return 1;
        } else {
          if (a.gf > b.gf) {
            return -1;
          } else if (a.gf < b.gf) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    })
    .map((estadisticasEquipo, index) => ({
      posicion: index + 1,
      escuela: escuelas.find((escuela) => escuela.id === estadisticasEquipo.id),
      ...estadisticasEquipo,
    }));


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
            <table>
              <thead>
                <tr>
                  <th>Posición</th>
                  <th>Escuela</th>
                  <th>JJ</th>
                  <th>JG</th>
                  <th>JP</th>
                  <th>JGP</th>
                  <th>JPP</th>
                  <th>GF</th>
                  <th>GC</th>
                  <th>DIF</th>
                  <th>Puntos</th>
                </tr>
              </thead>
              <tbody>
                {tablaPosiciones.map((equipo) => (
                  <tr key={equipo.id}>
                    <td>{equipo.posicion}</td>
                    <td>{equipo.escuela.nombre}</td>
                    <td>{equipo.jj}</td>
                    <td>{equipo.jg}</td>
                    <td>{equipo.jp}</td>
                    <td>{equipo.jgp}</td>
                    <td>{equipo.jpp}</td>
                    <td>{equipo.gf}</td>
                    <td>{equipo.gc}</td>
                    <td>{equipo.dif}</td>
                    <td>{equipo.puntos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <form onSubmit={handleSubmit}>
              <label>
                Jornada:
                <input
                  type="text"
                  value={jornada}
                  onChange={(event) => setJornada(parseInt(event.target.value))}
                />
              </label>
              <br />
              {enfrentamientos.map((enfrentamiento) => (
                <div key={enfrentamiento.id}>
                  <p>
                    {escuelas.find((escuela) => escuela.id === enfrentamiento.local)
                      ?.escuela}{" "}
                    vs{" "}
                    {escuelas.find((escuela) => escuela.id === enfrentamiento.visitante)
                      ?.escuela}
                  </p>
                  <label>
                    Goles de local:
                    <input
                      type="text"
                      value={enfrentamiento.golesLocal}
                      onChange={(event) => {
                        const golesLocal = parseInt(event.target.value);
                        setEnfrentamientos(
                          enfrentamientos.map((enfrentamientoActual) => {
                            if (enfrentamientoActual.id === enfrentamiento.id) {
                              return {
                                ...enfrentamientoActual,
                                golesLocal:
                                  isNaN(golesLocal) || golesLocal < 0
                                    ? ""
                                    : golesLocal,
                              };
                            } else {
                              return enfrentamientoActual;
                            }
                          })
                        );
                      }}
                    />
                  </label>
                  <br />
                  <label>
                    Goles de visitante:
                    <input
                      type="text"
                      value={enfrentamiento.golesVisitante}
                      onChange={(event) => {
                        const golesVisitante = parseInt(event.target.value);
                        setEnfrentamientos(
                          enfrentamientos.map((enfrentamientoActual) => {
                            if (enfrentamientoActual.id === enfrentamiento.id) {
                              return {
                                ...enfrentamientoActual,
                                golesVisitante:
                                  isNaN(golesVisitante) || golesVisitante < 0
                                    ? ""
                                    : golesVisitante,
                              };
                            } else {
                              return enfrentamientoActual;
                            }
                          })
                        );
                      }}
                    />
                  </label>
                  <br />
                  <label>
                    Ganador en penales:
                    <select
                      value={enfrentamiento.penales}
                      onChange={(event) => {
                        const ganadorEnPenales = event.target.value;
                        setEnfrentamientos(
                          enfrentamientos.map((enfrentamientoActual) => {
                            if (enfrentamientoActual.id === enfrentamiento.id) {
                              return {
                                ...enfrentamientoActual,
                                penales: ganadorEnPenales,
                              };
                            } else {
                              return enfrentamientoActual;
                            }
                          })
                        );
                      }}
                    >
                      <option value="">--</option>
                      <option value="1">
                        {escuelas.find(
                          (escuela) => escuela.id === enfrentamiento.local
                        )?.nombre}
                      </option>
                      <option value="2">
                        {escuelas.find(
                          (escuela) => escuela.id === enfrentamiento.visitante
                        )?.nombre}
                      </option>
                    </select>
                  </label>
                  <hr />
                </div>
              ))}
              <button type="submit">Guardar resultados</button>
            </form>
        </div>
    );
}
 
export default RegistrarResultados;