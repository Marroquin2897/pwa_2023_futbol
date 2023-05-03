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
          <Link id="editarPerfil" className="menu-item" to={`/editar-perfil/${auth.currentUser.uid}`}><FaUserEdit  className='iconMenu'/>  Editar Perfil</Link><br/>
          <Link id="registrarEscuela" className="menu-item" to="/registrar-escuela" > <FaPlusCircle className='iconMenu'/>  Registrar Escuela</Link><br/>
          <Link id="registrarJugador" className="menu-item" to="/registrar-jugador"> <FaUserPlus className='iconMenu'/>  Registrar Jugador</Link><br/>
          <Link id="listaJugador" className="menu-item" to="/lista-jugadores"> <FaClipboardList className='iconMenu'/>  Lista de Jugadores</Link><br/>
          <Link id="listaEscuela" className="menu-item" to="/lista-escuelas"> <FaListUl className='iconMenu'/>  Lista de Escuelas</Link><br/>
          <Link id="estadisticas" className="menu-item" to="/" > <FaRegChartBar className='iconMenu'/>  Estadisticas</Link><br/>
          <Link id="rolJuegos" className="menu-item" to="/" > <FaCalendarAlt className='iconMenu'/>  Rol de Juegos</Link><br/>
          <button className='btn-cerrarSesion' onClick={()=>signOut(auth)}> Cerrar sesion</button><br/>
        </Menu>
      );
    }       
}
export default MenuProfesor;
   