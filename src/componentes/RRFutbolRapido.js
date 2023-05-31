import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ContenedorBotonCentrado, Boton } from '../elementos/ElementosFormularioJuegos';
import BtnRegresar from '../elementos/BtnRegresar';

const RRFutbolRapido = () => {
    const navigate = useNavigate();
    const handleRedirect = (ruta) => {
        navigate(ruta);
      };

  return (
    <div className='hero'>
        <nav>
            <img src="https://tinyurl.com/2obtocwe" alt=''/>
            <center><h2> Registrar Resultados Fútbol Rápido</h2></center> 
            <h3><img src="https://tinyurl.com/2kaldmbh" alt=''/></h3>
        </nav>
      
        <Helmet>
            <title>Registrar Resultados Fútbol Rápido </title>
        </Helmet>
        <main>
            <ContenedorBotonCentrado>
                <Boton onClick={() => handleRedirect('/RR-FR-VaronilMediaSuperior')}> Registrar Resultados Varonil Media Superior </Boton>
            </ContenedorBotonCentrado>
            <br/>
            <ContenedorBotonCentrado>
                <Boton onClick={() => handleRedirect('/RR-FR-FemenilMediaSuperior')}> Registrar Resultados Posiciones Femenil Media Superior </Boton>
            </ContenedorBotonCentrado>
            <br/>
            <ContenedorBotonCentrado>
            <Boton onClick={() => handleRedirect('/RR-FR-VaronilSuperior')}> Registrar Resultados Varonil Superior </Boton>
            </ContenedorBotonCentrado>
            <br/>
            <ContenedorBotonCentrado>
            <Boton onClick={() => handleRedirect('/RR-FR-FemenilSuperior')}> Registrar Resultados Femenil Superior </Boton>
            </ContenedorBotonCentrado>
            <br/>
            <ContenedorBotonCentrado>
              <BtnRegresar ruta = '/menu-admin'/>
            </ContenedorBotonCentrado>
        </main>
        
      </div>
  );
};
export default RRFutbolRapido;
