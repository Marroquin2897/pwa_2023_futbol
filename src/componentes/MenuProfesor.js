import React from 'react';
import firebaseApp from '../firebase/firebaseConfig';
import { getAuth,signOut } from 'firebase/auth';
import { slide as Menu } from 'react-burger-menu'
import '../MenuSide.css';
import { Link } from 'react-router-dom';
import {FaPlusCircle, FaUserPlus, FaRegChartBar, FaCalendarAlt} from "react-icons/fa";

const auth=getAuth(firebaseApp);

class MenuProfesor extends React.Component  {
    
    render () {
        return (
          <Menu id="menuProfesor" >
            <Link id="registrarEscuela" className="menu-item" to="/" > <FaPlusCircle className='iconMenu'/>  Registrar Escuela</Link>
            <Link id="registrarJugador" className="menu-item" to="/"> <FaUserPlus className='iconMenu'/>  Registrar Jugador</Link>
            <Link id="estadisticas" className="menu-item" to="/" > <FaRegChartBar className='iconMenu'/>  Estadisticas</Link>
            <Link id="rolJuegos" className="menu-item" to="/" > <FaCalendarAlt className='iconMenu'/>  Rol de Juegos</Link>
            <button className='btn-cerrarSesion' onClick={()=>signOut(auth)}> Cerrar sesion</button>
          </Menu>
        );
      }
}
export default MenuProfesor;
   