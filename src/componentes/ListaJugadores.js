import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {ReactComponent as IconoEditar} from './../imagenes/editar.svg';
import {ReactComponent as IconoBorrar} from './../imagenes/borrar.svg';
import {ReactComponent as IconoRegresar} from './../imagenes/regresar.svg';
import Boton from './../elementos/Boton';
import BtnRegresar from '../elementos/BtnRegresar';
import useObtenerJugadores from '../hooks/useObtenerJugadores';
import borrarJugador from './../firebase/borrarJugador';
import { Lista, 
        ElementoLista,
        Label,
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
                        <Label> Nombre (s) 
                            <Nombre> 
                                {jugador.nombreJugador} 
                            </Nombre>
                        </Label>
                        <Label> Apellidos 
                            <Apellidos>
                                {jugador.apellidosJugador}
                            </Apellidos>
                        </Label>
                        <Label> Boleta 
                            <Boleta>
                                {jugador.boletaJugador}
                            </Boleta>
                        </Label>
                        <Label> Semestre 
                            <Semestre>
                                {jugador.semestreJugador}
                            </Semestre>
                        </Label>    

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
                    <BtnRegresar ruta = '/menu-profe'/>
                </ContenedorBotonCentral>
            }
            
            {jugadores.length === 0 &&
                <ContenedorSubtitulo>
                    <Subtitulo> No hay jugadores por mostrar</Subtitulo>
                    <Boton as={Link} to='/registrar-jugador'>Agregar Jugador</Boton>
                    <BtnRegresar ruta = '/menu-profe'/>
                </ContenedorSubtitulo>
                }
                
        </Lista>

        </>
     );
}
 
export default ListaJugadores;