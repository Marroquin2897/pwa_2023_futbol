import React, {useState,useRef} from 'react';
import { Link } from 'react-router-dom'
import { useAuth } from '../contextos/AuthContext';


const ForgotPassword = () => {

    const emailRes = useRef();
    const{resetPassword} = useAuth();
    const[loading,setLoading] = useState(false);
    const[mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            setMensaje('');
            setError('');
            setLoading(true);
            await resetPassword(emailRes.current.value); //Funcion para restablecer password 
            setMensaje('Revisa tu bandeja de entrada y sigue las instrucciones');
           
        }
        catch (error){
            console.log(error);
            setError('Error al restablecer la contraseña');
        }
        setLoading(false);
    }

    return ( 
    <div className="hero">
      <nav>
         <img src="https://tinyurl.com/233pns5r"/>
         <h2>Plataforma para la coordinacion de F7, FA Y FR del IPN</h2> 
      </nav>
      <section className="login">
        <div className="loginContainer">
          <h1>Restablecer contraseña</h1>
          <form onSubmit={handleSubmit}>
            <label>Ingresa tu correo electrónico</label>
            <input
              type='email'
              autoFocus
              required
              ref={emailRes}
            />
            { error && <h4>{error}</h4> }
            <br/><br/>{ mensaje && <h5>{mensaje}</h5> }
            <div className="menu2"><br/><br/>
              <button type='submit' disabled={loading}>Enviar solicitud</button>
              <br/><br/><p><Link to='/iniciar-sesion'><span>Regresar</span></Link></p>
            </div>
          </form>
        </div>
      </section>
    </div>
     );
}
 
export default ForgotPassword;