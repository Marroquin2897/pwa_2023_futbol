import React, {useState} from 'react';

import {Helmet} from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import firebaseApp from "../firebase/firebaseConfig";
import {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {getFirestore,doc,setDoc} from "firebase/firestore"
import { Formulario, Label, GrupoInput, ContenedorBotonCentrado,Boton,
MensajeExito} from '../elementos/ElementosFormulario';
import Alerta from '../elementos/Alerta';


import ComponenteInput from './Input';

const auth = getAuth(firebaseApp);

const RegistroUsuario = () => {

    const firestore = getFirestore(firebaseApp);
    const [registrarse, setRegistrarse] = useState(false);
    const navigate = useNavigate();

    const [names,cambiarNombre] = useState({campo: '',valido: null});
    const [lastnames,cambiarApellidos] = useState({campo: '',valido: null});
    const [fechaNacimiento,cambiarFechaNacimiento] = useState({campo: '',valido: null});
    const [phone,cambiarTelefono] = useState({campo: '',valido: null});
    const [address,cambiarDireccion] = useState({campo: '',valido: null});
    const [boletaempl,cambiarBoleta] = useState({campo: '',valido: null});
    const [correoo,cambiarCorreo] = useState({campo: '',valido: null});
    const [contrasenia,cambiarContrasenia] = useState({campo: '',valido: null});
    const [contrasenia2,cambiarContrasenia2] = useState({campo: '',valido: null});
    const [formularioValido, cambiarFormularioValido] = useState(null);
    const[estadoAlerta,cambiarEdoAlerta] = useState(false);
    const[alerta,cambiarAlerta] = useState({});

    const expresiones = {
		nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
        direccion: /^[a-zA-Z0-9\s]+$/,
		password: /^.{8,12}$/, // 4 a 12 digitos.
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		telefono: /^\d{10,14}$/, // 7 a 14 numeros.
        boleta: /^\d{7,14}$/
	}
    const validarPassword2 = () => {
        if(contrasenia.campo.length > 0) {
            if(contrasenia.campo !== contrasenia2.campo){
                cambiarContrasenia2((prevState) => {
                    return {...prevState,valido: 'false'}
                });
            } else {
                cambiarContrasenia2((prevState) => {
                    return {...prevState,valido: 'true'}
                });
            }
        }
    }

    async function registrarUsuario (nombre,apellidos,fechaNac,telefono,direccion,boleta,email, password, rol){ 
        cambiarEdoAlerta(false);
        cambiarAlerta({});
        try{
            const infoUsuario = await createUserWithEmailAndPassword(
                auth,
                email,
                password)
                .then ((usuarioFirebase) => {
                return usuarioFirebase;
                })
                //Pasamos el UID del usuario para guardarlo en la BD
            const docuRef = doc(firestore,`usuarios/${infoUsuario.user.uid}`);
            setDoc(docuRef,{
                nombre: nombre,
                apellidos: apellidos,
                fechaNacimiento: fechaNac,
                telefono: telefono,
                direccion: direccion,
                boleta: boleta,
                correo: email,
                rol: rol
            });
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo:'exito',
                mensaje:'Registrado exitosamente'
            });
            navigate('/iniciar-sesion');

        } catch(error){
            cambiarEdoAlerta(true);
            let mensaje;
            switch(error.code){
                case 'auth/invalid-password':
					mensaje = 'La contraseña tiene que ser de al menos 8 caracteres.'
					break;
				case 'auth/email-already-in-use':
					mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
				    break;
				case 'auth/invalid-email':
					mensaje = 'El correo electrónico no es válido.'
				    break;
				default:
					mensaje = 'Hubo un error al intentar crear la cuenta.'
				    break;
            }
            cambiarAlerta({
                tipo:'error',
                mensaje: mensaje
               });

        }  
            
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nombre = e.target.nombre.value;
        const apellidos = e.target.apellidos.value;
        const fechaNacimiento = e.target.fechaNac.value;
        const telefono = e.target.telefono.value;
        const direccion = e.target.direccion.value;
        const boleta = e.target.boleta.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const password2 = e.target.password2.value;
        const rol = e.target.rol.value;

        //Validar que todos los campos esten completos
        if(names.valido === 'true' &&
            lastnames.valido === 'true' &&
            fechaNacimiento.valido === 'true' &&
            phone.valido === 'true' &&
            address.valido === 'true' &&
            boletaempl.valido === 'true' &&
            correoo.valido === 'true' &&
            contrasenia.valido === 'true' &&
            contrasenia2.valido === 'true' ){

            cambiarFormularioValido(true);
            
        }
        else {
            cambiarFormularioValido(false);
        }

        if(registrarse){
            registrarUsuario(nombre,apellidos,fechaNacimiento,telefono,direccion,boleta,email, password, rol);
        }
        else {
            signInWithEmailAndPassword(auth,email,password);
            
        }

        
    }


    return ( 
        <>
        <Helmet>
            <title> Crear Cuenta </title>
        </Helmet>
        <h1> CREAR CUENTA </h1>
        <main>
          <Formulario onSubmit={handleSubmit}>
            <ComponenteInput
                label= "Nombre(s)"
                tipo= "text"
                name="nombre"
                leyendaError="Solo se permiten letras"
                expresionRegular={expresiones.nombre}
                estado={names}
                cambiarEstado={cambiarNombre}
                />
            <ComponenteInput
                label= "Apellidos(s)"
                tipo= "text"
                name="apellidos"
                leyendaError="Solo se permiten letras"
                expresionRegular={expresiones.apellido}
                estado={lastnames}
                cambiarEstado={cambiarApellidos}
                />
            <ComponenteInput
                label= "Fecha de Nacimiento"
                tipo= "date"
                name="fechaNac"
                estado={fechaNacimiento}
                cambiarEstado={cambiarFechaNacimiento}
                />
            <ComponenteInput
                label= "Telefono "
                tipo= "text"
                name="telefono"
                leyendaError=" 10 digitos"
                expresionRegular={expresiones.telefono}
                estado={phone}
                cambiarEstado={cambiarTelefono}
                />
            <ComponenteInput
                label= "Dirección "
                tipo= "text"
                name="direccion"
                leyendaError="Solo se permiten letras y numeros"
                expresionRegular={expresiones.direccion}
                estado={address}
                cambiarEstado={cambiarDireccion}
                />
            <ComponenteInput
                label= "Boleta o No. Empleado"
                tipo= "text"
                name="boleta"
                leyendaError="10 digitos"
                expresionRegular={expresiones.boleta}
                estado={boletaempl}
                cambiarEstado={cambiarBoleta}
                />
            <ComponenteInput
                label= "Correo Electrónico"
                tipo= "text"
                name="email"
                leyendaError="Ingrese un correo valido"
                expresionRegular={expresiones.correo}
                estado={correoo}
                cambiarEstado={cambiarCorreo}
                />
            <ComponenteInput
                label= "Contraseña"
                tipo= "password"
                name="password"
                leyendaError=" 8 caracteres "
                expresionRegular={expresiones.password}
                estado={contrasenia}
                cambiarEstado={cambiarContrasenia}
                />
            <ComponenteInput
                label= "Confirmar Contraseña"
                tipo= "password"
                name="password2"
                leyendaError=" No coinciden la contraseña"
                estado={contrasenia2}
                cambiarEstado={cambiarContrasenia2}
                funcion={validarPassword2}
                
                />
            <div>
              <Label htmlFor='rol'> Rol </Label>
              <GrupoInput>
                <select name="rol">
                    
                    <option value="jugador"> Jugador </option>
                    <option value="profesor"> Profesor </option>
                </select> 
              </GrupoInput>   
            </div>

            <ContenedorBotonCentrado>
              <Boton  type = 'submit' onClick={() => setRegistrarse(!registrarse)}> Crear Cuenta </Boton>  
               
            </ContenedorBotonCentrado>
            <Alerta 
                tipo= {alerta.tipo}
                mensaje= {alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEdoAlerta={cambiarEdoAlerta}
            />  
        </Formulario>  
        </main>
        
        
        
       
        </>
        
     );
}
 
export default RegistroUsuario;