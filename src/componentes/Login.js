import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom';
import firebaseApp from "../firebase/firebaseConfig";

const auth = getAuth(firebaseApp);

const Login = () => {

    const navigate = useNavigate();
    const[email, establecerEmail] = useState('');
    const[password, establecerPassword] = useState('');    

    const handleChange = (e) => {
        if(e.target.name === 'email'){
            establecerEmail(e.target.value);
        } else if(e.target.name === 'password'){
            establecerPassword(e.target.value);
        }
    }
    const handleSubmit = async (e) =>{ //Para obtener los datos de los inputs
        e.preventDefault();
        
        //Iniciar Sesión con email y password
        try{
            await signInWithEmailAndPassword(auth,email,password);
            navigate('/rol');

        } catch(error){ //Mostrar los errores que puede haber en cada campo
            console.log(error)
            
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
           
        }
            
    }


    return ( 
       <div>
        <Helmet>
          <title>Iniciar Sesion</title>
        </Helmet>  
        <section className='login'>
            <div className='loginContainer'> 
                <h1>Iniciar Sesión</h1>
                <form onSubmit={handleSubmit}>
                    <label> Correo </label>
                    <input
                        type='email'
                        name='email'
                        value = {email}
                        onChange={handleChange}
                    />
                    <label> Contraseña </label>
                    <input
                        type='password'
                        name='password'
                        value = {password}
                        onChange={handleChange}  
                    />
                    <div className='btnContainer'>
                        <button type='submit'>Iniciar Sesión</button>
                        
                        <p>¿No tienes cuenta? <Link to='/crear-cuenta'><span> Registrate</span></Link></p>
                        <p>¿Olvidaste tu contraseña? <Link to='/forgot-password'><span> Reestablecer Contraseña</span></Link></p>
                    </div>
                </form>
            </div>
        </section>
      </div>
     );
}
 
export default Login;