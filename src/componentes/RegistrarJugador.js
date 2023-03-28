import React,{useState,useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { FormularioJugador,Label, GrupoInput, Input, ContenedorBotonCentrado, Boton, MensajeExito } from '../elementos/ElementosFormulario';

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

            agregarJugador({
                   nombreJugador: nombreJugador,
                   apellidosJugador: apellidosJugador,
                   fechaNacJugador: fechaNacJugador,
                   nssJugador: nssJugador,
                   curpJugador: curpJugador,
                   boletaJugador: boletaJugador,
                   semestreJugador: semestreJugador,
                   uidUsuario: usuario.uid
                });
            
            console.log(agregarJugador());
                
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
                <Boton as="button"  type = 'submit' > Registrar Jugador  
               
                </Boton>  
            </ContenedorBotonCentrado>
        </FormularioJugador>  
        <Alerta 
            tipo= {alerta.tipo}
            mensaje= {alerta.mensaje}
            estadoAlerta={estadoAlerta}
            cambiarEdoAlerta={cambiarEdoAlerta}/> 
        </main>
        
        </>
     );
}
 
export default RegistrarJugador;