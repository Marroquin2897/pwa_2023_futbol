import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Boton from './../elementos/Boton';
import BtnRegresar from '../elementos/BtnRegresar';
import useObtenerEquipoFemenil from '../hooks/useObtenerEquipoFemenil';
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

const ListaJugadoresFem = () => {
    const [femenil,obtenerMasFemenil,hayMasPorCargar] = useObtenerEquipoFemenil();

    return ( 
        <>
        <Helmet>
            <title> Equipo Femenil </title>
        </Helmet>
        <h1> Equipo Femenil </h1>

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
                    <BotonCargarMas onClick={() => obtenerMasFemenil()}> Cargas más </BotonCargarMas>
                    <BtnRegresar ruta = '/menu-profe'/>
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
                    <Boton> Exportar lista </Boton>
                    
                </ContenedorBotonCentral>
        </Lista>

        </>
        
     );
}
 
export default ListaJugadoresFem;