import React from 'react';
import { getAuth,signOut } from 'firebase/auth';
import { slide as Menu } from 'react-burger-menu'
import '../MenuSide.css';
import { Link } from 'react-router-dom';
import {FaUserEdit, FaPlusCircle, FaUserPlus, FaClipboardList, FaListUl, FaRegChartBar, FaCalendarAlt} from "react-icons/fa";
import {firebaseApp} from "../firebase/firebaseConfig";




const auth=getAuth(firebaseApp);

class MenuProfesor extends React.Component  {
    
    render() {
      return (
         
        <Menu id="menuProfesor" >            
          <Link id="editarPerfil" className="menu-item" to={`/editar-perfil/${auth.currentUser.uid}`}><FaUserEdit  className='iconMenu'/>  Editar Perfil</Link>
          <Link id="registrarEscuela" className="menu-item" to="/registrar-escuela" > <FaPlusCircle className='iconMenu'/>  Registrar Escuela</Link>
          <Link id="registrarJugador" className="menu-item" to="/registrar-jugador"> <FaUserPlus className='iconMenu'/>  Registrar Jugador</Link>
          <Link id="listaJugador" className="menu-item" to="/lista-jugadores"> <FaClipboardList className='iconMenu'/>  Lista de Jugadores</Link>
          <Link id="listaEscuela" className="menu-item" to="/lista-escuelas"> <FaListUl className='iconMenu'/>  Lista de Escuelas</Link>
          <Link id="estadisticas" className="menu-item" to="/" > <FaRegChartBar className='iconMenu'/>  Estadisticas</Link>
          <Link id="rolJuegos" className="menu-item" to="/" > <FaCalendarAlt className='iconMenu'/>  Rol de Juegos</Link>
          <button className='btn-cerrarSesion' onClick={()=>signOut(auth)}> Cerrar sesion</button>
        </Menu>
      );
    }       
}
export default MenuProfesor;
   