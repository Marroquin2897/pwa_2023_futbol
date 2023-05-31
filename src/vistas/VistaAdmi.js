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
              <img src="https://scontent.fmex28-1.fna.fbcdn.net/v/t39.30808-6/343933790_960404308426629_4877648574252264772_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeH1fTNB22lymyVfvUKqXLxkT-23TPP5usFP7bdM8_m6wXv1PCJkGQeO5VeDWxqr7zcKK0tFG4IBJvQ5r96NgwVY&_nc_ohc=ugRrWdguhqYAX_lHajI&_nc_ht=scontent.fmex28-1.fna&oh=00_AfAfSg9AvaBQ1PEmOj694Cozcxov1dGF1gQ6XSxlXgJ1Uw&oe=646CD53F" alt="Descripción de la imagen 1" />
            </div>
            <div>
              <img src="https://scontent.fmex36-1.fna.fbcdn.net/v/t39.30808-6/304393117_578421000740393_8307966749810357671_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFxm5bz2Q_SA6DiKaMXE75TCY7H2qEUJsIJjsfaoRQmwuHdv2Ga6ZJkYPfvXTtijDCF6d2zqrRypnwTgQBJpFs6&_nc_ohc=I7tbOBRNgKcAX8hasiW&_nc_ht=scontent.fmex36-1.fna&oh=00_AfD6jQcT0Jc5_NN9Lcjcoua0vhQ1E7meEmCP6ARDSch7yg&oe=646E3FAC" alt="Descripción de la imagen 1" />
            </div>
            <div>
              <img src="https://scontent.fmex36-1.fna.fbcdn.net/v/t39.30808-6/308674335_670954624727608_3389822112059907763_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeHlpMpXh9m1Q5IY08Z1c8cYIQQ19J8vzi4hBDX0ny_OLvC7549949FbggKYezNcbrxw3BPs904reqPAf9iBao5x&_nc_ohc=ccPL6RzmQPEAX_oAuEr&_nc_ht=scontent.fmex36-1.fna&oh=00_AfC7EQuijjwCd6Z7kW8eSTQaL5SieVw8KnYSOM4GE2hKfA&oe=646E1D90" alt="Descripción de la imagen 1" />
            </div>
            <div>
              <img src="https://scontent.fmex23-1.fna.fbcdn.net/v/t39.30808-6/314448096_511124984367236_7217168692830277840_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFoFqRE1R8lK1usoHe4tHNjRD4_ymc9TCNEPj_KZz1MI5cMAfg6faWcBOe0_8lPrYqwoAoX73VO8Sj-u60Tp-6p&_nc_ohc=JnJwMcPPkI4AX_wugEx&_nc_ht=scontent.fmex23-1.fna&oh=00_AfBg1gsePyEU8iPaUFsn_qYWKqYp86MMhnMDcbayhtNgfw&oe=646F0D33" alt="Descripción de la imagen 1" />
            </div>
            <div>
              <img src="https://scontent.fmex31-1.fna.fbcdn.net/v/t39.30808-6/273827569_4327982050634519_8508319565733493413_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=ID4U5307McQAX-9WFqv&_nc_ht=scontent.fmex31-1.fna&oh=00_AfBfcCUvWxBVfqklsL0SDbfuhAdG4osB64ytDHnjbqFWYA&oe=647038B5" alt="Descripción de la imagen 1" />
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