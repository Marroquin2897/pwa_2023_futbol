import React from 'react';
import firebaseApp from '../firebase/firebaseConfig';
import { getAuth,signOut } from 'firebase/auth';
import { slide as Menu } from 'react-burger-menu'
import '../MenuSide.css';
import { Link } from 'react-router-dom';
import {FaUserPlus, FaRegChartBar, FaCalendarAlt, FaNewspaper} from "react-icons/fa";

const auth=getAuth(firebaseApp);

class MenuAdmin extends React.Component  {
    
    render () {
      return (
        <Menu >
          <Link id="listaJugador" className="menu-item" to="/lista-jugadores"> <FaUserPlus className='iconMenu'/>  Lista de Jugadores</Link>
          <Link id="listaEscuela" className="menu-item" to="/lista-escuelas"> <FaUserPlus className='iconMenu'/>  Lista de Escuelas</Link>
          <Link id="estadisticas" className="menu-item" to="/" > <FaRegChartBar  className='iconMenu'/>  Estadisticas</Link>
          <Link id="rolJuegos" className="menu-item" to="/" > <FaCalendarAlt  className='iconMenu'/>  Rol de Juegos</Link>
          <Link id="noticias" className="menu-item" to="/noticias" > <FaNewspaper  className='iconMenu'/>  Noticias</Link>
          <button className='btn-cerrarSesion' onClick={()=>signOut(auth)}> Cerrar sesion</button>
        </Menu>
      );
    }
}
export default MenuAdmin;