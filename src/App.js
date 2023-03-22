import React from 'react';
import { Link } from 'react-router-dom'

const App = () => {
  return ( 
    <div className="hero">
      <nav>
        <h2>Bienvenido</h2>
        <div className="menu">
          <button><Link to='/iniciar-sesion'>Inicia Sesión</Link></button>
          <button><Link to='/crear-cuenta'>Registrate</Link></button>
        </div>
      </nav>
    </div>
  );
}
 
export default App;