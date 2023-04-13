import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom';
import firebaseApp from "../firebase/firebaseConfig";
import Alerta from '../elementos/Alerta';

const auth = getAuth(firebaseApp);

const Login = () => {

    const navigate = useNavigate();
    const[email, establecerEmail] = useState('');
    const[password, establecerPassword] = useState('');    
    const[estadoAlerta,cambiarEdoAlerta] = useState(false);
    const[alerta,cambiarAlerta] = useState({});

    const handleChange = (e) => {
        if(e.target.name === 'email'){
            establecerEmail(e.target.value);
        } else if(e.target.name === 'password'){
            establecerPassword(e.target.value);
        }
    }
    const handleSubmit = async (e) =>{ //Para obtener los datos de los inputs
        e.preventDefault();
        cambiarEdoAlerta(false);
        cambiarAlerta({});

        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if(!expresionRegular.test(email)){ //Si NO hay correo entonces mostramos mensaje de error
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Ingresa un correo válido'
            });
            return;
        }
        //Validacion de que llena todos los campos
        if( email ==='' || password === ''){ 
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Falta llenar email y/o contraseña'
            });
            return;
        }
        
        //Iniciar Sesión con email y password
        try{
            await signInWithEmailAndPassword(auth,email,password);
            navigate('/rol');

        } catch(error){ //Mostrar los errores que puede haber en cada campo
            console.log(error)
            cambiarEdoAlerta(true);
           let mensaje;
           switch(error.code){
                case 'auth/wrong-password':
                    mensaje = 'La contraseña no es correcta.'
                    break;
                case 'auth/user-not-found':
                    mensaje = 'No se encontro una cuenta con este correo electronico'
                    break;
                default:  
                    mensaje = 'Hubo un error al iniciar sesión.'
                    break;
           }
           cambiarAlerta({
            tipo:'error',
            mensaje: mensaje
           });
           
        }
            
    }


    return ( 
       <div className="hero">
        <Helmet>
          <title>Iniciar Sesión</title>
        </Helmet>  
      <nav>
        <img src="https://tinyurl.com/233pns5r"/>
        <h2>Plataforma para la coordinacion de F7, FA Y FR del IPN</h2> 
      </nav>
        <section className='login'>
            <div className='loginContainer'> 
                <h1>Iniciar Sesión</h1>
                <form onSubmit={handleSubmit}>
                    <label> <b>Correo</b> </label>
                    <input
                        type='email'
                        name='email'
                        value = {email}
                        onChange={handleChange}
                    /><br/><br/>
                    <label><b>Contraseña</b>  </label>
                    <input
                        type='password'
                        name='password'
                        value = {password}
                        onChange={handleChange}  
                    />
                    <div className='menu2'> <br/><br/><br/><br/>
                        <button type='submit'>Ingresar</button><br/><br/><br/>
                        
                        <p>¿No tienes cuenta? <Link to='/crear-cuenta'><span> Regístrate</span></Link></p> <br/>
                        <p>¿Olvidaste tu contraseña? <Link to='/forgot-password'><br/><span> Restablecer contraseña</span></Link></p>
                    </div>
                </form>
            </div>
        </section>
        <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEdoAlerta={cambiarEdoAlerta}/>
      </div>
     );
}
 
export default Login;