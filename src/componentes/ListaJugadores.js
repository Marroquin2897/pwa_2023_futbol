import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {ReactComponent as IconoEditar} from './../imagenes/editar.svg';
import {ReactComponent as IconoBorrar} from './../imagenes/borrar.svg';
import {ReactComponent as IconoRegresar} from './../imagenes/regresar.svg';
import Boton from './../elementos/Boton';
import BtnRegresar from '../elementos/BtnRegresar';
import useObtenerJugadores from '../hooks/useObtenerJugadores';
import borrarJugador from './../firebase/borrarJugador';
import { PDFViewer } from "@react-pdf/renderer";
import ListaPDF from './ListaPDF';
import { Lista, 
        ElementoLista,
        Label,
        Nombre,
        Apellidos,
        Escuela,
        Boleta,
        Semestre,
        ContenedorBotones,
        BotonAccion,
        BotonCargarMas,
        ContenedorBotonCentral,
        ContenedorSubtitulo,
        Subtitulo
 } from '../elementos/ElementosDeLista';
import ListaExcel from './ListaExcel';

const ListaJugadores = () => {
    const [jugadores,obtenerMasJugadores,hayMasPorCargar] = useObtenerJugadores();
    const [ verPDF, setVerPDF] = useState(false);
    return ( 
        <div className="hero">
      <nav>
      <img src="https://tinyurl.com/2b2ek3ck"/>
      <center><h2>Lista de Jugadores</h2></center> 
        <h3><img src="https://tinyurl.com/233pns5r"/></h3>
      </nav>
        <Helmet>
            <title>Lista de Jugadores</title>
        </Helmet>
        
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
                        <Label> Escuela 
                            <Escuela>
                                {jugador.escuelaJugador}
                            </Escuela>
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
            <ContenedorBotonCentral>
                <Boton onClick={() => {setVerPDF(!verPDF)}}>{verPDF ? "Ocultar PDF" : "Ver PDF"} </Boton>         
               {/* <PDFDownloadLink document={<ListaPDF listaJugadores={varonil}/>} fileName='listaJugadores.pdf'>
                    <Boton>Descargar PDF</Boton>
                </PDFDownloadLink>    
                <Boton onClick={downloadPDF}>Descargar PDForiginal</Boton>     
                <a href={<ListaPDF listaJugadores={varonil}/>} download="listaJugadores.pdf">
                Descargar PDFENLACE
                </a>*/} 
                <ListaExcel listaJugadores={jugadores}/>
            </ContenedorBotonCentral>
            
            {verPDF ? 
                    <PDFViewer width="100%" height="600px">
                        <ListaPDF listaJugadores={jugadores}/>
                     </PDFViewer>
                :
                 null} 
        </Lista>

        </div>
     );
}
 
export default ListaJugadores;