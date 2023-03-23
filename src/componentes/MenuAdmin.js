import React from 'react';
import firebaseApp from '../firebase/firebaseConfig';
import { slide as Menu } from 'react-burger-menu'
import '../MenuSide.css';
import { Link } from 'react-router-dom';
import {FaUserEdit, FaRegChartBar, FaCalendarAlt, FaNewspaper} from "react-icons/fa";
import { getAuth,signOut } from 'firebase/auth';

const fontStyles = {color: '#fff',  width: '60px', height: '50px' };
const auth=getAuth(firebaseApp);

class MenuAdmin extends React.Component  {
    
    render () {
      return (
        <Menu >
          <Link id="editarPerfil" className="menu-item" to="/"><FaUserEdit  style={fontStyles} /> Editar Perfil</Link>
          <Link id="estadisticas" className="menu-item" to="/" > <FaRegChartBar  style={fontStyles} /> Estadisticas</Link>
          <Link id="rolJuegos" className="menu-item" to="/" > <FaCalendarAlt  style={fontStyles} /> Rol de Juegos</Link>
          <Link id="noticias" className="menu-item" to="/" > <FaNewspaper  style={fontStyles} /> Noticias</Link>
          <button className='btn-cerrarSesion' onClick={()=>signOut(auth)}> Cerrar sesion</button>
        </Menu>
      );
    }
}
export default MenuAdmin;