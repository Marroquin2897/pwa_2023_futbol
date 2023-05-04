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
import ListaJugadores from './componentes/ListaJugadores';
import ListaEscuelas from './componentes/ListaEscuelas';
import EditarJugador from './componentes/EditarJugador';
import Noticias from './componentes/Noticias';
import {Helmet} from 'react-helmet';
import favicon from './imagenes/icono2-burrito.png';
import './App.css';
import { AuthProvider } from './contextos/AuthContext';
import RutaPrivada from './componentes/RutaPrivada';
import ListaJugadoresFem from './componentes/ListaJugadoresFem';
import ListaJugadoresMas from './componentes/ListaJugadoresMas';
import EditarUsuario from './componentes/EditarUsuario';
import Torneo from './componentes/Torneo';
import ListaTorneos from './componentes/ListaTorneos';
import RoundRobin from './componentes/RoundRobind';
import Grupos from './componentes/Grupos';
import EstadisticasFR from './componentes/EstadisticasFR';
import RegistrarResultados from './componentes/RegistrarResultados';
import ListaEscuelasAdm from './componentes/ListaEscuelasAdm';


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
            <Route path="/lista-jugadores" element={
              <RutaPrivada>
                <ListaJugadores/>
              </RutaPrivada>
            }/>
            <Route path="/lista-escuelas" element={
              <RutaPrivada>
                <ListaEscuelas/>
              </RutaPrivada>
            }/>
            <Route path="/lista-esc-adm" element={
              <RutaPrivada>
                <ListaEscuelasAdm/>
              </RutaPrivada>
            }/>
            <Route path="/equipo-femenil/:id" element={
              <RutaPrivada>
                <ListaJugadoresFem/>
              </RutaPrivada>
            }/>
            <Route path="/equipo-varonil/:id" element={
              <RutaPrivada>
                <ListaJugadoresMas/>
              </RutaPrivada>
            }/>

              <Route path="/editar-jugador/:id" element={
              <RutaPrivada>
                <EditarJugador/>
              </RutaPrivada>
            }/>
              <Route path="/noticias" element={
                <RutaPrivada>
                  <Noticias/>
                </RutaPrivada>
            }/>
            <Route path="/editar-perfil/:id" element={
              <RutaPrivada>
                <EditarUsuario/>
              </RutaPrivada>
            }/>
          <Route path="/menu-profe" element={
              <RutaPrivada>
                <VistaProfe/>
              </RutaPrivada>
            }/>
          <Route path="/menu-admin" element={
              <RutaPrivada>
                <VistaAdmi/>
              </RutaPrivada>
            }/>
          <Route path="/nuevo-torneo" element={
              <RutaPrivada>
                <Torneo/>
              </RutaPrivada>
            }/>
          <Route path="/lista-torneos" element={
              <RutaPrivada>
                <ListaTorneos/>
              </RutaPrivada>
            }/>
            <Route path="/round-robin" element={
              <RutaPrivada>
                <RoundRobin/>
              </RutaPrivada>
            }/>
            <Route path="/grupos" element={
              <RutaPrivada>
                <Grupos/>
              </RutaPrivada>
            }/>
            <Route path="/estadisticas-fr" element={
              <RutaPrivada>
                <EstadisticasFR/>
              </RutaPrivada>
            }/>
            <Route path="/RR-FR-FemenilSuperior" element={
              <RutaPrivada>
                <RegistrarResultados/>
              </RutaPrivada>
            }/>
        </Routes>
    
    </BrowserRouter>
    </AuthProvider>
    
    </>
    
    
   );
}

ReactDOM.render(<Index/>,document.getElementById('root'));


