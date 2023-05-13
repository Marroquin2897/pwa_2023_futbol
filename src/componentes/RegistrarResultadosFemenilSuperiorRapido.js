import React from 'react';
import { useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { getFirestore, collection, addDoc,where,updateDoc,getDocs,doc,query} from 'firebase/firestore';
import { firebaseApp } from '../firebase/firebaseConfig';
import { Formulario, Label, GrupoInput, ContenedorBotonCentrado, Boton, Input } from '../elementos/ElementosFormularioJuegos';
import Alerta from '../elementos/Alerta';

const RegistrarResultadosFemenilSuperiorRapido = () => {
    const [jornada, setJornada] = useState('');
    const [enfrentamientos, setEnfrentamientos] = useState([]);
    const [local, setLocal] = useState('');
    const [visitante, setVisitante] = useState('');
    const [golesLocal, setGolesLocal] = useState(0);
    const [golesVisitante, setGolesVisitante] = useState(0);
    const [ganoPenales, setGanoPenales] = useState(false);
    const [perdioPenales, setPerdioPenales] = useState(false);
    const [estadoAlerta, cambiarEdoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});
    const firestore = getFirestore(firebaseApp);

    useEffect(() => {
        const obtenerEnfrentamientos = async () => {
          try {
            const partidosCollection = collection(firestore, 'partidos');
            const enfrentamientosRef = query(
              partidosCollection,
              where('categoria', '==', 'femenil'),
              where('nivelAcademico', '==', 'Superior'),
              where('modalidad', '==', 'Futbol Rapido'),
              where('jornada', '==', parseInt(jornada))
            );
            const resultado = await getDocs(enfrentamientosRef);
            const enfrentamientos = resultado.docs.map((doc) => doc.data());
            setEnfrentamientos(enfrentamientos);
          } catch (error) {
            console.error(error);
          }
        };
        if (jornada !== '') {
          obtenerEnfrentamientos();
        }
      }, [firestore, jornada]);

    const handleRegistrarResultado = async (e) => {
        e.preventDefault();
        // Validar que se haya seleccionado un enfrentamiento
        if (local === '' || visitante === '') {
            cambiarEdoAlerta(true);
            cambiarAlerta({
            tipo: 'error',
            mensaje: 'Por favor, selecciona un enfrentamiento',
            });
            return;
        }
        try {
            const partidoRef = doc(firestore, 'partidos', `${local}-${visitante}-${jornada}`);
            await updateDoc(partidoRef, {
                golesLocal: parseInt(golesLocal),
                golesVisitante: parseInt(golesVisitante),
                ganoPenales,
                perdioPenales,
            });

            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo: 'exito',
                mensaje: 'Resultado registrado exitosamente',
            });

            // Limpiar los campos después de registrar el resultado
            setLocal('');
            setVisitante('');
            setGolesLocal(0);
            setGolesVisitante(0);
            setGanoPenales(false);
            setPerdioPenales(false);
        } catch (error){
            console.error(error);
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Error al registrar el resultado'
            });
        }
    }
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
            <main>
                <Formulario onSubmit={handleRegistrarResultado}>
                <div>
                    <Label htmlFor="jornada">Jornada</Label>
                    <GrupoInput>
                    <Input
                        type="number"
                        name="jornada"
                        value={jornada}
                        onChange={(e) => setJornada(e.target.value)}
                        required
                    />
                    </GrupoInput>
                </div>
                {enfrentamientos.length > 0 && (
                    <div>
                        <Label htmlFor="enfrentamiento">Enfrentamiento:</Label>
                        <GrupoInput>
                        <select
                            name="enfrentamiento"
                            value={`${local}-${visitante}`}
                            onChange={(e) => {
                            const [localValue, visitanteValue] = e.target.value.split('-');
                            setLocal(localValue);
                            setVisitante(visitanteValue);
                            }}
                        >
                            <option value="">Seleccionar enfrentamiento</option>
                            {enfrentamientos.map((enfrentamiento) => (
                            <option
                                key={`${enfrentamiento.local}-${enfrentamiento.visitante}`}
                                value={`${enfrentamiento.local}-${enfrentamiento.visitante}`}
                            >
                                {`${enfrentamiento.local} vs ${enfrentamiento.visitante}`}
                            </option>
                            ))}
                        </select>
                        </GrupoInput>
                    </div>
                    )}
                    <div>
                    <Label htmlFor="golesLocal">Goles Local:</Label>
                    <GrupoInput>
                        <Input
                        type="number"
                        name="golesLocal"
                        value={golesLocal}
                        onChange={(e) => setGolesLocal(e.target.value)}
                        />
                    </GrupoInput>
                    </div>
                    <div>
                    <Label htmlFor="golesVisitante">Goles Visitante:</Label>
                    <GrupoInput>
                        <Input
                        type="number"
                        name="golesVisitante"
                        value={golesVisitante}
                        onChange={(e) => setGolesVisitante(e.target.value)}
                        />
                    </GrupoInput>
                    </div>
                    <div>
                    <Label htmlFor="ganoPenales">Ganó en penales:</Label>
                    <GrupoInput>
                        <input
                        type="checkbox"
                        name="ganoPenales"
                        checked={ganoPenales}
                        onChange={(e) => setGanoPenales(e.target.checked)}
                        />
                    </GrupoInput>
                    </div>
                    <div>
                    <Label htmlFor="perdioPenales">Perdió en penales:</Label>
                    <GrupoInput>
                        <input
                        type="checkbox"
                        name="perdioPenales"
                        checked={perdioPenales}
                        onChange={(e) => setPerdioPenales(e.target.checked)}
                        />
                    </GrupoInput>
                    </div>
                    {enfrentamientos.length > 0 && (
                    <div>
                    <h2>Enfrentamientos</h2>
                    <ul>
                        {enfrentamientos.map((enfrentamiento) => (
                        <li key={`${enfrentamiento.local}-${enfrentamiento.visitante}`}>
                            {`${enfrentamiento.local} vs ${enfrentamiento.visitante}`}
                        </li>
                        ))}
                    </ul>
                    </div>
                )}
                <ContenedorBotonCentrado>
                    <Boton type="submit">Registrar Resultado</Boton>
                </ContenedorBotonCentrado>
                </Formulario>
                
                <Alerta
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEdoAlerta={cambiarEdoAlerta}
                />
            </main>
        </div>
     );
}
 
export default RegistrarResultadosFemenilSuperiorRapido;