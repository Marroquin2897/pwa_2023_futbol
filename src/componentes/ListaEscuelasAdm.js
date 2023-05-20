import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Boton from './../elementos/Boton';
import BtnRegresar from '../elementos/BtnRegresar';
import {ReactComponent as IconoVer} from './../imagenes/ojo.svg';
import {ReactComponent as IconoRegresar} from './../imagenes/flecha.svg';
import {ReactComponent as IconoBorrar} from './../imagenes/borrar.svg';
import useObtenerTodaCEscuelas from '../hooks/useObtenerTodaCEscuelas';
import ListaJugadoresFem from './ListaJugadoresFem';
import ListaJugadoresMas from './ListaJugadoresMas';
import {useNavigate} from 'react-router-dom';
import borrarEscuela from '../firebase/borrarEscuela';
import { Lista, 
    ElementoLista,
    Label,
    Entrenador,
    Asistente,
    Escuela,
    Modalidades,
    Categoria,
    Nivel,
    ContenedorBotones,
    BotonAccion,
    BotonCargarMas,
    ContenedorBotonCentral,
    ContenedorSubtitulo,
    Subtitulo
} from '../elementos/ElementosDeLista';

const ListaEscuelasAdm = () => {
    const [escuelas,obtenerMasEscuelas,hayMasPorCargar] = useObtenerTodaCEscuelas();
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
    const [filtro, setFiltro] = useState("");
    const [condicion, condicionDos, setCondicionUno, setCondicionDos] = useState("");

    const objetosFiltrados = escuelas.filter((escuela) =>
      escuela.categoria === condicion
    );

    const filtrarEscuelas = () => {
        if (filtro === "varonil_superior") {
          return escuelas.filter((escuela) => escuela.categoria === "varonil" && escuela.nivelAcademico === "Superior");
        } else if (filtro === "varonil_ms") {
          return escuelas.filter((escuela) => escuela.categoria === "varonil" && escuela.nivelAcademico === "Media Superior");
        } else if (filtro === "femenil_superior") {
            return escuelas.filter((escuela) => escuela.categoria === "femenil" && escuela.nivelAcademico === "Superior");
        } else if (filtro === "femenil_ms"){
            return escuelas.filter((escuela) => escuela.categoria === "femenil" && escuela.nivelAcademico === "Media Superior");
        }else {
          return escuelas;
        }
      };
      const nameUsuario = sessionStorage.getItem("name")
    return ( 
<div className="hero">
      <nav>
      <img src="https://tinyurl.com/2obtocwe"/>
        <center><h2>Lista de Escuelas</h2><h2>{nameUsuario}</h2></center> 
        <h3><img src="https://tinyurl.com/2kaldmbh"/></h3>
            
      </nav>
        <Helmet>
            <title>Lista de Escuelas</title>
        </Helmet>
        <Lista>
            {filtrarEscuelas().map((escuela) => {
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
                        <Label> Nivel Acádemico
                         <Nivel>
                            {escuela.nivelAcademico}
                        </Nivel>   
                        </Label>  
                        <ContenedorBotones>
                            <BotonAccion onClick={() => borrarEscuela(escuela.id)}>
                                <IconoBorrar/>
                            </BotonAccion>
                        </ContenedorBotones>          
                    </ElementoLista>
                );
            })}
            {hayMasPorCargar && filtrarEscuelas().length !== 0 &&
                <ContenedorBotonCentral>
                    <BotonCargarMas onClick={() => obtenerMasEscuelas()}> Cargas más </BotonCargarMas>
                    <BtnRegresar ruta = '/menu-admin'/>
                </ContenedorBotonCentral>
            }
            {filtrarEscuelas().length === 0 &&
                <ContenedorSubtitulo>
                    <Subtitulo> No hay escuelas por mostrar</Subtitulo>
                    <BtnRegresar ruta = '/menu-admin'/>
                </ContenedorSubtitulo>
                }         
        </Lista>
        <ContenedorBotonCentral>
            <Boton onClick={() => setFiltro("varonil_superior")}>Varonil-Superior</Boton>
            <Boton onClick={() => setFiltro("varonil_ms")}>Varonil-Media Superior</Boton>
            <Boton onClick={() => setFiltro("femenil_superior")}>Femenil-Superior</Boton>
            <Boton onClick={() => setFiltro("femenil_ms")}>Femenil-Media Superior </Boton>
            <Boton onClick={() => setFiltro("")}>Mostrar Escuelas</Boton>
        </ContenedorBotonCentral>
        </div>
     );
}
 
export default ListaEscuelasAdm;