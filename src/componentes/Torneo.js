import React,{useState} from 'react';
import { Helmet } from 'react-helmet';
import { Formulario, Label, GrupoInput, Input, ContenedorBotonCentrado, Boton} from '../elementos/ElementosFormulario';
import Alerta from '../elementos/Alerta';
import {getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import {useAuth} from './../contextos/AuthContext';
import agregarTorneo from '../firebase/agregarTorneo';
import BtnRegresar from '../elementos/BtnRegresar';
import {firebaseApp} from "../firebase/firebaseConfig";

const Torneo = () => {

    const[estadoAlerta,cambiarEdoAlerta] = useState(false);
    const[alerta,cambiarAlerta] = useState({});
    const firestore = getFirestore(firebaseApp);
    const{usuario} = useAuth();
    const [nombreTorneo, cambiarNombreT] = useState(''); 
    const [sistemaCompetencia, cambiarSistemaC] = useState('');
   



    const handleChange = (e) => { //Obtenemos los valores de los inputs
        switch(e.target.name){
            case 'nombreT':
                cambiarNombreT(e.target.value);
                break;  
            case 'sistemacompetencia':
                cambiarSistemaC(e.target.value);
                break;       
            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nTorneo = /^[a-zA-ZáÁéÉíÍóÓúÚüÜñÑ\s\d]+$/ ;// Letras y espacios, pueden llevar acentos.
        if(!nTorneo.test(nombreTorneo)){
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Ingrese un Nombre Válido'
            });
            return;
        }
        const torneosRef = collection(firestore,'torneos');
        const q = query(torneosRef, where('nombreTorneo', '==', nombreTorneo),where('sistemaCompetencia', '==', sistemaCompetencia));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            cambiarEdoAlerta(true);
            cambiarAlerta({
              tipo: 'error',
              mensaje: 'El Torneo Ya Existe',
            });
            return;
          }
        if(nombreTorneo !== '' && sistemaCompetencia !== ''){
            agregarTorneo({
                nombreTorneo: nombreTorneo,
                sistemaCompetencia: sistemaCompetencia,
                uidUsuario: usuario.uid
            })
            .then(() => {
                cambiarNombreT('');        
                cambiarSistemaC('');
                

                cambiarEdoAlerta(true);
                cambiarAlerta({tipo: 'exito', mensaje: 'Torneo Registrado Exitosamente'});
            })
            .catch((error) => {
                cambiarEdoAlerta(true);
                cambiarAlerta({tipo: 'error', mensaje: 'Hubo un Problema al Intentar Registrar el Torneo.'});
            })
        } else {
            cambiarEdoAlerta(true);
            cambiarAlerta({tipo: 'error', mensaje: 'Completa Todos los Campos'});
        }
    }
    const nameUsuario = sessionStorage.getItem("name")
    return ( 
<div className="hero">
      <nav>
      <img src="https://tinyurl.com/2obtocwe" alt=''/>
        <center><h2>Nuevo Torneo</h2><h2><h2>{nameUsuario}</h2></h2></center> 
       <h3><img src="https://tinyurl.com/2kaldmbh" alt=''/></h3>
      </nav>
        <Helmet>
            <title> Nuevo Torneo </title>
        </Helmet>
        <main>
            <Formulario onSubmit={handleSubmit}>
            <div>
				<Label> Nombre del Torneo </Label>
				<GrupoInput>
					<Input
						type='text'
						name='nombreT'
                        value = {nombreTorneo}
                        onChange = {handleChange}
					/>
				</GrupoInput>
			</div>
            <div>
                    <Label htmlFor='modalidades'> Sistema de Competencia </Label>
                    <GrupoInput>
                        <select name="sistemacompetencia" onChange = {handleChange}>
                            <option value="Round Robin"> Todos contra todos </option>
                            <option value="Grupos"> Por Grupos </option>
                            
                        </select> 
                    </GrupoInput>   
            </div>
            
            <ContenedorBotonCentrado>
                <Boton  type = 'submit' > Registrar </Boton>  <br/>
                <BtnRegresar ruta = '/menu-admin'/>
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
 
export default Torneo;