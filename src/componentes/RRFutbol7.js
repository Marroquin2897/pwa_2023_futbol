import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ContenedorBotonCentrado, Boton } from '../elementos/ElementosFormularioJuegos';
import BtnRegresar from '../elementos/BtnRegresar';

const RRFutbol7 = () => {
    const navigate = useNavigate();
    const handleRedirect = (ruta) => {
        navigate(ruta);
      };

  return (
    <div className='hero'>
        <nav>
            <img src="https://tinyurl.com/2obtocwe" alt=''/>
            <center><h2> Registrar Resultados Fútbol 7</h2></center> 
            <h3><img src="https://tinyurl.com/2kaldmbh" alt=''/></h3>
        </nav>
      
        <Helmet>
            <title>Registrar Resultados Fútbol 7 </title>
        </Helmet>
        <main>
            <ContenedorBotonCentrado>
                <Boton onClick={() => handleRedirect('/RR-F7-VaronilMediaSuperior')}> Registrar Resultados Varonil Media Superior </Boton>
            </ContenedorBotonCentrado>
            <br/>
            <ContenedorBotonCentrado>
                <Boton onClick={() => handleRedirect('/RR-F7-FemenilMediaSuperior')}> Registrar Resultados Posiciones Femenil Media Superior </Boton>
            </ContenedorBotonCentrado>
            <br/>
            <ContenedorBotonCentrado>
            <Boton onClick={() => handleRedirect('/RR-F7-VaronilSuperior')}> Registrar Resultados Varonil Superior </Boton>
            </ContenedorBotonCentrado>
            <br/>
            <ContenedorBotonCentrado>
            <Boton onClick={() => handleRedirect('/RR-F7-FemenilSuperior')}> Registrar Resultados Femenil Superior </Boton>
            </ContenedorBotonCentrado>
            <br/>
            <ContenedorBotonCentrado>
              <BtnRegresar ruta = '/menu-admin'/>
            </ContenedorBotonCentrado>
        </main>
        
      </div>
  );
};
export default RRFutbol7;
