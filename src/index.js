import React from 'react';
import  ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './componentes/Login';
import RegistroUsuario from './componentes/RegistroUsuario';
import HomePrincipal from './componentes/HomePrincipal';
import Inicio from './componentes/Inicio';
import Rol from './Rol';
import {Helmet} from 'react-helmet';
import favicon from './imagenes/icono2-burrito.png';
import './App.css';
WebFont.load({
  google: {
    families: ['Ubuntu: 400,500,700', 'Droid Serif']
  }
});

const Index = () => {
  return ( 
    <>
    <Helmet>
      <link rel='shortcut icon' href={favicon} type='image/x-icon'/>
    </Helmet>
    <BrowserRouter>
    <Routes>
      <Route path="/iniciar-sesion" element = {<Login/>}/>
      <Route path="/crear-cuenta" element = {<RegistroUsuario/>}/>
      <Route path="/sesion-iniciada" element = {<HomePrincipal/>}/>
      <Route path="/rol" element = {<Rol/>}/>
      <Route path="/" element = {<App/>}/>
    </Routes>
    
    </BrowserRouter>
    </>
    
    
   );
}

ReactDOM.render(<Index/>,document.getElementById('root'));


