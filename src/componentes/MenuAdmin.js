import React from 'react';
import { getAuth,signOut } from 'firebase/auth';
import { slide as Menu } from 'react-burger-menu'
import '../MenuSide.css';
import { Link } from 'react-router-dom';
import {FaUserEdit, FaPlusCircle, FaUserPlus, FaRegChartBar, FaCalendarAlt, FaNewspaper} from "react-icons/fa";
import {firebaseApp} from "../firebase/firebaseConfig";



const auth=getAuth(firebaseApp);

class MenuAdmin extends React.Component  {
    
    render () {
      return (
        <Menu >
          
          <Link id="registrarEscuela" className="menu-item" to="/" > <FaPlusCircle  className='iconMenu'/>  Registrar Escuela</Link>
           <Link id="registrarJugador" className="menu-item" to="/"> <FaUserPlus  className='iconMenu'/>  Registrar Jugador</Link>
          <Link id="estadisticas" className="menu-item" to="/" > <FaRegChartBar  className='iconMenu'/>  Estadisticas</Link>
          <Link id="rolJuegos" className="menu-item" to="/" > <FaCalendarAlt  className='iconMenu'/>  Rol de Juegos</Link>
          <Link id="noticias" className="menu-item" to="/" > <FaNewspaper  className='iconMenu'/>  Noticias</Link>
          <button className='btn-cerrarSesion' onClick={()=>signOut(auth)}> Cerrar sesión</button>
        </Menu>
      );
    }
}
export default MenuAdmin;