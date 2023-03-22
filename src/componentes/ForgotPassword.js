import React, {useState,useRef} from 'react';
import { Link } from 'react-router-dom'
import { useAuth } from '../contextos/AuthContext';


const ForgotPassword = () => {

    const emailRes = useRef();
    const{resetPassword} = useAuth();
    const[loading,setLoading] = useState(false);
    const[mensaje, setMensaje] = useState('');
    const [error, setError] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            setMensaje('');
            setError('');
            setLoading(true);
            await resetPassword(emailRes.current.value) //Funcion para reestablecer password 
            setMensaje('Revisa tu bandeja de entrada y sigue las instrucciones');
           
        }
        catch (error){
            console.log(error);
            setError('Error al reestablecer contraseña')
        }
        setLoading(false);
    }

    return ( 
    <div>
      <section className="login">
        <div className="loginContainer">
          <h1>Recuperar contraseña</h1>
          { error && <h1>{error}</h1> }
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type='email'
              autoFocus
              required
              ref={emailRes}
            />
            <div className="btnContainer">
              <button type='submit' disabled={loading}>Restaurar password</button>
              <p><Link to='/iniciar-sesion'><span>Regresear</span></Link></p>
            </div>
          </form>
        </div>
      </section>
    </div>
     );
}
 
export default ForgotPassword;