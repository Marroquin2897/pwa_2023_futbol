import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ContenedorBotonCentrado, Boton } from '../elementos/ElementosFormularioJuegos';
import BtnRegresar from '../elementos/BtnRegresar';

const TGFutbol7 = () => {
    const navigate = useNavigate();
    const handleRedirect = (ruta) => {
        navigate(ruta);
      };

  return (
    <div className='hero'>
        <nav>
            <img src="https://tinyurl.com/2obtocwe" alt=''/>
            <center><h2> Ver Tabla General de Posiciones Fútbol 7</h2></center> 
            <h3><img src="https://tinyurl.com/2kaldmbh" alt=''/></h3>
        </nav>
      
        <Helmet>
            <title>Ver Tabla General de Posiciones Fútbol 7 </title>
        </Helmet>
        <main>
            <ContenedorBotonCentrado>
                <Boton onClick={() => handleRedirect('/estadisticas-V7MS')}> Tabla General de Posiciones Varonil Media Superior </Boton>
            </ContenedorBotonCentrado>
            <br/>
            <ContenedorBotonCentrado>
                <Boton onClick={() => handleRedirect('/estadisticas-F7MS')}> Tabla General de Posiciones Femenil Media Superior </Boton>
            </ContenedorBotonCentrado>
            <br/>
            <ContenedorBotonCentrado>
            <Boton onClick={() => handleRedirect('/estadisticas-V7S')}> Tabla General de Posiciones Varonil Superior </Boton>
            </ContenedorBotonCentrado>
            <br/>
            <ContenedorBotonCentrado>
            <Boton onClick={() => handleRedirect('/estadisticas-F7S')}> Tabla General de Posiciones Femenil Superior </Boton>
            </ContenedorBotonCentrado>
            <br/>
            <ContenedorBotonCentrado>
            <BtnRegresar ruta='/rol' />
            </ContenedorBotonCentrado>
        </main>
        
      </div>
  );
};
export default TGFutbol7;
