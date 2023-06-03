import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Boton from './../elementos/Boton';
import BtnRegresar from '../elementos/BtnRegresar';
import useObtenerColeJugadores from '../hooks/useObtenerColeJugadores';
import { Lista, 
        ElementoLista,
        Label,
        Nombre,
        Apellidos,
        Escuela,
        Boleta,
        Semestre,
        BotonCargarMas,
        ContenedorBotonCentral,
        ContenedorSubtitulo,
        Subtitulo
 } from '../elementos/ElementosDeLista';
 import { ContenedorBotonCentrado } from '../elementos/ElementosFormularioJuegos';
import ListaExcel from './ListaExcel';

const ListaJugadoresAdm = () => {
    const [jugadores,obtenerMasJugadores,hayMasPorCargar] = useObtenerColeJugadores();
    const [filtro, setFiltro] = useState("");
    const filtrarJugadores = () => {
        if (filtro === "Masculino") {
          return jugadores.filter((jugador) => jugador.sexoJugador === "Masculino");
        } else if (filtro === "Femenino") {
            return jugadores.filter((jugador) => jugador.sexoJugador === "Femenino");
        }else {
          return jugadores;
        }
      };
    const nameUsuario = sessionStorage.getItem("name")

    return ( 
        <div className="hero">
      <nav>
      <img src="https://tinyurl.com/2obtocwe"/>
      <center><h2>Lista de Jugadores</h2>
      <h2>{nameUsuario}</h2>
      </center> 
       <div>
            <h3><img src="https://tinyurl.com/2kaldmbh"/></h3>
            
        </div>
      </nav>
        <Helmet>
            <title>Lista de Jugadores</title>
        </Helmet>
        
        <Lista>
            {filtrarJugadores().map((jugador) => {
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
                            <Escuela>
                                {jugador.boletaJugador}
                            </Escuela>
                        </Label>
                        <Label> Semestre 
                            <Escuela>
                                {jugador.semestreJugador}
                            </Escuela>
                        </Label>        
                        <Label> Género 
                            <Escuela>
                                {jugador.sexoJugador}
                            </Escuela>
                        </Label>                 
                    </ElementoLista>
                );
            })}
            {hayMasPorCargar && filtrarJugadores().length !== 0 && 
                <center><ContenedorBotonCentral>
                    <BotonCargarMas onClick={() => obtenerMasJugadores()}> Cargas más </BotonCargarMas>
                    
                </ContenedorBotonCentral></center>
            }
            
            {filtrarJugadores().length === 0 &&
                <center><ContenedorSubtitulo>
                    <Subtitulo> No hay jugadores por mostrar</Subtitulo>
                    
                </ContenedorSubtitulo></center> 
                }
            <ContenedorBotonCentrado>
            <BtnRegresar ruta = '/menu-admin'/>
            </ContenedorBotonCentrado>
            <ContenedorBotonCentral>
                <Boton onClick={() => setFiltro("Masculino")}>Varonil</Boton>
                <Boton onClick={() => setFiltro("Femenino")}>Femenil</Boton>
                <Boton onClick={() => setFiltro("")}>Mostrar Jugadores</Boton>
                <ListaExcel listaJugadores={jugadores}/>
            </ContenedorBotonCentral>
        </Lista>
        
        </div>
     );
}
 
export default ListaJugadoresAdm;