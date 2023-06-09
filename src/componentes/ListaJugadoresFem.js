import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Boton from './../elementos/Boton';
import BtnRegresar from '../elementos/BtnRegresar';
import useObtenerEquipoFemenil from '../hooks/useObtenerEquipoFemenil';
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
    BotonCargarMas,
    ContenedorBotonCentral,
    ContenedorSubtitulo,
    Subtitulo
} from '../elementos/ElementosDeLista';

const ListaJugadoresFem = () => {
    const escuelaID = useParams()
    console.log(escuelaID)
    const [femenil,obtenerMasFemenil,hayMasPorCargar] = useObtenerEquipoFemenil(escuelaID);
    const [ verPDF, setVerPDF] = useState(false);
    const nameUsuario = sessionStorage.getItem("name")
    return ( 
        <div className="hero">
        <nav>
        <img src="https://tinyurl.com/2obtocwe"/>
        <center><h2>Equipo Femenil</h2>
        <h3>{nameUsuario}</h3></center>  
          <h3><img src="https://tinyurl.com/2kaldmbh"/></h3>
        </nav>
        <Helmet>
            <title> Equipo Femenil </title>
        </Helmet>
        <Lista>
            {femenil.map((jugador) => {
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
                    <BotonCargarMas onClick={() => obtenerMasFemenil(escuelaID)}> Cargas más </BotonCargarMas>
                    <BtnRegresar ruta = '/lista-escuelas'/>
                </ContenedorBotonCentral>
            }
            
            {femenil.length === 0 &&
                <ContenedorSubtitulo>
                    <Subtitulo> No hay jugadores por mostrar</Subtitulo>
                    <Boton as={Link} to='/registrar-jugador'>Agregar Jugador</Boton>
                    <BtnRegresar ruta = '/menu-profe'/>
                </ContenedorSubtitulo>
                
                }
            <ContenedorBotonCentral>
                <Boton onClick={() => {setVerPDF(!verPDF)}}>{verPDF ? "Ocultar PDF" : "Ver PDF"} </Boton>         
            </ContenedorBotonCentral>
            {console.log("este es el ID", escuelaID)}
            {verPDF ? 
                    <PDFViewer width="100%" height="600px">
                        <ListaPDF  listaJugadores={femenil} idEscuela={escuelaID}/>
                     </PDFViewer>
                     
                :
                 null}
        </Lista>

        </div>
        
     );
}
 
export default ListaJugadoresFem;