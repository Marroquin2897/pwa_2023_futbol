import React, {useState,useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { FormularioEscuela } from '../elementos/FormularioEscuela';
import {useAuth} from './../contextos/AuthContext';
import { Label, GrupoInput, ContenedorBotonCentrado, Boton, Input,} from '../elementos/ElementosFormulario';
import BtnRegresar from '../elementos/BtnRegresar';
import {firebaseApp} from "../firebase/firebaseConfig";
import {getFirestore, collection,query,where, getDocs,addDoc,updateDoc,setDoc,doc } from 'firebase/firestore';
import agregarEscuela from '../firebase/agregarEscuela';
import {useNavigate} from 'react-router-dom';
import Alerta from '../elementos/Alerta';
import useObtenerTodaCEscuelas from '../hooks/useObtenerTodaCEscuelas';


const RegistrarEscuela = ({escuelaData}) => {
    const firestore = getFirestore(firebaseApp);
    const navigate = useNavigate();  
    const{usuario} = useAuth();
    const [nombreEntrenador, cambiarNombreE] = useState('');
    const [nombreAsistente,cambiarNombreA] = useState('');
    const [idEscuela,cambiarEscuela] = useState('');
    const [modalidades,cambiarModalidaes] = useState('');
    const [categoria,cambiarCategoria ] = useState('');
    
    const[estadoAlerta,cambiarEdoAlerta] = useState(false);
    const[alerta,cambiarAlerta] = useState({});
    const [escuelas,obtenerMasEscuelas,hayMasPorCargar] = useObtenerTodaCEscuelas();
    useEffect(() => { //Comprobamos si hay algun jugador, si hay obtenemos los valores que tiene ese jugador
        if(escuelaData){
            if(escuelaData.data().uidUsuario === usuario.uid){
                cambiarNombreE(escuelaData.data().nombreEntrenador);
                cambiarNombreA(escuelaData.data().nombreAsistente);
                cambiarEscuela(escuelaData.data().nombreEscuela);
                cambiarModalidaes(escuelaData.data().modalidades);
                cambiarCategoria(escuelaData.data().categoria);
            } else {
                navigate('/menu-profe');
            }
        console.log({escuelaData})
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
            case 'idEscuela':
                cambiarEscuela(e.target.value);
                break;
            case 'modalidades':
                cambiarModalidaes(e.target.value);
                break; 
            case 'categoria':
                cambiarCategoria(e.target.value);
                break; 
            default:
                break;
        }
    }
    
    const validarEscuelaExistente = async (escuelaRepresentada) => {
        // Obtener todas las escuelas
        const escuelasRef = collection(firestore, "esc_repreS");
        const querySuperior = query(
          escuelasRef,
          where("idEscuela", "==", escuelaRepresentada.idEscuela)
        );
        const querySnapshotSuperior = await getDocs(querySuperior);
        if(!querySnapshotSuperior.empty){
            // Verificar si existe una escuela con el mismo nombre y dirección en el nivel superior
            return true;
            
        }else{
            // Si no se encontró ninguna escuela con el mismo nombre y dirección, retornar false
            return false;
        }
      }
    const guardarEscuela = async (escuela) => {   
       await updateDoc(doc(firestore, "escuelasS", idEscuela),escuela);
      };
    const guardarEscuelaRepresentada = async (escuelaRepresentada) => {  
        await addDoc(collection(firestore, "esc_repreS"), escuelaRepresentada);
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
  
        if(nombreEntrenador === " " || nombreAsistente === " " || idEscuela === " " || modalidades === " " || categoria === " ") {
            cambiarEdoAlerta(true);
            cambiarAlerta({
            tipo: "error",
            mensaje: "Completa todos los campos",
            });
            return;
        }
        // Definir la variable escuela antes de llamar a validarEscuelaExistente
        const escuelaRepresentada = {
            idEscuela: idEscuela,
            uidUsuario: usuario.uid,
        }
        const existeEscuela = await validarEscuelaExistente(escuelaRepresentada);
        console.log("Escuela existe", existeEscuela)
        if (existeEscuela) {
            cambiarEdoAlerta(true);
            cambiarAlerta({
              tipo: "error",
              mensaje: "Esta escuela ya esta representada",
            });
            return;
        }else{
            const nuevaEscuela = {
                nombreEntrenador: nombreEntrenador,
                nombreAsistente: nombreAsistente,
                modalidades: modalidades,
                categoria: categoria,
            };
            await guardarEscuela(nuevaEscuela)
            .then(() => {
                cambiarNombreE("");
                cambiarNombreA("");
                cambiarEscuela("");
                cambiarModalidaes("");
                cambiarCategoria("");
                
                guardarEscuelaRepresentada(escuelaRepresentada)
                cambiarEdoAlerta(true);
                cambiarAlerta({
                    tipo: "exito",
                    mensaje: "Escuela registrada exitosamente",
                  });
            })
            .catch((error) => {
                cambiarEdoAlerta(true);
                cambiarAlerta({
                    tipo: "error",
                    mensaje: "Hubo un problema al intentar registrar la escuela.",
                });
            })
            
        }
              
    }
    const nameUsuario = sessionStorage.getItem("name")
    return ( 
        <div className="hero">
      <nav>
      <img src="https://tinyurl.com/2b2ek3ck"/>
        <center><h2>Registrar Nueva Escuela</h2>
        <h2>{nameUsuario}</h2></center>    
        <h3><img src="https://tinyurl.com/233pns5r"/></h3>
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
                    <select name="idEscuela" onChange = {handleChange}>
                    {escuelas.map((escuela) => (

                            <option key={escuela.id} value={escuela ? escuela.id : "no existe"}> {escuela.escuela}  </option>
                        
                     ))} 
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
                            <option value="F7 FR FA"> Fútbol 7 / Fútbol Rápido Fútbol / Asociación</option>
                        </select> 
                    </GrupoInput>   
                </div>
                <div>
                    <Label htmlFor='categoria'> Categoria </Label>
                    <GrupoInput>
                        <select name="categoria"  onChange = {handleChange}>
                            <option value="femenil"> Femenil </option>
                            <option value="varonil"> Varonil </option>
                            <option value="Femenil-Varonil"> Femenil-Varonil </option>
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