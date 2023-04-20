import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Boton from './../elementos/Boton';
import BtnRegresar from '../elementos/BtnRegresar';
import useObtenerTorneos from '../hooks/useObtenerTorneos';

import {ReactComponent as IconoCalendar} from './../imagenes/calendar.svg';
import {Lista,ElementoLista,Label,ContenedorBotonCentral,ContenedorBotones,BotonAccion,Nombre,BotonCargarMas,
ContenedorSubtitulo,
Subtitulo} from './../elementos/ElementosListaT';

const ListaTorneos = () => {
    const [torneos,obtenerMasTorneos,hayMasPorCargar] = useObtenerTorneos();
    
    return ( 
        <>
        <Helmet>
            <title>Lista de Torneos</title>
        </Helmet>
        <h1> LISTA DE TORNEOS </h1>
        <Lista>
            {torneos.map((torneo) => {
                return (
                    <ElementoLista key={torneo.id}>
                        <Label> Nombre Torneo 
                        <Nombre> {torneo.nombreTorneo}</Nombre>
                        </Label>
                        <Label> Modalidad 
                        <Nombre> {torneo.modalidadTorneo}</Nombre>
                        </Label>
                        <Label> Sistema Competencia 
                        <Nombre> {torneo.sistemaCompetencia}</Nombre>
                        </Label>
                        <Label> Rama
                        <Nombre> {torneo.rama}</Nombre>
                        </Label>
                        <Label> Nivel Académico
                        <Nombre> {torneo.nivelAcademico}</Nombre>
                        </Label>
                        <ContenedorBotones>
                            <BotonAccion as={Link} to={'/round-robin'}>
                                <IconoCalendar/>     
                            </BotonAccion>
                            
                        </ContenedorBotones>

                    </ElementoLista>
                )
            })}
            {hayMasPorCargar && 
                <ContenedorBotonCentral>
                    <BotonCargarMas onClick={() => obtenerMasTorneos()}> Cargas más </BotonCargarMas>
                    <BtnRegresar ruta = '/menu-admin'/>
                </ContenedorBotonCentral>
            }
            {torneos.length === 0 &&
                <ContenedorSubtitulo>
                    <Subtitulo> No hay torneos por mostrar</Subtitulo>
                    <Boton as={Link} to='/nuevo-torneo'>Agregar Nuevo Torneo</Boton>
                    <BtnRegresar ruta = '/menu-admin'/>
                </ContenedorSubtitulo>
                }
        </Lista>
        </>
     );
}
 
export default ListaTorneos;