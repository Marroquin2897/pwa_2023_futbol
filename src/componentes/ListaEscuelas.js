import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Boton from './../elementos/Boton';
import BtnRegresar from '../elementos/BtnRegresar';
import {ReactComponent as IconoVer} from './../imagenes/ojo.svg';
import {ReactComponent as IconoEditar} from './../imagenes/editar.svg';
import {ReactComponent as IconoBorrar} from './../imagenes/borrar.svg';
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
import { ContenedorBotonCentrado } from '../elementos/ElementosFormularioJuegos';
import borrarEscuela from '../firebase/borrarEscuela';

const ListaEscuelas = () => {
    const [escuelas,obtenerMasEscuelas,hayMasPorCargar] = useObtenerEscuelas();
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const navigate = useNavigate();

    const handleCategoriaClick = (categoria) => {
        setCategoriaSeleccionada(categoria);
    }


    const nameUsuario = sessionStorage.getItem("name")
    return ( 
    <div className="hero">
      <nav>
      <img src="https://tinyurl.com/2obtocwe"/>
        <center><h2>Lista de Escuelas</h2> 
        <h3>{nameUsuario}</h3></center> 
       <h3><img src="https://tinyurl.com/2kaldmbh"/></h3>
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
                        <Label> Categoría
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
                        <BotonAccion as={Link} to={`/editar-escuela/${escuela.id}`}>
                                <IconoEditar/>     
                            </BotonAccion>
                            <BotonAccion onClick={() => borrarEscuela(escuela.id)}>
                                <IconoBorrar/>
                            </BotonAccion>
                        </ContenedorBotones><br/>
                    </ElementoLista>
                );
            })}<br/>
            {hayMasPorCargar && 
                <ContenedorBotonCentral>
                    <BotonCargarMas onClick={() => obtenerMasEscuelas()}> Cargas más </BotonCargarMas>
                    
                </ContenedorBotonCentral>
            }
            {escuelas.length === 0 &&
                <center><ContenedorSubtitulo>
                    <Subtitulo> No hay escuelas por mostrar</Subtitulo><br/><br/>
                    <Boton as={Link} to='/registrar-escuela'>Registrar Escuela</Boton><br/>
                    <BtnRegresar ruta = '/menu-admin'/><br/>
                </ContenedorSubtitulo></center>
                }
        </Lista>
        <ContenedorBotonCentrado>
        <BtnRegresar ruta = '/menu-profe'/>
        </ContenedorBotonCentrado>
        </div>
     );
}
 
export default ListaEscuelas;