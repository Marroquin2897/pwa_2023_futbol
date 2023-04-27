import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Boton from './../elementos/Boton';
import BtnRegresar from '../elementos/BtnRegresar';
import {ReactComponent as IconoVer} from './../imagenes/ojo.svg';
import {ReactComponent as IconoRegresar} from './../imagenes/flecha.svg';
import useObtenerEscuelas from '../hooks/useObtenerEscuelas';
import ListaJugadoresFem from './ListaJugadoresFem';
import ListaJugadoresMas from './ListaJugadoresMas';
import {useNavigate} from 'react-router-dom';

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
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const navigate = useNavigate();

    const handleCategoriaClick = (categoria) => {
        setCategoriaSeleccionada(categoria);
    }

    //Funcion para mandar a lista de jugadores varonil
    const redireccionarVaronil = () => {
        navigate('/equipo-varonil');
    }

    //Funcion para mandar a lista de jugadores femenil
    const redireccionarFemenil = () => {
        navigate('/equipo-femenil');
    }


    return ( 
<div className="hero">
      <nav>
      <img src="https://tinyurl.com/2b2ek3ck"/>
        <center><h2>Lista de Escuelas</h2></center> 
        <h3><img src="https://tinyurl.com/233pns5r"/></h3>
      </nav>
        <Helmet>
            <title>Lista de Escuelas</title>
        </Helmet>
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
                        <BotonAccion as={Link} to={
                            escuela.categoria === "varonil" 
                            ? `/equipo-varonil/${escuela.id}` 
                            : `/equipo-femenil/${escuela.id}`
                        }><IconoVer/>   
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
        </div>
     );
}
 
export default ListaEscuelas;