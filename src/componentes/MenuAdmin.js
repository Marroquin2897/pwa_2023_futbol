import React from 'react';
import { getAuth,signOut } from 'firebase/auth';
import { slide as Menu } from 'react-burger-menu'
import '../MenuSide.css';
import { Link } from 'react-router-dom';
import {FaUserPlus, FaRegChartBar, FaCalendarAlt, FaNewspaper, FaRegFutbol, FaFutbol, FaListOl} from "react-icons/fa";
import {MdOutlineAppRegistration, MdSchool} from "react-icons/md";
import {firebaseApp} from "../firebase/firebaseConfig";



const auth=getAuth(firebaseApp);

class MenuAdmin extends React.Component  {
    
    render () {
      return (
        <Menu >


          <Link id="listaEscuela" className="menu-item" to="/lista-escuelas"> <FaUserPlus className='iconMenu'/>  Lista de Escuelas</Link>
          <Link id="estadisticas" className="menu-item" to="/estadisticas-fr" > <FaRegChartBar  className='iconMenu'/>  Tabla General de Fútbol Rápido </Link>
          <Link id="estadisticas" className="menu-item" to="/RR-FR-FemenilSuperior" > <FaRegChartBar  className='iconMenu'/>  Registrar Resultados Fútbol Rápido Femenil Nivel Superior </Link>
          
          <Link id="rolJuegos" className="menu-item" to="/nuevo-torneo" > <FaCalendarAlt  className='iconMenu'/>  Nuevo Torneo </Link>
          <Link id="rolJuegos" className="menu-item" to="/lista-torneos" > <FaCalendarAlt  className='iconMenu'/>  Lista de Torneos </Link>

          <Link id="listaEscuela" className="menu-item" to="/lista-escuelas"> <MdSchool className='iconMenu'/>  Lista de Escuelas</Link>

          <Link id="listaEscuela" className="menu-item" to="/lista-esc-adm"> <MdSchool className='iconMenu'/>  Lista de Escuelas</Link>

          <Link id="estadisticas" className="menu-item" to="/estadisticas-fr" > <FaRegChartBar  className='iconMenu'/>  Tabla General de Fútbol Rápido </Link><br/>
          <Link id="estadisticas" className="menu-item" to="/RR-FR-FemenilSuperior" > <MdOutlineAppRegistration  className='iconMenu'/>  Registrar Resultados Fútbol Rápido Femenil Nivel Superior </Link><br/><br/><br/>
          <Link id="estadisticas" className="menu-item" to="/registrar-resultado" > <MdOutlineAppRegistration  className='iconMenu'/>  Registrar Resultados Fútbol Rápido Femenil Media Superior </Link><br/><br/><br/>
          <Link id="estadisticas" className="menu-item" to="/registrar-resultado" > <MdOutlineAppRegistration  className='iconMenu'/>  Registrar Resultados Fútbol Asociación </Link><br/><br/><br/>
          <Link id="rolJuegos" className="menu-item" to="/nuevo-torneo" > <FaRegFutbol  className='iconMenu'/>  Nuevo Torneo </Link><br/>
          <Link id="rolJuegos" className="menu-item" to="/lista-torneos" > <FaListOl  className='iconMenu'/>  Lista de Torneos </Link><br/>

          <Link id="noticias" className="menu-item" to="/noticias" > <FaNewspaper  className='iconMenu'/>  Noticias</Link>
          <center><button className='btn-cerrarSesion' onClick={()=>signOut(auth)}> Cerrar sesión</button></center>
        </Menu>
      );
    }
}
export default MenuAdmin;