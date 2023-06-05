import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ContenedorBotonCentrado, Boton } from '../elementos/ElementosFormularioJuegos';
import BtnRegresar from '../elementos/BtnRegresar';

const TGFutbolAsociacion = () => {
    const navigate = useNavigate();
    const nameUsuario = sessionStorage.getItem("name")
    const handleRedirect = (ruta) => {
        navigate(ruta);
      };

  return (
    <div className='hero'>
        <nav>
            <img src="https://tinyurl.com/2obtocwe" alt=''/>
            <center><h2> Ver Tabla General de Posiciones Fútbol Asociación</h2>
            <h3>{nameUsuario}</h3></center> 
            <h3><img src="https://tinyurl.com/2kaldmbh" alt=''/></h3>
        </nav>
      
        <Helmet>
            <title>Ver Tabla General de Posiciones Fútbol Asociación </title>
        </Helmet>
        <main>
            <ContenedorBotonCentrado>
                <Boton onClick={() => handleRedirect('/estadisticas-VAMS')}> Tabla General de Posiciones Varonil Media Superior </Boton>
            </ContenedorBotonCentrado>
            <br/>
            <ContenedorBotonCentrado>
                <Boton onClick={() => handleRedirect('/estadisticas-FAMS')}> Tabla General de Posiciones Femenil Media Superior </Boton>
            </ContenedorBotonCentrado>
            <br/>
            <ContenedorBotonCentrado>
            <Boton onClick={() => handleRedirect('/estadisticas-VAS')}> Tabla General de Posiciones Varonil Superior </Boton>
            </ContenedorBotonCentrado>
            <br/>
            <ContenedorBotonCentrado>
            <Boton onClick={() => handleRedirect('/estadisticas-FAS')}> Tabla General de Posiciones Femenil Superior </Boton>
            </ContenedorBotonCentrado>
            <br/>
            <ContenedorBotonCentrado>
            <BtnRegresar ruta='/rol' />
            </ContenedorBotonCentrado> 
        </main>
        
      </div>
  );
};
export default TGFutbolAsociacion;
