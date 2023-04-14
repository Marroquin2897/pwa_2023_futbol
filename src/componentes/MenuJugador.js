import React from 'react';

import { getAuth,signOut } from 'firebase/auth';
import { slide as Menu } from 'react-burger-menu'
import '../MenuSide.css';
import { Link } from 'react-router-dom';
import {FaUserEdit, FaRegChartBar, FaCalendarAlt, FaNewspaper} from "react-icons/fa";
import {firebaseApp} from "../firebase/firebaseConfig";



const auth=getAuth(firebaseApp);

class MenuJugador extends React.Component  {
    render () {
      return (
        <Menu >          
        <Link id="editarPerfil" className="menu-item" to={`/editar-perfil/${auth.currentUser.uid}`}><FaUserEdit  className='iconMenu'/>  Editar Perfil</Link>
        <Link id="estadisticas" className="menu-item" to="/" > <FaRegChartBar  className='iconMenu'/>  Estadisticas</Link>
        <Link id="rolJuegos" className="menu-item" to="/" > <FaCalendarAlt  className='iconMenu'/>  Rol de Juegos</Link>
        <Link id="noticias" className="menu-item" to="/noticias" > <FaNewspaper  className='iconMenu'/>  Noticias</Link>
        <button className='btn-cerrarSesion' onClick={()=>signOut(auth)}> Cerrar sesion</button>
      </Menu>
  );
    }
      
    
}
export default MenuJugador;