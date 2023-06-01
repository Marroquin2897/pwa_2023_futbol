import React, { useState, useEffect } from 'react';
import MenuAdmin from '../componentes/MenuAdmin';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const VistaAdmin = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const totalSlides = 8; // Actualiza el número total de diapositivas aquí

  return (
    <div>
      <MenuAdmin />
      <div className="hero">
        <nav>
          <h2 className="saludosMenu">¡Hola Administrador!</h2>
        </nav>
        <br /><br /><br />
        <div className="carousel-container">
          <Carousel
            selectedItem={currentSlide}
            onChange={setCurrentSlide}
            autoPlay
            infiniteLoop
            showThumbs={false}
          >
            <div>
              <img src="https://scontent.fmex31-1.fna.fbcdn.net/v/t1.6435-9/34403133_2193633983987108_1754698112707854336_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=P6_5PY06uI0AX80EYEj&_nc_ht=scontent.fmex31-1.fna&oh=00_AfA_kobfOKyPNktQuRv8Ar6MfjjyDtOFoGWnrNs-d903vA&oe=649F8A09" alt="Descripción de la imagen 1" />
            </div>
            <div>
              <img src="https://scontent.fmex36-1.fna.fbcdn.net/v/t31.18172-8/22254769_1922638074420035_2760999883817323896_o.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=9x34DcPZsfEAX-e2Gg9&_nc_ht=scontent.fmex36-1.fna&oh=00_AfD28TTNnCRULWvuKAlj-ucVvUmeJEWfiKNo2P-5d-rpXQ&oe=649FB084" alt="Descripción de la imagen 1" />
            </div>
            <div>
              <img src="https://scontent.fmex36-1.fna.fbcdn.net/v/t1.18169-9/14695444_1491375070879673_8845942157632090296_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=19026a&_nc_ohc=uxd5Uzz26okAX-Xe82Z&_nc_ht=scontent.fmex36-1.fna&oh=00_AfB2-Y3ajDp63OkJ-t0WUlg45vo4utDmFsB73fg2tFdwVw&oe=649FABC0" alt="Descripción de la imagen 1" />
            </div>
            <div>
              <img src="https://scontent.fmex31-1.fna.fbcdn.net/v/t31.18172-8/13087098_1347608821922966_2296216770055060485_o.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=rYgI-NIitN0AX96cjrI&_nc_ht=scontent.fmex31-1.fna&oh=00_AfCkxLi-9tvEuXyBCJOYGUk7oVVYxlP7vcdbYGlr5Okl7A&oe=649FA0B1" alt="Descripción de la imagen 1" />
            </div>
            <div>
              <img src="https://scontent.fmex36-1.fna.fbcdn.net/v/t1.18169-9/12143120_1213580218659161_8143587401408619615_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=VnRofE2H9BsAX8oBXd3&_nc_ht=scontent.fmex36-1.fna&oh=00_AfCEcU75EnuXvcvHLYQEA8nc-Q9vdmYvEO6jPoTnB9TSMw&oe=649F9CF2" alt="Descripción de la imagen 1" />
            </div>
            <div>
              <img src="https://scontent.fmex36-1.fna.fbcdn.net/v/t1.6435-9/103848136_2587283618037713_2400225676725650264_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_ohc=HHnKML3L0QIAX9j-vop&_nc_ht=scontent.fmex36-1.fna&oh=00_AfD6NH2r0AHbIfQp6D60TUmb75b3le4po2higXUh-cUJwA&oe=64925661" alt="Descripción de la imagen 1" />
            </div>
            <div>
              <img src="https://scontent.fmex31-1.fna.fbcdn.net/v/t31.18172-8/22256657_1920619044621938_4141161383904575642_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=zYzj8hpZ0hYAX85L-6H&_nc_oc=AQnZEFEsk9ZFK6CwYDBdO05NnccDI5XIpzxXlnH-G_JyQOUBJar_W_k74xhI_I4xcfg&_nc_ht=scontent.fmex31-1.fna&oh=00_AfDlfJyJEbqc7f6CxbR1WuAtqlKHW20KcBMi_C-8FcHUqg&oe=64927CA4" alt="Descripción de la imagen 1" />
            </div>
            <div>
              <img src="https://scontent.fmex26-1.fna.fbcdn.net/v/t1.18169-9/13166125_1352269961456852_2383192225044367695_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=19026a&_nc_ohc=b7ZYfv-nk68AX-0x3F2&_nc_ht=scontent.fmex26-1.fna&oh=00_AfBsF70SSfkJYZVcIahhqPdEjbxWFQXZuJ4MlvIeSpdupw&oe=649285E3" alt="Descripción de la imagen 1" />
            </div>
            {/* Resto de las diapositivas */}
          </Carousel>
          <div className="twitter-timeline">
          <iframe title
              src="https://syndication.twitter.com/srv/timeline-profile/screen-name/ipndeportes?dnt=false&amp;embedId=twitter-widget-0&amp;frame=false&amp;hideBorder=false&amp;hideFooter=false&amp;hideHeader=false&amp;hideScrollBar=false&amp;lang=es&amp;maxHeight=500px&amp;origin=https%3A%2F%2Fwww.escom.ipn.mx%2F&amp;sessionId=a69e2f6859857ad06c67a4deebf8c794f3dff3d6&amp;showHeader=true&amp;showReplies=false&amp;siteScreenName=escomunidad&amp;transparent=false&amp;widgetsVersion=1c23387b1f70c%3A1664388199485"
              frameBorder="0"
            ></iframe>
            <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VistaAdmin;