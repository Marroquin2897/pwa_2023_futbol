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
  handleCerrarSesion = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('infoUser');
        console.log('Sesión cerrada');
        // Realiza otras acciones después de cerrar sesión, como redirigir a la página de inicio de sesión, mostrar un mensaje, etc.
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
        // Manejo de errores al cerrar sesión
      });
  };
    render () {
      return (
        <Menu >
          
          <Link id="rolJuegos" className="menu-item" to="/nuevo-torneo" > <FaCalendarAlt  className='iconMenu'/>  Nuevo Torneo </Link>
          <Link id="rolJuegos" className="menu-item" to="/lista-torneos" > <FaListOl  className='iconMenu'/>  Lista de Torneos </Link>
          <Link id="listaEscuela" className="menu-item" to="/lista-esc-adm"> <MdSchool className='iconMenu'/>  Lista de Escuelas</Link>
          <Link id="listaJugadores" className="menu-item" to="/lista-jugadores-adm"> <MdSchool className='iconMenu'/>  Lista de Jugadores</Link>

          <Link id="resultadosFemenilAsociacionSuperior" className="menu-item" to="/RR-FA-FemenilSuperior" > <MdOutlineAppRegistration  className='iconMenu'/>  Registrar Resultados Fútbol Asociación Femenil Nivel Superior </Link><br/><br/>
          <Link id="resultadosFemenilAsociacionMediaSuperior" className="menu-item" to="/RR-FA-FemenilMediaSuperior" > <MdOutlineAppRegistration  className='iconMenu'/>  Registrar Resultados Fútbol Asociación Femenil Nivel Media Superior </Link><br/><br/>

          <Link id="resultadosFemenilRapidoSuperior" className="menu-item" to="/RR-FR-FemenilSuperior" > <MdOutlineAppRegistration  className='iconMenu'/>  Registrar Resultados Fútbol Rápido Femenil Nivel Superior </Link><br/><br/>
          <Link id="resultadosFemenilRapidoMediaSuperior" className="menu-item" to="/RR-FR-FemenilMediaSuperior" > <MdOutlineAppRegistration  className='iconMenu'/>  Registrar Resultados Fútbol Rápido Femenil Nivel Media Superior </Link><br/><br/>

          <Link id="resultadosFemenilFut7Superior" className="menu-item" to="/RR-F7-FemenilSuperior" > <MdOutlineAppRegistration  className='iconMenu'/>  Registrar Resultados Fútbol 7 Femenil Nivel Superior </Link><br/><br/>
          <Link id="resultadosFemenilFut7MediaSuperior" className="menu-item" to="/RR-F7-FemenilMediaSuperior" > <MdOutlineAppRegistration  className='iconMenu'/>  Registrar Resultados Fútbol 7 Femenil Nivel Media Superior </Link><br/><br/>

          <Link id="resultadosVaronilFutRapidoSuperior" className="menu-item" to="/RR-FR-VaronilSuperior" > <MdOutlineAppRegistration  className='iconMenu'/>  Registrar Resultados Fútbol Rápido Varonil Nivel Superior </Link><br/><br/>
          <Link id="resultadosVaronilFutRapidoMediaSuperior" className="menu-item" to="/RR-FR-VaronilMediaSuperior" > <MdOutlineAppRegistration  className='iconMenu'/>  Registrar Resultados Fútbol Rápido Varonil Nivel Media Superior </Link><br/><br/>

          <Link id="resultadosVaronilFut7Superior" className="menu-item" to="/RR-F7-VaronilSuperior" > <MdOutlineAppRegistration  className='iconMenu'/>  Registrar Resultados Fútbol 7 Varonil Nivel Superior </Link><br/><br/>
          <Link id="resultadosVaronilFut7MediaSuperior" className="menu-item" to="/RR-F7-VaronilMediaSuperior" > <MdOutlineAppRegistration  className='iconMenu'/>  Registrar Resultados Fútbol 7 Varonil Nivel Media Superior </Link><br/><br/>

          <Link id="resultadosVaronilFutAsociacionSuperior" className="menu-item" to="/RR-FA-VaronilSuperior" > <MdOutlineAppRegistration  className='iconMenu'/>  Registrar Resultados Fútbol Asociación Varonil Nivel Superior </Link><br/><br/>
          <Link id="resultadosVaronilFutAsociacionMediaSuperior" className="menu-item" to="/RR-FA-VaronilMediaSuperior" > <MdOutlineAppRegistration  className='iconMenu'/>  Registrar Resultados Asociación Varonil Nivel Media Superior </Link><br/><br/>


          <Link id="estadisticasFRS" className="menu-item" to="/estadisticas-fr" > <FaRegChartBar  className='iconMenu'/>  Tabla General de Posiciones de Fútbol Rápido Femenil Nivel Superior </Link><br/><br/><br/>
          <Link id="estadisticasFRMS" className="menu-item" to="/estadisticas-FRMS" > <FaRegChartBar  className='iconMenu'/>  Tabla General de Posiciones de Fútbol Rápido Femenil Nivel Media Superior </Link><br/><br/><br/>

          <Link id="estadisticasF7S" className="menu-item" to="/estadisticas-F7S" > <FaRegChartBar  className='iconMenu'/>  Tabla General de Posiciones de Fútbol 7 Femenil Nivel Superior </Link><br/><br/>
          <Link id="estadisticasF7MS" className="menu-item" to="/estadisticas-F7MS" > <FaRegChartBar  className='iconMenu'/>  Tabla General de Posiciones de Fútbol 7 Femenil Nivel Media Superior </Link><br/><br/>

          <Link id="estadisticasFAS" className="menu-item" to="/estadisticas-FAS" > <FaRegChartBar  className='iconMenu'/>  Tabla General de Posiciones de Fútbol Asociación Femenil Nivel Superior </Link><br/><br/>
          <Link id="estadisticasFAMS" className="menu-item" to="/estadisticas-FAMS" > <FaRegChartBar  className='iconMenu'/>  Tabla General de Posiciones de Fútbol Asociación Femenil Nivel Media Superior </Link><br/><br/>


          <Link id="estadisticasV7S" className="menu-item" to="/estadisticas-V7S" > <FaRegChartBar  className='iconMenu'/>  Tabla General de Posiciones de Fútbol 7 Varonil Nivel Superior </Link><br/><br/>
          <Link id="estadisticasV7MS" className="menu-item" to="/estadisticas-V7MS" > <FaRegChartBar  className='iconMenu'/>  Tabla General de Posiciones de Fútbol 7 Varonil Nivel Media Superior </Link><br/><br/>

          <Link id="estadisticasVRS" className="menu-item" to="/estadisticas-VRS" > <FaRegChartBar  className='iconMenu'/>  Tabla General de Posiciones de Fútbol Rápido Varonil Nivel Superior </Link><br/><br/>
          <Link id="estadisticasVRMS" className="menu-item" to="/estadisticas-VRMS" > <FaRegChartBar  className='iconMenu'/>  Tabla General de Posiciones de Fútbol Rápido Varonil Nivel Media Superior </Link><br/><br/>

          <Link id="estadisticasVAS" className="menu-item" to="/estadisticas-VAS" > <FaRegChartBar  className='iconMenu'/>  Tabla General de Posiciones de Fútbol Asociación Varonil Nivel Superior </Link><br/><br/>
          <Link id="estadisticasVAMS" className="menu-item" to="/estadisticas-VAMS" > <FaRegChartBar  className='iconMenu'/>  Tabla General de Posiciones de Fútbol Asociación Varonil Nivel Media Superior </Link><br/><br/>

          <Link id="noticias" className="menu-item" to="/noticias" > <FaNewspaper  className='iconMenu'/>  Noticias</Link>
          <center><button className='btn-cerrarSesion' onClick={this.handleCerrarSesion}> Cerrar sesión</button></center>
        </Menu>
      );
    }
}
export default MenuAdmin;