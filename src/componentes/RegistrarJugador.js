import React,{useState,useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { FormularioJugador,Label, GrupoInput, Input, ContenedorBotonCentrado, Boton } from '../elementos/ElementosFormulario';
import {ReactComponent as IconoRegresar} from './../imagenes/regresar.svg';
import Alerta from '../elementos/Alerta';
import firebaseApp from "../firebase/firebaseConfig";
import {useAuth} from './../contextos/AuthContext';
import {getFirestore} from "firebase/firestore"
import {Link, useNavigate} from 'react-router-dom';
import agregarJugador from '../firebase/agregarJugador';
import editarJugador from '../firebase/editarJugador';


const RegistrarJugador = ({jugador}) => {
    const firestore = getFirestore(firebaseApp);
    const navigate = useNavigate();
    const{usuario} = useAuth();

    const [nombreJugador, cambiarNombreJ] = useState('');
    const [apellidosJugador,cambiarApellidosJ] = useState('');
    const [fechaNacJugador,cambiarFechaNacJ] = useState('');
    const [nssJugador,cambiarNssJ] = useState('');
    const [curpJugador,cambiarCurpJ] = useState('');
    const [boletaJugador,cambiarBoletaJ] = useState('');
    const [semestreJugador, cambiarSemestreJ] = useState('');
    const[estadoAlerta,cambiarEdoAlerta] = useState(false);
    const[alerta,cambiarAlerta] = useState({});


    useEffect(() => { //Comprobamos si hay algun jugador, si hay obtenemos los valores que tiene ese jugador
        if(jugador){
            if(jugador.data().uidUsuario === usuario.uid){
                cambiarNombreJ(jugador.data().nombreJugador);
                cambiarApellidosJ(jugador.data().apellidosJugador);
                cambiarFechaNacJ(jugador.data().fechaNacJugador);
                cambiarNssJ(jugador.data().nssJugador);
                cambiarCurpJ(jugador.data().curpJugador);
                cambiarBoletaJ(jugador.data().boletaJugador);
                cambiarSemestreJ(jugador.data().semestreJugador);
            } else {
                navigate('/lista-jugadores');
            }
        }
    },[jugador,usuario,navigate]);
    
    
    const handleChange = (e) => {
        switch(e.target.name){
            case 'nombre':
                cambiarNombreJ(e.target.value);
                break;
            case 'apellidos':
                cambiarApellidosJ(e.target.value);
                break;
            case 'fechanac':
                cambiarFechaNacJ(e.target.value);
                break;
            case 'nss':
                cambiarNssJ(e.target.value);
                break;
            case 'curp':
                cambiarCurpJ(e.target.value);
                break;
            case 'boleta':
                cambiarBoletaJ(e.target.value);
                break; 
            case 'semestre':
                cambiarSemestreJ(e.target.value);
                break;       
            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const expresionNombreJ = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
        const expresionApellidoJ = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
        const expresionNssJ = /^\d{10,11}$/;
        const expresionCurpJ = /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GR|GT|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS){1}[B-DF-HJ-NP-TV-Z]{3}\w{1}\d{1}$/;
        const expresionBoletaJ = /^\d{9,10}$/;

        //Validando que en los campos ingrese el tipo de dato correcto y numero exacto de caracteres
        if(!expresionNombreJ.test(nombreJugador)){
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Ingrese un nombre valido'
            });
            return;
        }
        if(!expresionApellidoJ.test(apellidosJugador)){
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Ingrese Apellido Paterno y Materno'
            });
            return;
        }
        if(!expresionNssJ.test(nssJugador)){
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'NSS deben ser 11 digitos'
            });
            return;
        }
        if(!expresionCurpJ.test(curpJugador)){
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'CURP: Solo se permiten letras y numeros '
            });
            return;
        }
        if(!expresionBoletaJ.test(boletaJugador)){
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'El No. de boleta deben ser 10 digitos'
            });
            return;
        }

        //Comprobamos que los campos tengan un valor 
        if(nombreJugador !== '' && apellidosJugador !== '' && fechaNacJugador !== '' && nssJugador !== '' && curpJugador !== '' && boletaJugador !== ''
        && semestreJugador !== '') {
            if(jugador){
                editarJugador({
                    id: jugador.id,
                    nombreJugador: nombreJugador,
                    apellidosJugador: apellidosJugador,
                    fechaNacJugador: fechaNacJugador,
                    nssJugador: nssJugador,
                    curpJugador: curpJugador,
                    boletaJugador: boletaJugador,
                    semestreJugador: semestreJugador
                }).then(() => {
                    navigate('/lista-jugadores'); //cuando termine de editar que pase a la lista de jugadores
                }). catch((error) => {
                    console.log(error);
                })
            } else {
               agregarJugador({
                 nombreJugador: nombreJugador,
                 apellidosJugador: apellidosJugador,
                 fechaNacJugador: fechaNacJugador,
                 nssJugador: nssJugador,
                 curpJugador: curpJugador,
                 boletaJugador: boletaJugador,
                 semestreJugador: semestreJugador,
                 uidUsuario: usuario.uid
             })
             .then (() => {
                cambiarNombreJ('');
                cambiarApellidosJ('');
                cambiarFechaNacJ('');
                cambiarNssJ('');
                cambiarCurpJ('');
                cambiarBoletaJ('');
                cambiarSemestreJ('');

                cambiarEdoAlerta(true);
                cambiarAlerta({tipo: 'exito', mensaje: 'Jugador registrado exitosamente'});
             }) 
             .catch((error) => {
                cambiarEdoAlerta(true);
				cambiarAlerta({tipo: 'error', mensaje: 'Hubo un problema al intentar agregar tu gasto.'});
             })  
            }
                      
        } else {
            cambiarEdoAlerta(true);
            cambiarAlerta({tipo: 'error', mensaje: 'Completa todos los campos'});
        }
         
    }

    return ( 
        <>
        <Helmet>
            <title>Registrar Escuela</title>
        </Helmet>
        <h1> REGISTRAR JUGADOR </h1>
        <main>
         <FormularioJugador onSubmit={handleSubmit}>
            <div>
                <Label> Nombre(s) </Label>
                <GrupoInput>
                    <Input
                    type='text'
                    name='nombre'
                    value = {nombreJugador}
                    onChange = {handleChange}
                    />
                </GrupoInput>
            </div>
            <div>
                <Label> Apellido(s) </Label>
                <GrupoInput>
                    <Input
                    type='text'
                    name='apellidos'
                    value = {apellidosJugador}
                    onChange = {handleChange}
                    />
                </GrupoInput>
            </div>
            <div>
                <Label> Fecha de Nacimiento </Label>
                <GrupoInput>
                    <Input
                    type='date'
                    name='fechanac'
                    value = {fechaNacJugador}
                    onChange = {handleChange}
                    />
                </GrupoInput>
            </div>
            <div>
                <Label> Numero de Seguridad Social </Label>
                <GrupoInput>
                    <Input
                    type='text'
                    name='nss'
                    value = {nssJugador}
                    onChange = {handleChange}
                    />
                </GrupoInput>
            </div>
            <div>
                <Label> CURP </Label>
                <GrupoInput>
                    <Input
                    type='text'
                    name='curp'
                    value = {curpJugador}
                    onChange = {handleChange}
                    />
                </GrupoInput>
            </div>
            <div>
                <Label> Boleta </Label>
                <GrupoInput>
                    <Input
                    type='text'
                    name='boleta'
                    value = {boletaJugador}
                    onChange = {handleChange}
                    />
                </GrupoInput>
            </div>
            <div>
                    <Label htmlFor='semestre'> Semestre </Label>
                    <GrupoInput>
                        <select name="semestre" onChange = {handleChange}  >
                            <option value="1"> 1° Semestre </option>
                            <option value="2"> 2° Semestre </option>
                            <option value="3"> 3° Semestre </option>
                            <option value="4"> 4° Semestre </option>
                            <option value="5"> 5° Semestre </option>
                            <option value="6"> 6° Semestre </option>
                            <option value="7"> 7° Semestre </option>
                            <option value="8"> 8° Semestre </option>
                            <option value="9"> 9° Semestre </option>
                        </select> 
                    </GrupoInput>   
            </div>
            <ContenedorBotonCentrado>
                <Boton as="button"  type = 'submit' >  {jugador ? 'Editar Jugador' : 'Agregar Jugador'} </Boton>
                <Boton as={Link} to='/menu-profe'>  <IconoRegresar/></Boton>
            </ContenedorBotonCentrado>
        <Alerta 
           tipo= {alerta.tipo}
           mensaje= {alerta.mensaje}
           estadoAlerta={estadoAlerta}
           cambiarEdoAlerta={cambiarEdoAlerta}
        /> 
        </FormularioJugador>  
        
        </main>
        
        </>
     );
}
 
export default RegistrarJugador;