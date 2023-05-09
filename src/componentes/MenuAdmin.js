import React from 'react';
import { getAuth,signOut } from 'firebase/auth';
import { slide as Menu } from 'react-burger-menu'
import '../MenuSide.css';
import { Link } from 'react-router-dom';
import {FaRegChartBar, FaCalendarAlt, FaNewspaper, FaListOl} from "react-icons/fa";
import {MdOutlineAppRegistration, MdSchool} from "react-icons/md";
import {firebaseApp} from "../firebase/firebaseConfig";



const auth=getAuth(firebaseApp);

class MenuAdmin extends React.Component  {
    
    render () {
      return (
        <Menu >
          
          <Link id="rolJuegos" className="menu-item" to="/nuevo-torneo" > <FaCalendarAlt  className='iconMenu'/>  Nuevo Torneo </Link>
          <Link id="rolJuegos" className="menu-item" to="/lista-torneos" > <FaListOl  className='iconMenu'/>  Lista de Torneos </Link>
          <Link id="rolJuegos" className="menu-item" to="/round-prueba" > <FaListOl  className='iconMenu'/>  Round ROBIN </Link>
          <Link id="listaEscuela" className="menu-item" to="/lista-esc-adm"> <MdSchool className='iconMenu'/>  Lista de Escuelas</Link>
          <Link id="listaJugadores" className="menu-item" to="/lista-jugadores-adm"> <MdSchool className='iconMenu'/>  Lista de Jugadores</Link>
          <Link id="estadisticas" className="menu-item" to="/estadisticas-fr" > <FaRegChartBar  className='iconMenu'/>  Tabla General de Posiciones de Fútbol Rápido </Link><br/>
          <Link id="estadisticas" className="menu-item" to="/RR-FR-FemenilSuperior" > <MdOutlineAppRegistration  className='iconMenu'/>  Registrar Resultados Fútbol Rápido Femenil Nivel Superior </Link><br/><br/><br/>

          <Link id="noticias" className="menu-item" to="/noticias" > <FaNewspaper  className='iconMenu'/>  Noticias</Link>
          <center><button className='btn-cerrarSesion' onClick={()=>signOut(auth)}> Cerrar sesión</button></center>
        </Menu>
      );
    }
}
export default MenuAdmin;