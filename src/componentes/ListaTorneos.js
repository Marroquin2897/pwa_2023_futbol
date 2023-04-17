import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Boton from './../elementos/Boton';
import BtnRegresar from '../elementos/BtnRegresar';
import useObtenerTorneos from '../hooks/useObtenerTorneos';
import {useNavigate} from 'react-router-dom';
import { Lista, 
    ElementoLista,
    Label,
    Nombre,
    ContenedorBotones,
    BotonAccion,
    BotonCargarMas,
    ContenedorBotonCentral,
    ContenedorSubtitulo,
    Subtitulo
} from '../elementos/ElementosDeLista';

const ListaTorneos = () => {
    const [torneos,obtenerMasTorneos,hayMasPorCargar] = useObtenerTorneos();
    const navigate = useNavigate();
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
                    </ElementoLista>
                )
            })}
            {hayMasPorCargar && 
                <ContenedorBotonCentral>
                    <BotonCargarMas onClick={() => obtenerMasTorneos()}> Cargas más </BotonCargarMas>
                    <BtnRegresar ruta = '/menu-administrador'/>
                </ContenedorBotonCentral>
            }
            {torneos.length === 0 &&
                <ContenedorSubtitulo>
                    <Subtitulo> No hay torneos por mostrar</Subtitulo>
                    <Boton as={Link} to='/nuevo-torneo'>Agregar Nuevo Torneo</Boton>
                    <BtnRegresar ruta = '/menu-administrador'/>
                </ContenedorSubtitulo>
                }
        </Lista>
        </>
     );
}
 
export default ListaTorneos;