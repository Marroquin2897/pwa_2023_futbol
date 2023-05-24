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
    const nameUsuario = sessionStorage.getItem("name")
    return ( 
    <div className="hero">
      <nav>
      <img src="https://tinyurl.com/2obtocwe"/>
        <center><h2>Lista de Torneos</h2><h2>{nameUsuario}</h2></center> 
        <h3><img src="https://tinyurl.com/2kaldmbh"/></h3>
        
      </nav>
        <Helmet>
            <title>Lista de Torneos</title>
        </Helmet>
        
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
                        <ContenedorBotones>
                            <BotonAccion as={Link} to={
                                torneo.sistemaCompetencia === "Round Robin"
                                ? '/round-robin'
                                : '/grupos'}><IconoCalendar/>     
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
                    <Boton as={Link} to='/nuevo-torneo'>Agregar Nuevo Torneo</Boton><br/>
                    <BtnRegresar ruta = '/menu-admin'/>
                </ContenedorSubtitulo>
                }
        </Lista>
    </div>
     );
}
 
export default ListaTorneos;