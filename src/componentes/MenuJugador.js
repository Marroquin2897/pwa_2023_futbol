import React from 'react';
import {firebaseApp} from '../firebase/firebaseConfig';
import { getAuth,signOut } from 'firebase/auth';
import { slide as Menu } from 'react-burger-menu'
import '../MenuSide.css';
import { Link } from 'react-router-dom';
import {FaUserEdit, FaRegChartBar, FaCalendarAlt, FaNewspaper} from "react-icons/fa";
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
      const rolUsuario = sessionStorage.getItem("rolUsuario")
      return (
        <Menu >
          <Link id="editarPerfil" className="menu-item" to={`/editar-perfil/${auth.currentUser.uid}`}><FaUserEdit  className='iconMenu'/>  Editar perfil</Link>
          <Link id="estadisticas" className="menu-item" to="/" > <FaRegChartBar  className='iconMenu'/>  Estadísticas</Link>
          <Link id="rolJuegos" className="menu-item" to="/" > <TbSoccerField  className='iconMenu'/>  Rol de juegos</Link>
          <Link id="noticias" className="menu-item" to="/noticias" > <FaNewspaper  className='iconMenu'/>  Noticias</Link>
          <center><button className='btn-cerrarSesion' onClick={this.handleCerrarSesion}> Cerrar sesión</button></center>
        </Menu>
      );
    }
}
export default MenuJugador;