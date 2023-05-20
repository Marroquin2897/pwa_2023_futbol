import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Boton from './../elementos/Boton';
import BtnRegresar from '../elementos/BtnRegresar';
import useObtenerEquipoVaronil from '../hooks/useObtenerEquipoVaronil';
import ListaPDF from './ListaPDF';
import { useParams } from 'react-router-dom';
import { PDFViewer } from "@react-pdf/renderer";
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


const ListaJugadoresMas = () => {
    const escuelaID = useParams()
    console.log(escuelaID)
    const [varonil,obtenerMasVaronil,hayMasPorCargar] = useObtenerEquipoVaronil(escuelaID);
    const [ verPDF, setVerPDF] = useState(false);
    const nameUsuario = sessionStorage.getItem("name")
    return (  
        <div className="hero">
      <nav>
      <img src="https://tinyurl.com/2b2ek3ck"/>
      <center><h2>Equipo Varonil</h2>
      <h2>{nameUsuario}</h2></center>
        <h3><img src="https://tinyurl.com/2kaldmbh"/></h3>
      </nav>
        <Helmet>
            <title> Equipo Varonil </title>
        </Helmet>
        <Lista>
            {varonil.map((jugador) => {
                return (
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
                    <Label> Género 
                        <Semestre>
                            {jugador.sexoJugador}
                        </Semestre>
                    </Label>  
                </ElementoLista>
                )
            })}
            {hayMasPorCargar && 
                <ContenedorBotonCentral>
                    <BotonCargarMas onClick={() => obtenerMasVaronil(escuelaID)}> Cargas más </BotonCargarMas>
                    <BtnRegresar ruta = '/lista-escuelas'/>
                </ContenedorBotonCentral>
            }
            {varonil.length === 0 &&
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
            </ContenedorBotonCentral>
            {verPDF ? 
                    <PDFViewer width="100%" height="600px">
                        <ListaPDF listaJugadores={varonil} idEscuela={escuelaID}/>
                     </PDFViewer>
                :
                 null}
        </Lista>
        </div>
    );
}
 
export default ListaJugadoresMas;