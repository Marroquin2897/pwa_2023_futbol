import React, {useState,useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { FormularioEscuela } from '../elementos/FormularioEscuela';
import {useAuth} from './../contextos/AuthContext';
import { Label, GrupoInput, ContenedorBotonCentrado, Boton, Input,} from '../elementos/ElementosFormulario';
import BtnRegresar from '../elementos/BtnRegresar';
import {firebaseApp} from "../firebase/firebaseConfig";
import {getFirestore, collection,query,where, getDocs } from 'firebase/firestore';
import agregarEscuela from '../firebase/agregarEscuela';
import {useNavigate} from 'react-router-dom';
import Alerta from '../elementos/Alerta';


const RegistrarEscuela = ({escuelaData}) => {
    
    
   
    const firestore = getFirestore(firebaseApp);
    const navigate = useNavigate();  
    const{usuario} = useAuth();
    const [nombreEntrenador, cambiarNombreE] = useState('');
    const [nombreAsistente,cambiarNombreA] = useState('');
    const [escuela,cambiarEscuela] = useState('');
    const [modalidades,cambiarModalidaes] = useState('');
    const [categoria,cambiarCategoria ] = useState('');
    const [nivelAcademico,cambiarNivelA ] = useState('');
    
    const[estadoAlerta,cambiarEdoAlerta] = useState(false);
    const[alerta,cambiarAlerta] = useState({});

    useEffect(() => { //Comprobamos si hay algun jugador, si hay obtenemos los valores que tiene ese jugador
        if(escuelaData){
            if(escuelaData.data().uidUsuario === usuario.uid){
                cambiarNombreE(escuelaData.data().nombreEntrenador);
                cambiarNombreA(escuelaData.data().nombreAsistente);
                cambiarEscuela(escuelaData.data().escuela);
                cambiarModalidaes(escuelaData.data().modalidades);
                cambiarCategoria(escuelaData.data().categoria);
                cambiarNivelA(escuelaData.data().nivelAcademico);
            } else {
                navigate('/menu-profe');
            }
        }
    },[escuelaData,usuario,navigate]);

   
    const handleChange = (e) => {
        switch(e.target.name){
            case 'nombreEntrenador':
                cambiarNombreE(e.target.value);
                break;
            case 'nombreAsistente':
                cambiarNombreA(e.target.value);
                break;
            case 'escuela':
                cambiarEscuela(e.target.value);
                break;
            case 'modalidades':
                cambiarModalidaes(e.target.value);
                break; 
            case 'categoria':
                cambiarCategoria(e.target.value);
                break; 
            case 'nivelA':
                cambiarNivelA(e.target.value);
                break;    
            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        
       const nombreE = /^[a-zA-ZÀ-ÿ\s]{1,40}$/ ;// Letras y espacios, pueden llevar acentos.
       const nombreA = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;

       if(!nombreE.test(nombreEntrenador)){
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Ingrese un nombre valido'
            });
            return;
        }
        if(!nombreA.test(nombreAsistente)){
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Ingrese un nombre valido'
            });
            return;
        }

        
            if(nombreEntrenador !== '' && nombreAsistente !== '' && escuela !== '' && modalidades !== '' && categoria !== ''){
             const consulta = await getDocs(query(collection(firestore,'escuelas'),where('escuela','==',escuela),where('categoria','==',categoria)));   
                if(consulta.size > 0){
                    cambiarEdoAlerta(true);
                    cambiarAlerta({tipo: 'error', mensaje: 'Esta escuela ya existe'});
                    console.log('Esta escuela ya existe');
                } else {
                    agregarEscuela({
                        nombreEntrenador: nombreEntrenador,
                        nombreAsistente: nombreAsistente,
                        escuela: escuela,
                        modalidades: modalidades,
                        categoria: categoria,
                        nivelAcademico: nivelAcademico,
                        uidUsuario: usuario.uid
                    })
                    .then(() => {
                        cambiarNombreE('');
                        cambiarNombreA('');
                        cambiarEscuela('');
                        cambiarModalidaes('');
                        cambiarCategoria('');
                        cambiarNivelA('');


                        cambiarEdoAlerta(true);
                        cambiarAlerta({tipo: 'exito', mensaje: 'Escuela registrada exitosamente'});
                    })
                    .catch((error) => {
                        cambiarEdoAlerta(true);
                        cambiarAlerta({tipo: 'error', mensaje: 'Hubo un problema al intentar registrar la escuela.'});
                    })
                }
            } else {
                cambiarEdoAlerta(true);
                cambiarAlerta({tipo: 'error', mensaje: 'Completa todos los campos'});
            }
    }
    const nameUsuario = sessionStorage.getItem("name")
    return ( 
        <div className="hero">
      <nav>
      <img src="https://tinyurl.com/2b2ek3ck"/>
        <center><h2>Registrar Nueva Escuela</h2></center>    
        <div>
            <h3><img src="https://tinyurl.com/233pns5r"/></h3>
            <h2>{nameUsuario}</h2>
        </div>
        
      </nav>
      
        <Helmet>
            <title>Registrar Escuela</title>
        </Helmet>
        <main>
            <FormularioEscuela onSubmit={handleSubmit}>
                <div>
                    <Label> Entrenador (a) en Jefe (a) </Label>
                    <GrupoInput>
                        <Input
                        type='text'
                        name='nombreEntrenador'
                        value = {nombreEntrenador}
                        onChange = {handleChange}
                        />
                    </GrupoInput>
                </div>
                <div>
                    <Label> Entrenador Asistente </Label>
                    <GrupoInput>
                        <Input
                        type='text'
                        name='nombreAsistente'
                        value = {nombreAsistente}
                        onChange = {handleChange}
                        />
                    </GrupoInput>
                </div>
                
                <div>
                    <Label htmlFor='escuela'> Escuela </Label>
                    <GrupoInput>
                        <select name="escuela" onChange = {handleChange}>
                            <option value="CET 1"> CET 1 Walter Cross Buchanan </option>
                            <option value="Cecyt 1"> CECyT No. 1 Gonzalo Vázquez Vela </option>
                            <option value="Cecyt 2"> CECyT No. 2 Miguel Bernard </option>
                            <option value="Cecyt 3"> CECyT No. 3 Estanislao Ramírez Ruiz </option>
                            <option value="Cecyt 4"> CECyT No. 4 Lázaro Cárdenas </option>
                            <option value="Cecyt 5"> CECyT No. 5 Benito Juárez </option>
                            <option value="Cecyt 6"> CECyT No. 6 Miguel Othón de Mendizábal </option>
                            <option value="Cecyt 7"> CECyT No. 7 Cuauhtémoc </option>
                            <option value="Cecyt 8"> CECyT No. 8 Narciso Bassols </option>
                            <option value="Cecyt 9"> CECyT No. 9 Juan de Dios Bátiz </option>
                            <option value="Cecyt 10"> CECyT No. 10 Carlos Vallejo Márquez </option>
                            <option value="Cecyt 11"> CECyT No. 11 Wilfrido Massieu </option>
                            <option value="Cecyt 12"> CECyT No. 12 José María Morelos </option>
                            <option value="Cecyt 13"> CECyT No. 13 Ricardo Flores Magón </option>
                            <option value="Cecyt 14"> CECyT No. 14 Luis Enrique Erro </option>
                            <option value="Cecyt 15"> CECyT No. 15 Diódoro Antúnez Echegaray </option>
                            <option value="CICS Sto Tomas"> CICS Unidad Santo Tomás </option>
                            <option value="CICS Milpa Alta"> CICS Unidad Milpa Alta </option>
                            <option value="ENCB"> ENCB </option>
                            <option value="ENMyH"> ENMyH </option>
                            <option value="ESCA Sto Tomas"> ESCA Unidad Santo Tomás </option>
                            <option value="ESCA Tepepan"> ESCA Unidad Tepepan </option>
                            <option value="ESCOM"> ESCOM </option>
                            <option value="ESE"> ESE </option>
                            <option value="ESEO"> ESEO </option>
                            <option value="ESFM"> ESFM </option>
                            <option value="ESIME Zacatenco"> ESIME Unidad Zacatenco </option>
                            <option value="ESIME Azcapotzalco"> ESIME Unidad Azcapotzalco </option>
                            <option value="ESIME Culhuacan"> ESIME Unidad Culhuacán </option>
                            <option value="ESIME Ticoman"> ESIME Unidad Ticomán </option>
                            <option value="ESIQIE"> ESIQIE </option>
                            <option value="ESIT"> ESIT </option>
                            <option value="ESIA Tecamachalco"> ESIA Unidad Tecamachalco </option>
                            <option value="ESIA Ticoman"> ESIA Unidad Ticomán </option>
                            <option value="ESIA Zacatenco"> ESIA Unidad Zacatenco </option>
                            <option value="ESM"> ESM </option>
                            <option value="EST"> EST </option>
                            <option value="UPIBI"> UPIBI </option>
                            <option value="UPIICSA"> UPIICSA </option>
                            <option value="UPIITA"> UPIITA </option>
                        </select> 
                    </GrupoInput>   
                </div>
                <div>
                    <Label htmlFor='modalidades'> Modalidades </Label>
                    <GrupoInput>
                        <select name="modalidades" onChange = {handleChange}>
                            
                            <option value="Futbol 7"> Fútbol 7 </option>
                            <option value="Futbol Rapido"> Fútbol Rápido </option>
                            <option value="Futbol Asociacion"> Fútbol Asociación </option>
                            <option value= "F7 FR"> Fútbol 7 / Fútbol Rápido </option> 
                            <option value= "F7 FA"> Fútbol 7 / Fútbol Asociación </option>
                            <option value= "FR FA"> Fútbol Rápido / Fútbol Asociación </option>
                            <option value="F7 FR FA"> Fútbol 7/Fútbol Rápido Fútbol/Asociación</option>
                        </select> 
                    </GrupoInput>   
                </div>
                <div>
                    <Label htmlFor='categoria'> Categoria </Label>
                    <GrupoInput>
                        <select name="categoria"  onChange = {handleChange}>
                            <option value="femenil"> Femenil </option>
                            <option value="varonil"> Varonil </option>
                        </select> 
                    </GrupoInput>   
                </div>
                <div>
                    <Label htmlFor='nivelA'> Nivel Académico </Label>
                    <GrupoInput>
                        <select name="nivelA"  onChange = {handleChange}>
                            <option value="Media Superior"> Media Superior </option>
                            <option value="Superior"> Superior </option>
                        </select> 
                    </GrupoInput>   
                </div>
                <ContenedorBotonCentrado>
                <Boton  type = 'submit' > Registrar </Boton><br/>
                <BtnRegresar ruta = '/menu-profe'/>
                </ContenedorBotonCentrado>
            <Alerta 
                tipo= {alerta.tipo}
                mensaje= {alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEdoAlerta={cambiarEdoAlerta}
            />
            </FormularioEscuela>
        </main>
        </div>
     );
}
 
export default RegistrarEscuela;