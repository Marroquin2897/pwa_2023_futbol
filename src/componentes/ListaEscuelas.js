import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Boton from './../elementos/Boton';
import BtnRegresar from '../elementos/BtnRegresar';
import {ReactComponent as IconoVer} from './../imagenes/ojo.svg';
import {ReactComponent as IconoRegresar} from './../imagenes/flecha.svg';
import useObtenerEscuelas from '../hooks/useObtenerEscuelas';
import { Lista, 
    ElementoLista,
    Label,
    Entrenador,
    Asistente,
    Escuela,
    Modalidades,
    Categoria,
    ContenedorBotones,
    BotonAccion,
    BotonCargarMas,
    ContenedorBotonCentral,
    ContenedorSubtitulo,
    Subtitulo
} from '../elementos/ElementosDeLista';

const ListaEscuelas = () => {
    const [escuelas,obtenerMasEscuelas,hayMasPorCargar] = useObtenerEscuelas();

    return ( 
        <>
        <Helmet>
            <title>Lista de Escuelas</title>
        </Helmet>
        <h1> LISTA DE ESCUELAS </h1>
        <Lista>
            {escuelas.map((escuela) => {
                return (
                    <ElementoLista key={escuela.id}>
                        <Label> Entrenador 
                        <Entrenador> {escuela.nombreEntrenador}</Entrenador>
                        </Label>
                        <Label> Auxiliar
                          <Asistente>
                            {escuela.nombreAsistente}
                        </Asistente>  
                        </Label>
                        <Label> Escuela
                        <Escuela>
                            {escuela.escuela}
                        </Escuela>
                        </Label>
                        <Label> Modalidades 
                         <Modalidades>
                            {escuela.modalidades}
                        </Modalidades>   
                        </Label>
                        <Label> Categoria
                         <Categoria>
                            {escuela.categoria}
                        </Categoria>   
                        </Label>
                        
                        <ContenedorBotones>
                        <BotonAccion as={Link} to='/equipo-femenil'>
                                <IconoVer/>     
                            </BotonAccion>
                        </ContenedorBotones>
                        

                    </ElementoLista>
                );
            })}
            {hayMasPorCargar && 
                <ContenedorBotonCentral>
                    <BotonCargarMas onClick={() => obtenerMasEscuelas()}> Cargas más </BotonCargarMas>
                    <BtnRegresar ruta = '/menu-profe'/>
                </ContenedorBotonCentral>
            }
            {escuelas.length === 0 &&
                <ContenedorSubtitulo>
                    <Subtitulo> No hay escuelas por mostrar</Subtitulo>
                    <Boton as={Link} to='/registrar-escuela'>Registrar Escuela</Boton>
                    <BtnRegresar ruta = '/menu-profe'/>
                </ContenedorSubtitulo>
                }
        </Lista>
        </>
     );
}
 
export default ListaEscuelas;