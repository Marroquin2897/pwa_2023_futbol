import React from 'react';
import { getAuth,signOut } from 'firebase/auth';
import { slide as Menu } from 'react-burger-menu'
import '../MenuSide.css';
import { Link } from 'react-router-dom';
import {FaUserPlus, FaRegChartBar, FaCalendarAlt, FaNewspaper} from "react-icons/fa";
import {firebaseApp} from "../firebase/firebaseConfig";



const auth=getAuth(firebaseApp);

class MenuAdmin extends React.Component  {
    
    render () {
      return (
        <Menu >
          <Link id="listaEscuela" className="menu-item" to="/lista-escuelas"> <FaUserPlus className='iconMenu'/>  Lista de Escuelas</Link>
          <Link id="estadisticas" className="menu-item" to="/estadisticas-fr" > <FaRegChartBar  className='iconMenu'/>  Tabla General de Fútbol Rápido </Link>
          <Link id="estadisticas" className="menu-item" to="/RR-FR-FemenilSuperior" > <FaRegChartBar  className='iconMenu'/>  Registrar Resultados Fútbol Rápido Femenil Nivel Superior </Link>
          <Link id="estadisticas" className="menu-item" to="/registrar-resultado" > <FaRegChartBar  className='iconMenu'/>  Registrar Resultados Fútbol Rápido Femenil Media Superior </Link>
          <Link id="estadisticas" className="menu-item" to="/registrar-resultado" > <FaRegChartBar  className='iconMenu'/>  Registrar Resultados Fútbol Asociación </Link>
          <Link id="rolJuegos" className="menu-item" to="/nuevo-torneo" > <FaCalendarAlt  className='iconMenu'/>  Nuevo Torneo </Link>
          <Link id="rolJuegos" className="menu-item" to="/lista-torneos" > <FaCalendarAlt  className='iconMenu'/>  Lista de Torneos </Link>
          <Link id="noticias" className="menu-item" to="/noticias" > <FaNewspaper  className='iconMenu'/>  Noticias</Link>
          <button className='btn-cerrarSesion' onClick={()=>signOut(auth)}> Cerrar sesión</button>
        </Menu>
      );
    }
}
export default MenuAdmin;