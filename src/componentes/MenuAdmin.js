import React from 'react';
import firebaseApp from '../firebase/firebaseConfig';
import { getAuth,signOut } from 'firebase/auth';
import { slide as Menu } from 'react-burger-menu'
import '../MenuSide.css';
import { Link } from 'react-router-dom';
import {FaUserEdit, FaPlusCircle, FaUserPlus, FaRegChartBar, FaCalendarAlt, FaNewspaper} from "react-icons/fa";

const auth=getAuth(firebaseApp);

class MenuAdmin extends React.Component  {
    
    render () {
      return (
        <Menu >
          <Link id="editarPerfil" className="menu-item" to="/"><FaUserEdit  className='iconMenu'/>  Editar perfil</Link>
          <Link id="registrarEscuela" className="menu-item" to="/" > <FaPlusCircle  className='iconMenu'/>  Registrar escuela</Link>
           <Link id="registrarJugador" className="menu-item" to="/"> <FaUserPlus  className='iconMenu'/>  Registrar jugador</Link>
          <Link id="estadisticas" className="menu-item" to="/" > <FaRegChartBar  className='iconMenu'/>  Estadísticas</Link>
          <Link id="rolJuegos" className="menu-item" to="/" > <FaCalendarAlt  className='iconMenu'/>  Rol de juegos</Link>
          <Link id="noticias" className="menu-item" to="/" > <FaNewspaper  className='iconMenu'/>  Noticias</Link>
          <button className='btn-cerrarSesion' onClick={()=>signOut(auth)}> Cerrar sesión</button>
        </Menu>
      );
    }
}
export default MenuAdmin;