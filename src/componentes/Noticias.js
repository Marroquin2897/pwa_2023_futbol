    import React from 'react';
import { Helmet } from 'react-helmet';
import BtnRegresar from '../elementos/BtnRegresar';
import { ContenedorBotonCentrado } from '../elementos/ElementosFormulario';

const Noticias = () => {
    const nameUsuario = sessionStorage.getItem("name")
    return ( 
<div className="hero">
      <nav>
      <img src="https://tinyurl.com/2b2ek3ck"/>
        <center><h2>Noticias</h2><h2>{nameUsuario}</h2></center> 
            <h3><img src="https://tinyurl.com/233pns5r"/></h3>
      </nav>
        <Helmet>
            <title>Noticias</title>
        </Helmet>
        <main>
            <table>
                <tr>
                    <td>
                    <div class=" twitter-timeline twitter-timeline-rendered" style={{display: "fixed", width: "700px", maxwidth: "100%", marginTop: "0px", marginBottom: "20px", float: "center", marginRight: "20px"}}>
                <iframe title="Facebook Timeline" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FIPN.FUTBOL&amp;tabs=timeline&amp;width=500&amp;height=450&amp;small_header=false&amp;adapt_container_width=true&amp;hide_cover=false&amp;show_facepile=false&amp;appId" width="500" height="420" style={{border:"none", overflow:"hidden"}} scrolling="no" frameBorder="0" allowFullScreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                    </div>
                    </td>
                    <td>
                    <div class=" twitter-timeline twitter-timeline-rendered" style={{display: "fixed", width: "700px", maxwidth: "100%", marginTop: "0px", marginBottom: "20px", float: "center", marginRight: "20px"}}>
                <iframe id="twitter-widget-0" scrolling="no" allowTransparency="true" allowFullScreen="true" class="" style={{position: "static", visibility: "visible", width: "500px", height: "420px", display: "block-inline", flexGrow: "1"}} title="Twitter Timeline" src="https://syndication.twitter.com/srv/timeline-profile/screen-name/escomunidad?dnt=false&amp;embedId=twitter-widget-0&amp;frame=false&amp;hideBorder=false&amp;hideFooter=false&amp;hideHeader=false&amp;hideScrollBar=false&amp;lang=es&amp;maxHeight=500px&amp;origin=https%3A%2F%2Fwww.escom.ipn.mx%2F&amp;sessionId=a69e2f6859857ad06c67a4deebf8c794f3dff3d6&amp;showHeader=true&amp;showReplies=false&amp;siteScreenName=escomunidad&amp;transparent=false&amp;widgetsVersion=1c23387b1f70c%3A1664388199485" frameBorder="0"></iframe>
            </div>
                    </td>
                </tr>
            </table> 
                <script async="" src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
            <ContenedorBotonCentrado>
                <BtnRegresar ruta = '/rol'/>
            </ContenedorBotonCentrado>
        </main>                 
    </div>
     );
}
 
export default Noticias;