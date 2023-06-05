import React, {useState,useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { FormularioEscuela } from '../elementos/FormularioEscuela';
import {useAuth} from './../contextos/AuthContext';
import {Formulario, Label, GrupoInput, ContenedorBotonCentrado, Boton, Input,} from '../elementos/ElementosFormulario';
import BtnRegresar from '../elementos/BtnRegresar';
import {firebaseApp} from "../firebase/firebaseConfig";
import {getFirestore, collection,query,where, getDocs,addDoc,doc,updateDoc } from 'firebase/firestore';

import {useNavigate} from 'react-router-dom';
import Alerta from '../elementos/Alerta';
import useObtenerEscuela from '../hooks/useObtenerEscuela';


const RegistrarEscuela = ({escuelaExistente}) => {
    const firestore = getFirestore(firebaseApp);
    const navigate = useNavigate();  
    const{usuario} = useAuth();
    console.log({escuelaExistente})
    const [nombreEntrenador, cambiarNombreE] = useState('');
    const [nombreAsistente,cambiarNombreA] = useState('');
    const [nombreEscuela,cambiarEscuela] = useState('');
    const [modalidades,cambiarModalidaes] = useState('');
    const [categoria,cambiarCategoria ] = useState('');
    const [nivelAcademico,cambiarNivelA ] = useState('');
    const[estadoAlerta,cambiarEdoAlerta] = useState(false);
    const[alerta,cambiarAlerta] = useState({});

    useEffect(() => { //Comprobamos si hay algun jugador, si hay obtenemos los valores que tiene ese jugador
        
        if(escuelaExistente){
            if(escuelaExistente.data().uidUsuario === usuario.uid){
                cambiarNombreE(escuelaExistente.data().nombreEntrenador);
                cambiarNombreA(escuelaExistente.data().nombreAsistente);
                cambiarEscuela(escuelaExistente.data().nombreEscuela);
                cambiarModalidaes(escuelaExistente.data().modalidades);
                cambiarCategoria(escuelaExistente.data().categoria);
                cambiarNivelA(escuelaExistente.data().nivelAcademico);
            } else {
                navigate('/menu-profe');
            }
        }
    },[escuelaExistente,usuario,navigate]);

    const handleChange = (e) => {
        
        switch(e.target.name){
            case 'nombreEntrenador':
                cambiarNombreE(e.target.value);
                break;
            case 'nombreAsistente':
                cambiarNombreA(e.target.value);
                break;
            case 'nombreEscuela':
                cambiarEscuela(e.target.value);
                break;
            case 'modalidades':
                cambiarModalidaes(e.target.value);
                break; 
            case 'categoria':
                cambiarCategoria(e.target.value);
                break; 
            case 'nivelAcademico':
                cambiarNivelA(e.target.value);
                break;    
            default:
                break;
        }
    }
    
    const validarEscuelaExistente = async (escuela) => {
        if(escuela.nivelAcademico === "Superior"){
            // Obtener todas las escuelas del nivel superior
            const escuelasSuperiorRef = collection(firestore, "Escuelas Superior");
            const querySuperior = query(
            escuelasSuperiorRef,
            where("escuela", "==", escuela.escuela),
            where("categoria", "==", escuela.categoria),
            where("modalidades", "==", escuela.modalidades)
            );
            const querySnapshotSuperior = await getDocs(querySuperior);
            // Verificar si existe una escuela con el mismo nombre, categoria y modalidad en el nivel superior
            if (!querySnapshotSuperior.empty) {
                return true;
            }
        }else if(escuela.nivelAcademico === "Media Superior"){
            // Obtener todas las escuelas del nivel medio superior
            const escuelasMediaSuperiorRef = collection(firestore, "Escuelas Media Superior");
            const queryMediaSuperior = query(
            escuelasMediaSuperiorRef,
            where("escuela", "==", escuela.escuela),
            where("categoria", "==", escuela.categoria),
            where("modalidades", "==", escuela.modalidades)
            );
            const querySnapshotMediaSuperior = await getDocs(queryMediaSuperior);
        
            // Verificar si existe una escuela con el mismo nombre, categoria y modalidad en el nivel medio superior
            if (!querySnapshotMediaSuperior.empty) {
                return true;
            }
        }else{
                // Si no se encontró ninguna escuela con el mismo nombre, categoria y modalidad, retornar false
                return false; 
                console.log("regresare false")
            }
            
    }
    const editarEscuela = async (escuelaEditada) => {
        if (escuelaExistente.data().nivelAcademico === "Superior") {
            const escuelaSuperiorRef = doc(firestore, "Escuelas Superior",escuelaExistente.id);
            await updateDoc(escuelaSuperiorRef, escuelaEditada);
          } else if (escuelaExistente.data().nivelAcademico === "Media Superior") {
            const escuelaMediaSuperiorRef = doc(firestore, "Escuelas Media Superior",escuelaExistente.id);
            await updateDoc(escuelaMediaSuperiorRef, escuelaEditada);
          } else {
            console.error("Nivel académico no reconocido");
          }

    }
    const guardarEscuela = async (escuela) => {
        if (escuela.nivelAcademico === "Superior") {
          const escuelasSuperiorRef = collection(firestore, "Escuelas Superior");
          await addDoc(escuelasSuperiorRef, escuela);
          cambiarEdoAlerta(true);
                    cambiarAlerta({
                        tipo: "exito",
                        mensaje: "Escuela registrada exitosamente",
                      });
        } else if (escuela.nivelAcademico === "Media Superior") {
          const escuelasMediaSuperiorRef = collection(firestore, "Escuelas Media Superior");
          await addDoc(escuelasMediaSuperiorRef, escuela);
          cambiarEdoAlerta(true);
                    cambiarAlerta({
                        tipo: "exito",
                        mensaje: "Escuela registrada exitosamente",
                      });
        }
      };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
       const nombreE = /^[a-zA-ZÀ-ÿ\s]{1,40}$/ ;// Letras y espacios, pueden llevar acentos.
       const nombreA = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
       console.log(nombreEscuela, categoria, modalidades)
       if(!nombreE.test(nombreEntrenador)){
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Ingrese un nombre de entrenador válido'
            });
            return;
        }
        if(!nombreA.test(nombreAsistente)){
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Ingrese un nombre de entrenador asistente válido'
            });
            return;
        }
        
        if(nombreEscuela=== "opcDeter" || nombreEscuela === ''){
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Selecciona una escuela'
            });
            return;
        }
        if(modalidades=== "opcDeter" || modalidades=== ''){
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Selecciona una modalidad'
            });
            return;
        }
        if(categoria=== "opcDeter" || categoria===''){
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Selecciona una categoría'
            });
            return;
        }
        if(nivelAcademico === "opcDeter" || nivelAcademico ===''){
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Selecciona el nivel académico'
            });
            return;
        }
  
        if(nombreEntrenador === '' || nombreAsistente === '' || nombreEscuela === '' || modalidades === '' || categoria === '' || nivelAcademico === '') {
            cambiarEdoAlerta(true);
            cambiarAlerta({
            tipo: "error",
            mensaje: "Completa todos los campos",
            });
            return;
        }
        if(!escuelaExistente){
            // Definir la variable escuela antes de llamar a validarEscuelaExistente
            const escuela = {
                escuela: nombreEscuela,
                categoria: categoria,
                nivelAcademico: nivelAcademico,
                modalidades: modalidades
            };
            const existeEscuela = await validarEscuelaExistente(escuela);
            if (existeEscuela === true) { 
                cambiarEdoAlerta(true);
                cambiarAlerta({
                tipo: "error",
                mensaje: "Esta escuela ya fue registrada",
                });
                return;
            }else{
                const nuevaEscuela = {
                    nombreEntrenador: nombreEntrenador,
                    nombreAsistente: nombreAsistente,
                    escuela: nombreEscuela,
                    modalidades: modalidades,
                    categoria: categoria,
                    nivelAcademico: nivelAcademico,
                    uidUsuario: usuario.uid,
                };
                await guardarEscuela(nuevaEscuela)
                .then(() => {
                    cambiarNombreE("");
                    cambiarNombreA("");
                    cambiarEscuela("");
                    cambiarModalidaes("");
                    cambiarCategoria("");
                    cambiarNivelA("");
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
        else{
            const escuelaEditada = {
                nombreEntrenador: nombreEntrenador,
                nombreAsistente: nombreAsistente,
                modalidades: modalidades,
                categoria: categoria,
                uidUsuario: usuario.uid,
            };
            await editarEscuela(escuelaEditada)
            .then(() => {
                cambiarNombreE("");
                cambiarNombreA("");
                cambiarEscuela("");
                cambiarModalidaes("");
                cambiarCategoria("");
                cambiarNivelA("");    
                cambiarEdoAlerta(true);
                cambiarAlerta({
                    tipo: "exito",
                    mensaje: "Escuela editada exitosamente",
                  });
            })
            .catch((error) => {
                cambiarEdoAlerta(true);
                cambiarAlerta({
                    tipo: "error",
                    mensaje: "Hubo un problema al intentar editar la escuela.",
                });
            })
        } 
           
    }
    const nameUsuario = sessionStorage.getItem("name")
    return ( 
        <div className="hero">
      <nav>
      <img src="https://tinyurl.com/2obtocwe"/>
        <center><h2> {escuelaExistente ? 'Editar Escuela' : 'Registrar Nueva Escuela'}</h2>
        <h3>{nameUsuario}</h3></center>    
        <h3><img src="https://tinyurl.com/2kaldmbh"/></h3>
      </nav>
      
        <Helmet>
            <title>Registrar Escuela</title>
        </Helmet>
        <main>
            <Formulario onSubmit={handleSubmit}>
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
                        <select name="nombreEscuela" value={nombreEscuela} onChange = {handleChange}>
                            <option value="opcDeter">Elige una escuela</option>
                            <option value="CET 1"> CET 1 Walter Cross Buchanan </option>
                            <option value="CECyT 1"> CECyT No. 1 Gonzalo Vázquez Vela </option>
                            <option value="CECyT 2"> CECyT No. 2 Miguel Bernard </option>
                            <option value="CECyT 3"> CECyT No. 3 Estanislao Ramírez Ruiz </option>
                            <option value="CECyT 4"> CECyT No. 4 Lázaro Cárdenas </option>
                            <option value="CECyT 5"> CECyT No. 5 Benito Juárez </option>
                            <option value="CECyT 6"> CECyT No. 6 Miguel Othón de Mendizábal </option>
                            <option value="CECyT 7"> CECyT No. 7 Cuauhtémoc </option>
                            <option value="CECyT 8"> CECyT No. 8 Narciso Bassols </option>
                            <option value="CECyT 9"> CECyT No. 9 Juan de Dios Bátiz </option>
                            <option value="CECyT 10"> CECyT No. 10 Carlos Vallejo Márquez </option>
                            <option value="CECyT 11"> CECyT No. 11 Wilfrido Massieu </option>
                            <option value="CECyT 12"> CECyT No. 12 José María Morelos </option>
                            <option value="CECyT 13"> CECyT No. 13 Ricardo Flores Magón </option>
                            <option value="CECyT 14"> CECyT No. 14 Luis Enrique Erro </option>
                            <option value="CECyT 15"> CECyT No. 15 Diódoro Antúnez Echegaray </option>
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
                        <select name="modalidades" value={modalidades} onChange = {handleChange}> 
                            <option value="opcDeter">Elige una modalidad</option>
                            <option value="Fútbol 7"> Fútbol 7 </option>
                            <option value="Fútbol Rapido"> Fútbol Rápido </option>
                            <option value="Fútbol Asociacion"> Fútbol Asociación </option>
                        </select> 
                    </GrupoInput>   
                </div>
                <div>
                    <Label htmlFor='categoria'> Categoría </Label>
                    <GrupoInput>
                        <select name="categoria" value={categoria}  onChange = {handleChange}>
                            <option value="opcDeter">Elige una categoría</option>
                            <option value="femenil"> Femenil </option>
                            <option value="varonil"> Varonil </option>
                        </select> 
                    </GrupoInput>   
                </div>
                <div>
                    <Label htmlFor='nivelAcademico'> Nivel Académico </Label>
                    <GrupoInput>
                        <select name="nivelAcademico" value={nivelAcademico} onChange = {handleChange}>
                            <option value="opcDeter">Elige el nivel académico</option>
                            <option value="Media Superior"> Media Superior </option>
                            <option value="Superior"> Superior </option>
                        </select> 
                    </GrupoInput>   
                </div>
                <ContenedorBotonCentrado>
                <Boton  type = 'submit' > {escuelaExistente ? 'Editar' : 'Registrar'} </Boton><br/>
                <BtnRegresar ruta = {escuelaExistente ? '/lista-escuelas' : '/menu-profe'} />
                </ContenedorBotonCentrado>
            <Alerta 
                tipo= {alerta.tipo}
                mensaje= {alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEdoAlerta={cambiarEdoAlerta}
            />
            </Formulario>
        </main>
        </div>
     );
}
 
export default RegistrarEscuela;