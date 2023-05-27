import React from 'react';
import { getAuth,signOut } from 'firebase/auth';
import { slide as Menu } from 'react-burger-menu'
import '../MenuSide.css';
import { Link } from 'react-router-dom';
import {FaRegChartBar, FaCalendarAlt, FaNewspaper, FaListOl} from "react-icons/fa";
import {MdOutlineAppRegistration, MdSchool} from "react-icons/md";
import {firebaseApp} from "../firebase/firebaseConfig";



const auth=getAuth(firebaseApp);

class MenuAdmin extends React.Component  {
  handleCerrarSesion = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('infoUser');
        console.log('Sesión cerrada');
        // Realiza otras acciones después de cerrar sesión, como redirigir a la página de inicio de sesión, mostrar un mensaje, etc.
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
        // Manejo de errores al cerrar sesión
      });
  };
    render () {
      return (
        <Menu >
          
          <Link id="rolJuegos" className="menu-item" to="/nuevo-torneo" > <FaCalendarAlt  className='iconMenu'/>  Nuevo Torneo </Link>
          <Link id="rolJuegos" className="menu-item" to="/lista-torneos" > <FaListOl  className='iconMenu'/>  Lista de Torneos </Link>
          <Link id="listaEscuela" className="menu-item" to="/lista-esc-adm"> <MdSchool className='iconMenu'/>  Lista de Escuelas</Link>
          <Link id="listaJugadores" className="menu-item" to="/lista-jugadores-adm"> <MdSchool className='iconMenu'/>  Lista de Jugadores</Link>

          <Link id="resultadosF7" className="menu-item" to="/RR-Futbol7" > <FaRegChartBar className='iconMenu'/>  Registrar Resultados Fútbol 7</Link><br/>
          <Link id="resultadosFR" className="menu-item" to="/RR-FutbolRapido" > <FaRegChartBar className='iconMenu'/>  Registrar Resultados Fútbol Rápido</Link><br/><br/>
          <Link id="resultadosFA" className="menu-item" to="/RR-FutbolAsociacion" > <FaRegChartBar className='iconMenu'/>  Registrar Resultados Fútbol Asociación</Link><br/><br/>

          <Link id="estadisticas" className="menu-item" to="/TG-Futbol7" > <FaRegChartBar className='iconMenu'/>  Tabla General de Posiciones Fútbol 7</Link><br/><br/>
          <Link id="estadisticas" className="menu-item" to="/TG-FutbolRapido" > <FaRegChartBar className='iconMenu'/>  Tabla General de Posiciones Fútbol Rápido</Link><br/><br/>
          <Link id="estadisticas" className="menu-item" to="/TG-FutbolAsociacion" > <FaRegChartBar className='iconMenu'/>  Tabla General de Posiciones Fútbol Asociación</Link><br/><br/>

          <Link id="noticias" className="menu-item" to="/noticias" > <FaNewspaper  className='iconMenu'/>  Noticias</Link>
          <center><button className='btn-cerrarSesion' onClick={this.handleCerrarSesion}> Cerrar sesión</button></center>
        </Menu>
      );
    }
}
export default MenuAdmin;