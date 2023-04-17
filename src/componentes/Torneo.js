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

        if(nombreTorneo !== '' && modalidadTorneo !== '' && sistemaCompetencia !== ''){
            agregarTorneo({
                nombreTorneo: nombreTorneo,
                modalidadTorneo: modalidadTorneo,
                sistemaCompetencia: sistemaCompetencia,
                uidUsuario: usuario.uid
            })
            .then(() => {
                cambiarNombreT('');
                cambiarModalidadT('');
                cambiarSistemaC('');

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
        <>
        <Helmet>
            <title> Nuevo Torneo </title>
        </Helmet>
        <h1> Nuevo Torneo  </h1>
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
                    <Label htmlFor='modalidades'> Modalidades </Label>
                    <GrupoInput>
                        <select name="sistemacompetencia" onChange = {handleChange}>
                            
                            <option value="Round Robin"> Todos contra todos </option>
                            <option value="Grupos"> Por Grupos </option>
                            <option value="Eliminacion Directa"> Eliminación Directa </option>
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
        
        </>
     );
}
 
export default Torneo;