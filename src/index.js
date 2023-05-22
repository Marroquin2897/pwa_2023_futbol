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
import EditarEscuela from './componentes/EditarEscuela';
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
import ListaEscuelasAdm from './componentes/ListaEscuelasAdm';
import TodosContraTodos from './componentes/RoundPrueba';
import ListaJugadoresAdm from './componentes/ListaJugadoresAdm';
import RegistrarResultadosFemenilSuperiorRapido from './componentes/RegistrarResultadosFemenilSuperiorRapido';
import VistaJugador from './vistas/VistaJugador';
import RegistrarResultadosVaronilSuperiorFut7 from './componentes/RegistrarResultadosVaronilSuperiorFut7';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import RegistrarResultadosFemenilSuperiorFut7 from './componentes/RegistrarResultadosFemenilSuperiorFut7';
import RRFemenilSuperiorFutAsociacion from './componentes/RRFemenilSuperiorFutAsociacion';
import RRFemenilRapidoMediaSuperior from './componentes/RRFemenilRapidoMediaSuperior';
import RRFemenilFut7MediaSuperior from './componentes/RRFemenilFut7MediaSuperior';
import RRVaronilSuperiorFutRapido from './componentes/RRVaronilSuperiorFutRapido';
import RRVaronilSuperiorFutAsociacion from './componentes/RRVaronilSuperiorFutAsociacion';
import RRVaronilMediaSuperiorFut7 from './componentes/RRVaronilMediaSuperiorFut7';
import RRVaronilMediaSuperiorFutRapido from './componentes/RRVaronilMediaSuperiorFutRapido';
import RRVaronilMediaSuperiorFutAsociacion from './componentes/RRVaronilMediaSuperiorFutAsociacion';
import EstadisticasFemenilMediaSuperiorAsociación from './componentes/EstadisticasFemenilMediaSuperiorAsociación';
import EstadisticasFemenilSuperiorFutAsociación from './componentes/EstadisticasFemenilSuperiorFutAsociacion';
import EstadisticasFemenilMediaSuperiorFut7 from './componentes/EstadisticasFemenilMediaSuperiorFut7';
import EstadisticasFemenilMediaSuperiorFutRapido from './componentes/EstadisticasFemenilMediaSuperiorFutRapido';
import EstadisticasVaronilSuperiorFut7 from './componentes/EstadisticasVaronilSuperiorFut7';
import EstadisticasVaronilSuperiorFutRapido from './componentes/EstadisticasVaronilSuperiorFutRapido';
import EstadisticasVaronilSuperiorFutAsociación from './componentes/EstadisticasVaronilSuperiorFutAsociacion';
import EstadisticasVaronilMediaSuperiorFut7 from './componentes/EstadisticasVaronilMediaSuperiorFut7';
import EstadisticasVaronilMediaSuperiorFutRapido from './componentes/EstadisticasVaronilMediaSuperiorFutRapido';
import EstadisticasVaronilMediaSuperiorFutAsociacion from './componentes/EstadisticasVaronilMediaSuperiorFutAsociacion';
import RRFemenilMediaSuperiorFutAsociacion from './componentes/RRFemenilMediaSuperiorFutAsociacion';
import EstadisticasFemenilSuperiorFut7 from './componentes/EstadisticasFemenilSuperiorFut7';
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
            <Route path="/lista-jugadores-adm" element={
              <RutaPrivada>
                <ListaJugadoresAdm/>
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
            <Route path="/editar-escuela/:id" element={
              <RutaPrivada>
                <EditarEscuela/>
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
            <Route path="/menu-alumno" element={
              <RutaPrivada>
                <VistaJugador/>
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
            <Route path="/round-prueba" element={
              <RutaPrivada>
                <TodosContraTodos/>
              </RutaPrivada>
            }/>
            <Route path="/grupos" element={
              <RutaPrivada>
                <Grupos/>
              </RutaPrivada>
            }/>
            
            <Route path="/RR-FA-FemenilSuperior" element={
              <RutaPrivada>
                <RRFemenilSuperiorFutAsociacion/>
              </RutaPrivada>
            }/>
            <Route path="/RR-FA-FemenilMediaSuperior" element={
              <RutaPrivada>
                <RRFemenilMediaSuperiorFutAsociacion/>
              </RutaPrivada>
            }/>
            <Route path="/RR-F7-FemenilSuperior" element={
              <RutaPrivada>
                <RegistrarResultadosFemenilSuperiorFut7/>
              </RutaPrivada>
            }/>
            <Route path="/RR-FR-FemenilSuperior" element={
              <RutaPrivada>
                <RegistrarResultadosFemenilSuperiorRapido/>
              </RutaPrivada>
            }/>
            
            <Route path="/RR-FR-FemenilMediaSuperior" element={
              <RutaPrivada>
                <RRFemenilRapidoMediaSuperior/>
              </RutaPrivada>
            }/>
            <Route path="/RR-F7-FemenilMediaSuperior" element={
              <RutaPrivada>
                <RRFemenilFut7MediaSuperior/>
              </RutaPrivada>
            }/>

            <Route path="/RR-F7-VaronilSuperior" element={
              <RutaPrivada>
                <RegistrarResultadosVaronilSuperiorFut7/>
              </RutaPrivada>
            }/>
            <Route path="/RR-FR-VaronilSuperior" element={
              <RutaPrivada>
                <RRVaronilSuperiorFutRapido/>
              </RutaPrivada>
            }/>
            <Route path="/RR-FA-VaronilSuperior" element={
              <RutaPrivada>
                <RRVaronilSuperiorFutAsociacion/>
              </RutaPrivada>
            }/>
            <Route path="/RR-F7-VaronilMediaSuperior" element={
              <RutaPrivada>
                <RRVaronilMediaSuperiorFut7/>
              </RutaPrivada>
            }/>
            <Route path="/RR-FR-VaronilMediaSuperior" element={
              <RutaPrivada>
                <RRVaronilMediaSuperiorFutRapido/>
              </RutaPrivada>
            }/>
            <Route path="/RR-FA-VaronilMediaSuperior" element={
              <RutaPrivada>
                <RRVaronilMediaSuperiorFutAsociacion
                />
              </RutaPrivada>
            }/> 
            <Route path="/estadisticas-fr" element={
              <RutaPrivada>
                <EstadisticasFR/>
              </RutaPrivada>
            }/>
            <Route path="/estadisticas-FAMS" element={
              <RutaPrivada>
                <EstadisticasFemenilMediaSuperiorAsociación/>
              </RutaPrivada>
            }/>
            <Route path="/estadisticas-FAS" element={
              <RutaPrivada>
                <EstadisticasFemenilSuperiorFutAsociación/>
              </RutaPrivada>
            }/>
            <Route path="/estadisticas-F7S" element={
              <RutaPrivada>
                <EstadisticasFemenilSuperiorFut7/>
              </RutaPrivada>
            }/>
            estadisticas-F7S
            <Route path="/estadisticas-F7MS" element={
              <RutaPrivada>
                <EstadisticasFemenilMediaSuperiorFut7/>
              </RutaPrivada>
            }/>
            <Route path="/estadisticas-FRMS" element={
              <RutaPrivada>
                <EstadisticasFemenilMediaSuperiorFutRapido/>
              </RutaPrivada>
            }/>
            <Route path="/estadisticas-V7S" element={
              <RutaPrivada>
                <EstadisticasVaronilSuperiorFut7/>
              </RutaPrivada>
            }/>
            <Route path="/estadisticas-VRS" element={
              <RutaPrivada>
                <EstadisticasVaronilSuperiorFutRapido/>
              </RutaPrivada>
            }/>
            <Route path="/estadisticas-VAS" element={
              <RutaPrivada>
                <EstadisticasVaronilSuperiorFutAsociación/>
              </RutaPrivada>
            }/>
            <Route path="/estadisticas-V7MS" element={
              <RutaPrivada>
                <EstadisticasVaronilMediaSuperiorFut7/>
              </RutaPrivada>
            }/>
            <Route path="/estadisticas-VRMS" element={
              <RutaPrivada>
                <EstadisticasVaronilMediaSuperiorFutRapido/>
              </RutaPrivada>
            }/>
            <Route path="/estadisticas-VAMS" element={
              <RutaPrivada>
                <EstadisticasVaronilMediaSuperiorFutAsociacion/>
              </RutaPrivada>
            }/>
            
            
            
            
            

            
          
        </Routes>
    
    </BrowserRouter>
    </AuthProvider>
    </>
     
   );
}

ReactDOM.render(<Index/>,document.getElementById('root'));
serviceWorkerRegistration.register({
  onUpdate: async (registration) => {
    // Corremos este código si hay una nueva versión de nuestra app
    // Detalles en: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
    if (registration && registration.waiting) {
      await registration.unregister();
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      // Des-registramos el SW para recargar la página y obtener la nueva versión. Lo cual permite que el navegador descargue lo nuevo y que invalida la cache que tenía previamente.
      window.location.reload();
    }
  },
});


