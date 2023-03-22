import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import '../MenuSide.css';
import { Link } from 'react-router-dom';
import {FaUserEdit, FaRegChartBar, FaCalendarAlt, FaRegNewspaper} from "react-icons/fa";

const fontStyles = {color: '#560000', fontSize: '60px'};

class MenuAdmin extends React.Component  {
    
    render () {
      return (
        <Menu >
          <Link id="editarPerfil" className="menu-item" to="/"><FaUserEdit  style={fontStyles} /> Editar Perfil</Link>
          <Link id="estadisticas" className="menu-item" to="/" > <FaRegChartBar  style={fontStyles} />Estadisticas</Link>
          <Link id="rolJuegos" className="menu-item" to="/" > <FaCalendarAlt  style={fontStyles} />Rol de Juegos</Link>
          <Link id="noticias" className="menu-item" to="/" > <FaRegNewspaper  style={fontStyles} />Noticias</Link>
        </Menu>
      );
    }
}
export default MenuAdmin;