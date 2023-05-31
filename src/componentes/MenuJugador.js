import React from 'react';
import {firebaseApp} from '../firebase/firebaseConfig';
import { getAuth,signOut } from 'firebase/auth';
import { slide as Menu } from 'react-burger-menu'
import '../MenuSide.css';
import { Link } from 'react-router-dom';
import {FaUserEdit, FaRegChartBar, FaNewspaper,FaCalendarAlt} from "react-icons/fa";
import {TbSoccerField} from "react-icons/tb";

const auth=getAuth(firebaseApp);

class MenuJugador extends React.Component  {
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
          <Link id="editarPerfil" className="menu-item" to={`/editar-perfil/${auth.currentUser.uid}`}><FaUserEdit  className='iconMenu'/>  Editar perfil</Link>
          <Link id="partidosF7" className="menu-item" to="/PartidosF7"> <FaCalendarAlt className='iconMenu'/>  Ver Partidos Fútbol 7</Link><br/>
          <Link id="partidosFR" className="menu-item" to="/PartidosFR"> <FaCalendarAlt className='iconMenu'/>  Ver Partidos Fútbol Rápido</Link><br/>
          <Link id="partidosFA" className="menu-item" to="/PartidosFA"> <FaCalendarAlt className='iconMenu'/>  Ver Partidos Fútbol Asociación</Link><br/>
          <Link id="estadisticas" className="menu-item" to="/TG-Futbol7" > <FaRegChartBar className='iconMenu'/>  Tabla General de Posiciones Fútbol 7</Link><br/>
          <Link id="estadisticas" className="menu-item" to="/TG-FutbolRapido" > <FaRegChartBar className='iconMenu'/>  Tabla General de Posiciones Fútbol Rápido</Link><br/>
          <Link id="estadisticas" className="menu-item" to="/TG-FutbolAsociacion" > <FaRegChartBar className='iconMenu'/>  Tabla General de Posiciones Fútbol Asociación</Link><br/>
          
          <center><button className='btn-cerrarSesion' onClick={this.handleCerrarSesion}> Cerrar sesión</button></center>
        </Menu>
      );
    }
}
export default MenuJugador;