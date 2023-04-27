import React,{useState} from 'react';
import { Helmet } from 'react-helmet';
import { Formulario, Label, GrupoInput, Input, ContenedorBotonCentrado, Boton} from '../elementos/ElementosFormulario';
import Alerta from '../elementos/Alerta';
import {useAuth} from './../contextos/AuthContext';
import {getFirestore, collection, addDoc,query,where, getDocs } from 'firebase/firestore';
import {firebaseApp} from "../firebase/firebaseConfig";
import agregarTorneo from '../firebase/agregarTorneo';

const Torneo = () => {

    const[estadoAlerta,cambiarEdoAlerta] = useState(false);
    const[alerta,cambiarAlerta] = useState({});
    const firestore = getFirestore(firebaseApp);
    const{usuario} = useAuth();
    const [nombreTorneo, cambiarNombreT] = useState('');
    const [modalidadTorneo, cambiarModalidadT] = useState('');
    const [sistemaCompetencia, cambiarSistemaC] = useState('');
    const [rama, cambiarRama] = useState('');
    const [nivelAcademico, cambiarNivelA] = useState('');


    const handleChange = (e) => { //Obtenemos los valores de los inputs
        switch(e.target.name){
            case 'nombreT':
                cambiarNombreT(e.target.value);
                break;
            case 'modalidadT':
                cambiarModalidadT(e.target.value);
                break;
            case 'sistemacompetencia':
                cambiarSistemaC(e.target.value);
                break;  
            case 'rama':
                cambiarRama(e.target.value);
                break; 
            case 'nivelA':
                cambiarNivelA(e.target.value);
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
                mensaje:'Ingrese un nombre valido'
            });
            return;
        }

        if(nombreTorneo !== '' && modalidadTorneo !== '' && sistemaCompetencia !== '' && rama !== '' && nivelAcademico !== ''){
            agregarTorneo({
                nombreTorneo: nombreTorneo,
                modalidadTorneo: modalidadTorneo,
                sistemaCompetencia: sistemaCompetencia,
                nivelAcademico: nivelAcademico,
                rama: rama,
                uidUsuario: usuario.uid
            })
            .then(() => {
                cambiarNombreT('');
                cambiarModalidadT('');
                cambiarSistemaC('');
                cambiarRama('');
                cambiarNivelA('');

                cambiarEdoAlerta(true);
                cambiarAlerta({tipo: 'exito', mensaje: 'Torneo registrado exitosamente'});
            })
            .catch((error) => {
                cambiarEdoAlerta(true);
                cambiarAlerta({tipo: 'error', mensaje: 'Hubo un problema al intentar registrar el torneo.'});
            })
        } else {
            cambiarEdoAlerta(true);
            cambiarAlerta({tipo: 'error', mensaje: 'Completa todos los campos'});
        }
    }
    return ( 
<div className="hero">
      <nav>
      <img src="https://tinyurl.com/2b2ek3ck"/>
        <center><h2>Nuevo Torneo</h2></center> 
        <h3><img src="https://tinyurl.com/233pns5r"/></h3>
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
                    <Label htmlFor='modalidades'> Modalidades </Label>
                    <GrupoInput>
                        <select name="modalidadT" onChange = {handleChange} >
                            
                            <option value="Futbol 7"> Fútbol 7 </option>
                            <option value="Futbol Rapido"> Fútbol Rápido </option>
                            <option value="Futbol Asociacion"> Fútbol Asociación </option>
                        </select> 
                    </GrupoInput>   
            </div>
            <div>
                    <Label htmlFor='modalidades'> Sistema de Competencia </Label>
                    <GrupoInput>
                        <select name="sistemacompetencia" onChange = {handleChange}>
                            <option value="Round Robin"> Todos contra todos </option>
                            <option value="Grupos"> Por Grupos </option>
                            <option value="Eliminacion Directa"> Eliminación Directa </option>
                        </select> 
                    </GrupoInput>   
            </div>
            <div>
                    <Label htmlFor='rama'> Rama </Label>
                    <GrupoInput>
                        <select name="rama" onChange = {handleChange}>
                            
                            <option value="Femenil"> Femenil </option>
                            <option value="Varonil"> Varonil </option>
                            
                        </select> 
                    </GrupoInput>   
            </div>
            <div>
                    <Label htmlFor='nivelA'> Nivel Académico </Label>
                    <GrupoInput>
                        <select name="nivelA" onChange = {handleChange}>
                            <option value="Media Superior"> Media Superior </option>
                            <option value="Superior"> Superior </option> 
                        </select> 
                    </GrupoInput>   
            </div>
            <ContenedorBotonCentrado>
                <Boton  type = 'submit' > Registrar </Boton>  
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