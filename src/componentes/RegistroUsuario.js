import React, {useState, useEffect} from 'react';
import {useAuth} from './../contextos/AuthContext';
import {Helmet} from 'react-helmet';
import { Await, useNavigate } from 'react-router-dom';
import {firebaseApp} from "../firebase/firebaseConfig";
import {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {getFirestore,doc,setDoc, updateDoc} from "firebase/firestore"
import { Formulario, Label, GrupoInput, Input, ContenedorBotonCentrado, Boton} from '../elementos/ElementosFormulario';
import Alerta from '../elementos/Alerta';

const auth = getAuth(firebaseApp);

const RegistroUsuario = ({usuario}) => {
    
    const firestore = getFirestore(firebaseApp);
	const [registrarse, setRegistrarse] = useState(false);
    const navigate = useNavigate();
    const [existencia, cambiarExistencia] = useState(false);
    const[nombre, cambiarNombre] = useState('');
    const[apellidos, cambiarApellidos] = useState('');
    const[fechaNacimiento, cambiarFechaNacimiento] = useState('');
    const[telefono, cambiarTelefono] = useState('');
    const[direccion, cambiarDireccion] = useState('');
    const[boleta,cambiarBoletaEmpleado] = useState('');
    const[correo, cambiarCorreo] = useState('');
    const[contrasenia, cambiarContrasenia] = useState('');
    const[contrasenia2, cambiarContrasenia2] = useState('');	
    const[rol,cambiarRol] = useState('');
    const[estadoAlerta,cambiarEdoAlerta] = useState(false);
    const[alerta,cambiarAlerta] = useState({});

	const{usuarioAPP} = useAuth(); 
    useEffect(() => { //Comprobamos si hay algun usuario, si hay obtenemos los valores que tiene ese usuario
        if(usuario){
            if(usuario.data().uidUsuario === usuario.uid){ 
                cambiarNombre(usuario.data().nombre);
                cambiarApellidos(usuario.data().apellidos);
                cambiarFechaNacimiento(usuario.data().fechaNacimiento);
                cambiarTelefono(usuario.data().telefono);
                cambiarDireccion(usuario.data().direccion);
                cambiarBoletaEmpleado(usuario.data().boleta);
                cambiarCorreo(usuario.data().correo);
                cambiarContrasenia(usuario.data().contrasenia);
                cambiarContrasenia2(usuario.data().contrasenia2);
                cambiarRol(usuario.data().rol);
            } 
            cambiarExistencia(true)
        }
    },[usuario,usuarioAPP,navigate]);


    async function actualizarUsuario (nombre,apellidos,fechaNacimiento,telefono,direccion) {
        cambiarEdoAlerta(false);
        cambiarAlerta({});
        let mensaje;
        try{
            const firestore = getFirestore(firebaseApp);
            const id = usuario.id
            console.log(nombre,apellidos,fechaNacimiento,telefono,direccion,boleta,correo,contrasenia,rol)
            const documento = doc(firestore, `usuarios`, id);
            updateDoc(documento,{
                nombre: nombre,
                apellidos: apellidos,
                fechaNacimiento: fechaNacimiento,
                telefono:telefono,
                direccion: direccion,
            });  
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo:'exito',
                mensaje:'Actualizado exitosamente'
            });
             navigate('/rol')
        }catch(error){
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo:'error',
                mensaje:'Hubo un error al actualizar'
            });
            console.log(error)
        }
        
    }


	async function registrarUsuario (nombre,apellidos,fechaNacimiento,telefono,direccion,boleta,correo, contrasenia, rol){ 
        cambiarEdoAlerta(false);
        cambiarAlerta({});
        let mensaje;
        try{
            const infoUsuario = await createUserWithEmailAndPassword(
                auth,
                correo,
                contrasenia)
                .then ((usuarioFirebase) => {
                return usuarioFirebase;
                })
                //Pasamos el UID del usuario para guardarlo en la BD
            const docuRef = doc(firestore,`usuarios/${infoUsuario.user.uid}`);
            setDoc(docuRef,{
                nombre: nombre,
                apellidos: apellidos,
                fechaNacimiento: fechaNacimiento,
                telefono: telefono,
                direccion: direccion,
                boleta: boleta,
                correo: correo,
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
            
            switch(error.code){
                case 'auth/invalid-password':
					mensaje = 'La contraseña tiene que ser de al menos 8 caracteres.'
					break;
				case 'auth/email-already-in-use':
					mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
                    navigate('/iniciar-sesion');
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
	
	const handleChange = (e) => {
        switch(e.target.name){
            case 'nombre':
                cambiarNombre(e.target.value);
                break;
            case 'apellidos':
                cambiarApellidos(e.target.value);
                break;
            case 'fechaNacimiento':
                cambiarFechaNacimiento(e.target.value);
                break;
            case 'telefono':
                cambiarTelefono(e.target.value);
                break; 
            case 'direccion':
                cambiarDireccion(e.target.value);
                break;
            case 'boleta':
                cambiarBoletaEmpleado(e.target.value);
                break;
            case 'correo':
                cambiarCorreo(e.target.value);
                break; 
            case 'contrasenia':
                cambiarContrasenia(e.target.value);
                break;     
            case 'contrasenia2':
                cambiarContrasenia2(e.target.value);
                break;    
            case 'rol':
                cambiarRol(e.target.value);
                break;  
            default:
                break;
        }
	}

	const handleSubmit = async (e) => {

		e.preventDefault();
		//const rol = e.target.rol.value; //linea necesaria para guardar el rol del jugador
		//validar el correo, nombre, direccion, telefono, boleta, apellidos
        const expresionRegularNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
        const expresionRegularApellidos = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
        const expresionRegularTelefono = /^\d{10,14}$/;// 10 a 14 numeros
        const expresionRegularBoleta = /^\d{6,14}$/;
		const expresionRegularCorreo = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
		const expresionRegularDireccion = /^[a-zA-Z0-9\s]+$/;
		const expresionRegularPassword = /^.{8,12}$/; // 8 a 12 digitos.
		
				
        if(!expresionRegularNombre.test(nombre)){ 
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Ingrese un nombre válido'
            });
            return;
        }
        if(!expresionRegularApellidos.test(apellidos)){
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo:'error',
                mensaje:'Ingrese correctamente sus apellidos'
            });
            return;
        }
        const fechaIngresada = new Date(fechaNacimiento)
        // Obtener el año actual
        const anioActual = new Date().getFullYear();
          
        // Obtener la fecha hace 15 años
        const fechaLimite = new Date(anioActual - 15, 0, 1); // Restar 15 años al año actual

        console.log("esta fecha limita",fechaLimite)
         // Validar que la fecha ingresada no sea mayor al año actual
         if (fechaIngresada.getFullYear() > anioActual ) {
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo:'error',
                mensaje:'La fecha no puede ser mayor al año actual'
            });
            return;
         }else if(fechaLimite <= fechaIngresada){ // Validar que la persona tenga al menos 15 años en el año actual
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo:'error',
                mensaje:'Debes tener al menos 15 años'
            });
            return;
         }
        if(!expresionRegularTelefono.test(telefono)){
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo:'error',
                mensaje:'El número de teléfono debe ser de 10 digitos'
            });
            return;
        }
        if(!expresionRegularDireccion.test(direccion)){ 
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Ingresa una dirección válida'
            });
            return;
        }
        if(!expresionRegularBoleta.test(boleta)){
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo:'error',
                mensaje:'Sólo se permiten números en la Boleta/No. Empleado'
            });
            return;
        }

        if(!expresionRegularCorreo.test(correo)){ //Si NO hay correo entonces mostramos mensaje de error
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Ingresa un correo válido'
            });
            return;
        }
		
		
		
		if(!expresionRegularPassword.test(contrasenia)){ 
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Ingresa una contraseña válida'
            });
            return;
        }
		
        if(rol === "opcDeter"){
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Elige un rol'
            });
            return;
        }
        //Validar que las contraseñas sean iguales
        if(contrasenia !== contrasenia2){
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Las contraseñas no son iguales'
            });
            return;
        }
		
		//Validar que ningun campo quede vacio
        if(nombre !== '' && apellidos !== '' && fechaNacimiento !== '' && telefono !== '' && direccion !== '' && boleta !== '' && correo !=='' && contrasenia !== '' && contrasenia2 !=='' && rol !== ''
        ){ 
            if(usuario){              
              await actualizarUsuario(nombre,apellidos,fechaNacimiento,telefono,direccion) 
            }else if(!usuario) {
               await registrarUsuario(nombre,apellidos,fechaNacimiento,telefono,direccion,boleta,correo, contrasenia, rol);
            }      
        }else{
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Completa todos los campos'
            });
            return;
        }
        
        
	}
	const nameUsuario = sessionStorage.getItem("name")
	return(
    <div className="hero">
      <nav>
      <img src="https://tinyurl.com/2obtocwe"/>
      <center><h2>{existencia ? 'Editar Usuario' : 'Crear Cuenta'}</h2>
              <h2>{nameUsuario}</h2></center> 
                <h3><img src="https://tinyurl.com/2kaldmbh"/></h3>      
      </nav>
        <Helmet>
            <title> Crear Cuenta </title>
        </Helmet>
        
		<main>
        <Formulario onSubmit={handleSubmit}>
            <div>
				<Label> Nombre(s) *</Label>
				<GrupoInput>
					<Input
						type='text'
						name='nombre'
						placeholder='Ingresa tu nombre(s)'
						value={nombre}
						onChange={handleChange}
					/>
				</GrupoInput>
			</div>
			<div>
				<Label> Apellido(s) *</Label>
				<GrupoInput>
					<Input
						type='text'
						name='apellidos'
						placeholder='Ingresa tu apellido(s)'
						value={apellidos}
						onChange={handleChange}
					/>
				</GrupoInput>
			</div>
			<div>
                <Label> Fecha de Nacimiento *</Label>
                <GrupoInput>
                        <Input
                        type='date'
                        name='fechaNacimiento'
                        value = {fechaNacimiento}
                        onChange = {handleChange}
                        />
                </GrupoInput>
			</div>
			<div>
				<Label> Teléfono *</Label>
				<GrupoInput>
					 <Input
						type='text'
						name='telefono'
						placeholder='Ingresa tu teléfono 10 digitos'
						value={telefono}
						onChange={handleChange}
					/>
				</GrupoInput>
			</div>
			<div>
				<Label> Dirección *</Label>
				<GrupoInput>
					<Input
						type='text'
						name='direccion'
						value={direccion}
						onChange={handleChange}
						placeholder='Calle No. Ext No. Int Col. CP Municipio/Alcaldia'
					/>
				</GrupoInput>
			</div>
			<div>
				<Label> Boleta o No. Empleado *</Label>
				<GrupoInput>
					 <Input
						type='number'
						name='boleta'
						value={boleta}
						onChange={handleChange}
						placeholder='Boleta (Alumno) o No. Empleado (Profesor)'
                        disabled={existencia ? true : false }
					/>
				</GrupoInput>
			</div>
			<div>
				<Label> Correo Electrónico *</Label>
				<GrupoInput>
					<Input
						type='email'
						name='correo'
						placeholder='Ingresa tu correo'
						value={correo}
						onChange={handleChange}
                        disabled={existencia ? true : false }
					/>
				</GrupoInput>
			</div>
			<div>
				<Label> Contraseña *</Label>
				<GrupoInput>
					<Input
						type='password'
						name='contrasenia'
						placeholder='Contraseña'
						value={contrasenia}
						onChange={handleChange}
                        disabled={existencia ? true : false }
					/>
				</GrupoInput>
			</div>
			<div>
				<Label> Confirmar Contraseña *</Label>
				<GrupoInput>
					<Input
						type='password'
						name='contrasenia2'
						placeholder='Confirmar contraseña'
						value={contrasenia2}
						onChange={handleChange}
                        disabled={existencia ? true : false }
					/>  
				</GrupoInput>
			</div>
			<div>
              <Label htmlFor='rol'> Rol *</Label>
              <GrupoInput>
                <select name="rol" disabled={existencia ? true : false } onChange={handleChange}> 
                    <option value="opcDeter"> {existencia ? rol : "Elige un rol" }  </option>                 
                    <option value="alumno"> Alumno </option>
                    <option value="profesor"> Profesor </option>
                </select> 
              </GrupoInput>   
            </div>

            <center><h5> * TODOS LOS CAMPOS SON OBLIGATORIOS </h5></center>

            <ContenedorBotonCentrado>
                <Boton as="button"  type = 'submit' >  {existencia ? 'Editar Usuario' : 'Crear Cuenta'} </Boton>
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
export default RegistroUsuario;