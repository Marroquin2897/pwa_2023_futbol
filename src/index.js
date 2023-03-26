import React from 'react';
import  ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './componentes/Login';
import RegistroUsuario from './componentes/RegistroUsuario';
import HomePrincipal from './componentes/HomePrincipal';
import ForgotPassword from './componentes/ForgotPassword';
import VistaAdmi from './vistas/VistaAdmi';
import VistaProfe from './vistas/VistaProfe';
import Rol from './Rol';
import RegistrarEscuela from './componentes/RegistrarEscuela';
import RegistrarJugador from './componentes/RegistrarJugador';
import {Helmet} from 'react-helmet';
import favicon from './imagenes/icono2-burrito.png';
import './App.css';
import { AuthProvider } from './contextos/AuthContext';
import RutaPrivada from './componentes/RutaPrivada';

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
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/iniciar-sesion" element = {<Login/>}/>
          <Route path="/crear-cuenta" element = {<RegistroUsuario/>}/>
          <Route path="/sesion-iniciada" element = {<HomePrincipal/>}/>
          <Route path="/forgot-password" element = {<ForgotPassword/>}/>
          <Route path="/rol" element = {<Rol/>}/>
          <Route path="/" element = {<App/>}/>

          <Route path="/registrar-escuela" element={
              <RutaPrivada>
                <RegistrarEscuela/>
              </RutaPrivada>
            }/>
          <Route path="/registrar-jugador" element={
              <RutaPrivada>
                <RegistrarJugador/>
              </RutaPrivada>
            }/>
          <Route path="/menu-profe" element={
              <RutaPrivada>
                <VistaProfe/>
              </RutaPrivada>
            }/>
        </Routes>
    
    </BrowserRouter>
    </AuthProvider>
    
    </>
    
    
   );
}

ReactDOM.render(<Index/>,document.getElementById('root'));


