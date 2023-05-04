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
    
    render () {
      return (
        <Menu >
          <Link id="editarPerfil" className="menu-item" to="/"><FaUserEdit  className='iconMenu'/>  Editar perfil</Link>
          <Link id="estadisticas" className="menu-item" to="/" > <FaRegChartBar  className='iconMenu'/>  Estadísticas</Link>
          <Link id="rolJuegos" className="menu-item" to="/" > <TbSoccerField  className='iconMenu'/>  Rol de juegos</Link>
          <Link id="noticias" className="menu-item" to="/" > <FaNewspaper  className='iconMenu'/>  Noticias</Link>
          <center><button className='btn-cerrarSesion' onClick={()=>signOut(auth)}> Cerrar sesión</button></center>
        </Menu>
      );
    }
}
export default MenuJugador;