import React, {useState,useEffect, useRef} from 'react';
import { Helmet } from 'react-helmet';
import {useAuth} from './../contextos/AuthContext';
import {Formulario, Label, GrupoInput, ContenedorBotonCentrado, Boton, Input,} from '../elementos/ElementosFormulario';
import BtnRegresar from '../elementos/BtnRegresar';
import {firebaseApp} from "../firebase/firebaseConfig";
import {getFirestore, collection,query,where, getDocs,addDoc,doc,updateDoc } from 'firebase/firestore';
import { INSTITUTIONS } from './../constants/schoolsCatalog';
import {useNavigate} from 'react-router-dom';
import Alerta from '../elementos/Alerta';

const RegistrarEscuela = ({escuelaExistente}) => {
    const firestore = getFirestore(firebaseApp);
    const navigate = useNavigate();  
    const{usuario} = useAuth();
    const [nombreEntrenador, cambiarNombreE] = useState('');
    const [nombreAsistente,cambiarNombreA] = useState('');
    const [nombreEscuela,cambiarEscuela] = useState('');
    const [modalidades,cambiarModalidaes] = useState('');
    const [categoria,cambiarCategoria ] = useState('');
    var [nivelAcademico,cambiarNivelA ] = useState('');
    const[estadoAlerta,cambiarEdoAlerta] = useState(false);
    const[alerta,cambiarAlerta] = useState({});
    const documentoIdRef = useRef(null); // Variable para almacenar el ID de la escuela
    useEffect(() => { //Comprobamos si hay algun jugador, si hay obtenemos los valores que tiene ese jugador
        
        if(escuelaExistente){
            if(escuelaExistente.data().uidUsuario === usuario.uid){
                cambiarNombreE(escuelaExistente.data().nombreEntrenador);
                cambiarNombreA(escuelaExistente.data().nombreAsistente);
                cambiarEscuela(escuelaExistente.data().escuela);
                cambiarModalidaes(escuelaExistente.data().modalidades);
                cambiarCategoria(escuelaExistente.data().categoria);
                cambiarNivelA(escuelaExistente.data().nivelAcademico);
            } else {
                navigate('/menu-profe');
            }
            documentoIdRef.current = escuelaExistente.id;
        }
    },[escuelaExistente,usuario,navigate]);
    // Acceder al valor del ID del documento fuera del useEffect
  const documentoId = documentoIdRef.current;
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
        if(escuela.nivelAcademico === "Superior" || escuelaExistente.data().nivelAcademico === "Superior"){
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
        }else if(escuela.nivelAcademico === "Media Superior" || escuelaExistente.data().nivelAcademico === "Media Superior"){
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
            const escuelaSuperiorRef = doc(firestore, "Escuelas Superior",documentoId);
            await updateDoc(escuelaSuperiorRef, escuelaEditada);
          } else if (escuelaExistente.data().nivelAcademico === "Media Superior") {
            const escuelaMediaSuperiorRef = doc(firestore, "Escuelas Media Superior",documentoId);
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
        INSTITUTIONS.map((institucion)=>{
            if(institucion.selectorValue === nombreEscuela && institucion.isSuperior){
                nivelAcademico = "Superior"
            }else if(institucion.selectorValue === nombreEscuela && !institucion.isSuperior){
                nivelAcademico = "Media Superior"
            }
            cambiarNivelA(nivelAcademico)
            return;  
        })

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

        if(nombreEntrenador === '' || nombreAsistente === '' || nombreEscuela === '' || modalidades === '' || categoria === '' ) {
            cambiarEdoAlerta(true);
            cambiarAlerta({
            tipo: "error",
            mensaje: "Completa todos los campos",
            });
            return;
        }
        if(!escuelaExistente){ //Si no recibe ninguna escuela.
            // Definir la variable escuela antes de llamar a validarEscuelaExistente
            cambiarEdoAlerta(true);
            const escuela = {
                escuela: nombreEscuela,
                categoria: categoria,
                nivelAcademico: nivelAcademico,
                modalidades: modalidades
            };
            const existeEscuela = await validarEscuelaExistente(escuela);
            
            if (existeEscuela === true) { 
                console.log("Esta escuela ya fue registrada")
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
                })
                .catch((error) => {
                    cambiarAlerta({
                        tipo: "error",
                        mensaje: "Hubo un problema al intentar registrar la escuela.",
                    });
                }) 
            }
          
        } //-------------------------------EDITAR ESCUELA------------------------------------
        else{ //Si recibe un objeto escuela con datos
            if(escuelaExistente.data().categoria===categoria && escuelaExistente.data().modalidades===modalidades){ //si los datos principales no los cambio
                const escuelaEditada = {
                    nombreEntrenador: nombreEntrenador,
                    nombreAsistente: nombreAsistente,
                    uidUsuario: usuario.uid,
                };
                await editarEscuela(escuelaEditada)
                .then(() => {
                    console.log("Escuela editada exitosamente")
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
                    console.log(error)
                })
            }else{ //si alguno de los datos principales lo cambio.
                const escuelaParaEdit ={
                    modalidades: modalidades,
                    escuela: nombreEscuela,
                    categoria: categoria,
                }
                const existeEscuela = await validarEscuelaExistente(escuelaParaEdit);    
                if (existeEscuela === true) { 
                    console.log("Esta escuela ya fue registrada")
                    cambiarEdoAlerta(true);
                    cambiarAlerta({
                    tipo: "error",
                    mensaje: "Ya existe un registro de esta escuela",
                    });
                    return;
                }else{
                    const escuelaEditada = {
                        nombreEntrenador: nombreEntrenador,
                        nombreAsistente: nombreAsistente,
                        modalidades: modalidades,
                        categoria: categoria,
                        uidUsuario: usuario.uid,
                    };
                    try{
                        await editarEscuela(escuelaEditada)            
                        cambiarEdoAlerta(true);
                        cambiarAlerta({
                            tipo: "exito",
                            mensaje: "Escuela editada exitosamente",
                          });                   
                    }catch(error){
                        cambiarEdoAlerta(true);
                        cambiarAlerta({
                            tipo: "error",
                            mensaje: "Hubo un problema al intentar editar los campos de la escuela.",
                        });
                        console.log(error)
                    }
                }
                
            }
            navigate("/lista-escuelas");          
        }          
    }
    const nameUsuario = sessionStorage.getItem("name")
    return ( 
        <div className="hero">
      <nav>
      <img src="https://tinyurl.com/2obtocwe"/>
        <center><h2> {escuelaExistente ? 'Editar Escuela' : 'Registrar Nueva Escuela'}</h2>
        <h2>{nameUsuario}</h2></center>    
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
                        <select name="nombreEscuela" value={nombreEscuela} disabled={escuelaExistente ? true : false} onChange = {handleChange}>
                        <option value="opcDeter">Elige una escuela</option>                       
                        {INSTITUTIONS.map((escuela) =>{
                                return(
                                    <option key={escuela.selectorValue} value = {escuela.selectorValue}>
                                         {escuela.name}
                                    </option>                     
                                ) 
                        })};                                                      
                        </select> 
                    </GrupoInput>   
                </div>
                <div>
                    <Label htmlFor='modalidades'> Modalidades </Label>
                    <GrupoInput>
                        <select name="modalidades"value={modalidades} onChange = {handleChange}> 
                            <option value="opcDeter">Elige una modalidad</option>
                            <option value="Fútbol 7"> Fútbol 7 </option>
                            <option value="Fútbol Rápido"> Fútbol Rápido </option>
                            <option value="Fútbol Asociación"> Fútbol Asociación </option>
                        </select> 
                    </GrupoInput>   
                </div>
                <div>
                    <Label htmlFor='categoria'> Categoría </Label>
                    <GrupoInput>
                        <select name="categoria" value={categoria}   onChange = {handleChange}>
                            <option value="opcDeter">Elige una categoría</option>
                            <option value="Femenil"> Femenil </option>
                            <option value="Varonil"> Varonil </option>
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