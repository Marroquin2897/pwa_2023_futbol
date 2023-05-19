import React, { useState, useEffect } from 'react';
import MenuProfesor from '../componentes/MenuProfesor';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const VistaProfe = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const totalSlides = 4; // Actualiza el número total de diapositivas aquí

  return (
    <div>
      <MenuProfesor />
      <div className='hero'>
        <nav>
          <h2 className='saludosMenu'>¡Hola Profesor!</h2>
        </nav><br/><br/><br/>
        <Carousel selectedItem={currentSlide} onChange={setCurrentSlide} autoPlay infiniteLoop showThumbs={false}>
          <div>
            {/* Contenido de la primera fotografía */}
            <img src="https://scontent.fmex28-1.fna.fbcdn.net/v/t39.30808-6/343933790_960404308426629_4877648574252264772_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeH1fTNB22lymyVfvUKqXLxkT-23TPP5usFP7bdM8_m6wXv1PCJkGQeO5VeDWxqr7zcKK0tFG4IBJvQ5r96NgwVY&_nc_ohc=ugRrWdguhqYAX_lHajI&_nc_ht=scontent.fmex28-1.fna&oh=00_AfAfSg9AvaBQ1PEmOj694Cozcxov1dGF1gQ6XSxlXgJ1Uw&oe=646CD53F" alt="Descripción de la imagen 1" style={{ width: '500px', height: '300px' }} />
          </div>
          <div>
            {/* Contenido de la segunda fotografía */}
            <img src="https://i.blogs.es/019b4b/blackpink-the-game/1366_2000.jpeg" alt="Descripción de la imagen 2" style={{ width: '500px', height: '300px' }} />
          </div>
          <div>
            {/* Contenido de la tercera fotografía */}
            <img src="https://www.eluniversal.com.mx/resizer/hgz_YHyuE5aZcP2RLyBET0ngpDY=/1100x666/filters:focal(786x217:796x227)/cloudfront-us-east-1.images.arcpublishing.com/eluniversal/ACEPURHD2JACFJT75G3SEH7YXM.jpg" alt="Descripción de la imagen 3" style={{ width: '500px', height: '300px' }} />
          </div>
          <div>
            {/* Contenido de la cuarta fotografía */}
            <img src="https://www.sonica.mx/u/fotografias/m/2023/5/17/f608x342-39909_69632_0.jpg" alt="Descripción de la imagen 4" style={{ width: '500px', height: '300px' }} />
          </div>
          {/* Agrega más diapositivas según sea necesario */}
        </Carousel>
      </div>
    </div>
  );
};

export default VistaProfe;
