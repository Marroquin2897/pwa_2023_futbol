import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ContenedorBotonCentrado, Boton } from '../elementos/ElementosFormularioJuegos';
import BtnRegresar from '../elementos/BtnRegresar';

const VerPartidosFutbol7 = () => {
    const navigate = useNavigate();
    const handleRedirect = (ruta) => {
        navigate(ruta);
      };

  return (
    <div className='hero'>
        <nav>
            <img src="https://tinyurl.com/2obtocwe" alt=''/>
            <center><h2> Ver Partidos Fútbol 7</h2></center> 
            <h3><img src="https://tinyurl.com/2kaldmbh" alt=''/></h3>
        </nav>
      
        <Helmet>
            <title>Ver Partidos Fútbol 7 </title>
        </Helmet>
        <main>
            <ContenedorBotonCentrado>
                <Boton onClick={() => handleRedirect('/PartidosVMSF7')}> Partidos Varonil Media Superior </Boton>
            </ContenedorBotonCentrado>
            <br/>
            <ContenedorBotonCentrado>
                <Boton onClick={() => handleRedirect('/PartidosFMSF7')}> Partidos Femenil Media Superior </Boton>
            </ContenedorBotonCentrado>
            <br/>
            <ContenedorBotonCentrado>
            <Boton onClick={() => handleRedirect('/PartidosVSF7')}> Partidos Varonil Superior </Boton>
            </ContenedorBotonCentrado>
            <br/>
            <ContenedorBotonCentrado>
            <Boton onClick={() => handleRedirect('/PartidosFSF7')}> Partidos Femenil Superior </Boton>
            </ContenedorBotonCentrado>
            <br/> 
            <ContenedorBotonCentrado>
            <BtnRegresar ruta='/rol' />
            </ContenedorBotonCentrado>
        </main>
        
      </div>
  );
};
export default VerPartidosFutbol7;
