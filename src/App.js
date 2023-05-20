import React from 'react';
import {Link} from 'react-router-dom'
import {Helmet} from 'react-helmet';
import Layout from './componentes/Layout';

const App = () => {
  return ( 
    <div className="hero">
      <nav>
      <img src="https://tinyurl.com/2obtocwe"/>
        <h2>PoliKickerFut7RA</h2> 
        <h3><img src="https://tinyurl.com/2kaldmbh"/></h3>
      </nav>
      <Helmet>
        <title>PoliKickerFut7RA</title>
      </Helmet>  
      <Layout>
        
      </Layout>
      <section className='login'>
        <div className='loginContainer'> 
            <h1>Acceso</h1> <br/><br/>
            <div className="menu2">
            <Link to='/iniciar-sesion'><button>Inicia sesión</button></Link> <br/><br/><br/><br/>
            </div><div className='menu'>
            <Link to='/crear-cuenta'><button>Regístrate</button></Link>
            </div>
        </div>
      </section>
   </div>
  );
}
 
export default App;
 

