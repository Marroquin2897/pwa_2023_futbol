import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {ReactComponent as IconoEditar} from './../imagenes/editar.svg';
import {ReactComponent as IconoBorrar} from './../imagenes/borrar.svg';
import {ReactComponent as IconoRegresar} from './../imagenes/regresar.svg';
import Boton from './../elementos/Boton';
import useObtenerJugadores from '../hooks/useObtenerJugadores';
import borrarJugador from './../firebase/borrarJugador';
import { Lista, 
        ElementoLista,
        Nombre,
        Apellidos,
        Boleta,
        Semestre,
        ContenedorBotones,
        BotonAccion,
        BotonCargarMas,
        ContenedorBotonCentral,
        ContenedorSubtitulo,
        Subtitulo
 } from '../elementos/ElementosDeLista';

const ListaJugadores = () => {
    const [jugadores,obtenerMasJugadores,hayMasPorCargar] = useObtenerJugadores();
    
    return ( 
        <>
        <Helmet>
            <title>Lista de Jugadores</title>
        </Helmet>
        <h1> LISTA DE JUGADORES </h1>
        <Lista>
            {jugadores.map((jugador) => {
                return(
                    <ElementoLista key={jugador.id}> 
                        <Nombre> 
                            {jugador.nombreJugador} 
                        </Nombre>
                        <Apellidos>
                            {jugador.apellidosJugador}
                        </Apellidos>
                        <Boleta>
                            {jugador.boletaJugador}
                        </Boleta>
                        <Semestre>
                            {jugador.semestreJugador}
                        </Semestre>

                        <ContenedorBotones>
                            <BotonAccion as={Link} to={`/editar-jugador/${jugador.id}`}>
                                <IconoEditar/>     
                            </BotonAccion>
                            <BotonAccion onClick={() => borrarJugador(jugador.id)}>
                                <IconoBorrar/>
                            </BotonAccion>
                        </ContenedorBotones>
                    </ElementoLista>
                );
            })}
            {hayMasPorCargar && 
                <ContenedorBotonCentral>
                    <BotonCargarMas onClick={() => obtenerMasJugadores()}> Cargas más </BotonCargarMas>
                    <Boton as={Link} to='/menu-profe'>  <IconoRegresar/></Boton>
                </ContenedorBotonCentral>
            }
            

            {jugadores.length === 0 &&
                <ContenedorSubtitulo>
                    <Subtitulo> No hay jugadores por mostrar</Subtitulo>
                    <Boton as={Link} to='/registrar-jugador'>Agregar Jugador</Boton>
                </ContenedorSubtitulo>
                }
                
        </Lista>

        </>
     );
}
 
export default ListaJugadores;