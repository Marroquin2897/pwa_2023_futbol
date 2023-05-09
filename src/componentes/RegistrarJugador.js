import React,{useState,useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { FormularioJugador,Label, GrupoInput,ContenedorBotonCentrado, Input, Boton } from '../elementos/ElementosFormulario';
import { ContenedorBotonCentral } from '../elementos/ElementosDeLista';
import {ReactComponent as IconoRegresar} from './../imagenes/flecha.svg';
import BtnRegresar from '../elementos/BtnRegresar';
import Alerta from '../elementos/Alerta';
import {useAuth} from './../contextos/AuthContext';
import {firebaseApp} from "../firebase/firebaseConfig";
import {useNavigate} from 'react-router-dom';
import agregarJugador from '../firebase/agregarJugador';
import editarJugador from '../firebase/editarJugador';
import {getFirestore, collection, query, where , getDocs } from 'firebase/firestore';

const RegistrarJugador = ({jugador}) => {
    
    const navigate = useNavigate();
    const{usuario} = useAuth();
    const firestore = getFirestore(firebaseApp);
    const [nombreJugador, cambiarNombreJ] = useState('');
    const [apellidosJugador,cambiarApellidosJ] = useState('');
    const [fechaNacJugador,cambiarFechaNacJ] = useState('');
    const [nssJugador,cambiarNssJ] = useState('');
    const [curpJugador,cambiarCurpJ] = useState('');
    const [escuelaJugador,cambiarEscuelaJ] = useState('');
    const [boletaJugador,cambiarBoletaJ] = useState('');
    const [semestreJugador, cambiarSemestreJ] = useState('');
    const [sexoJugador, cambiarSexoJ] = useState('');
    const[estadoAlerta,cambiarEdoAlerta] = useState(false);
    const[alerta,cambiarAlerta] = useState({});


    useEffect(() => { //Comprobamos si hay algun jugador, si hay obtenemos los valores que tiene ese jugador
        if(jugador){
            if(jugador.data().uidUsuario === usuario.uid){
                cambiarNombreJ(jugador.data().nombreJugador);
                cambiarApellidosJ(jugador.data().apellidosJugador);
                cambiarFechaNacJ(jugador.data().fechaNacJugador);
                cambiarNssJ(jugador.data().nssJugador);
                cambiarCurpJ(jugador.data().curpJugador);
                cambiarEscuelaJ(jugador.data().escuelaJugador);
                cambiarBoletaJ(jugador.data().boletaJugador);
                cambiarSemestreJ(jugador.data().semestreJugador);
                cambiarSexoJ(jugador.data().sexoJugador);
            } else {
                navigate('/lista-jugadores');
            }
        }
    },[jugador,usuario,navigate]);
    
    
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
            case 'sexo':
                cambiarSexoJ(e.target.value);
                break; 
            case 'nss':
                cambiarNssJ(e.target.value);
                break;
            case 'curp':
                cambiarCurpJ(e.target.value);
                break;
            case 'escuela':
                cambiarEscuelaJ(e.target.value);
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

        const expresionNombreJ = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
        const expresionApellidoJ = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
        const expresionNssJ = /^\d{10,11}$/;
        const expresionCurpJ = /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GR|GT|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS){1}[B-DF-HJ-NP-TV-Z]{3}\w{1}\d{1}$/;
        const expresionBoletaJ = /^\d{9,10}$/;

        //Validando que en los campos ingrese el tipo de dato correcto y numero exacto de caracteres
        if(!expresionNombreJ.test(nombreJugador)){
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Ingrese un nombre valido'
            });
            return;
        }
        if(!expresionApellidoJ.test(apellidosJugador)){
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'Ingrese Apellido Paterno y Materno'
            });
            return;
        }
        if(!expresionNssJ.test(nssJugador)){
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'NSS deben ser 11 digitos'
            });
            return;
        }
        if(!expresionCurpJ.test(curpJugador)){
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'CURP: Solo se permiten letras y numeros '
            });
            return;
        }
        if(!expresionBoletaJ.test(boletaJugador)){
            cambiarEdoAlerta(true); 
            cambiarAlerta({
                tipo: 'error',
                mensaje:'El No. de boleta deben ser 10 digitos'
            });
            return;
        }

        //Comprobamos que los campos tengan un valor 
        if(nombreJugador !== '' && apellidosJugador !== '' && fechaNacJugador !== '' && nssJugador !== '' && curpJugador !== '' && escuelaJugador !== '' && boletaJugador !== ''
        && semestreJugador !== '' && sexoJugador !== '') {

            const consulta = await getDocs(query(collection(firestore,'jugadores'),where('boletaJugador','==',boletaJugador)));
            if (consulta.size > 0) {
                cambiarEdoAlerta(true);
                cambiarAlerta({tipo: 'error', mensaje: 'Este jugador ya ha sido registrado'});

            } else {
                if(jugador){
                    editarJugador({
                        id: jugador.id,
                        nombreJugador: nombreJugador,
                        apellidosJugador: apellidosJugador,
                        fechaNacJugador: fechaNacJugador,
                        sexoJugador: sexoJugador,
                        nssJugador: nssJugador,
                        curpJugador: curpJugador,
                        escuelaJugador: escuelaJugador,
                        boletaJugador: boletaJugador,
                        semestreJugador: semestreJugador
                    }).then(() => {
                        navigate('/lista-jugadores'); //cuando termine de editar que pase a la lista de jugadores
                    }). catch((error) => {
                        console.log(error);
                    })
                } else {
                   agregarJugador({
                     nombreJugador: nombreJugador,
                     apellidosJugador: apellidosJugador,
                     fechaNacJugador: fechaNacJugador,
                     sexoJugador: sexoJugador,
                     nssJugador: nssJugador,
                     curpJugador: curpJugador,
                     escuelaJugador: escuelaJugador,
                     boletaJugador: boletaJugador,
                     semestreJugador: semestreJugador,
                     uidUsuario: usuario.uid
                 })
                 .then (() => {
                    cambiarNombreJ('');
                    cambiarApellidosJ('');
                    cambiarFechaNacJ('');
                    cambiarNssJ('');
                    cambiarCurpJ('');
                    cambiarEscuelaJ('');
                    cambiarBoletaJ('');
                    cambiarSemestreJ('');
                    cambiarSexoJ('');
    
                    cambiarEdoAlerta(true);
                    cambiarAlerta({tipo: 'exito', mensaje: 'Jugador registrado exitosamente'});
                 }) 
                 .catch((error) => {
                    cambiarEdoAlerta(true);
                    cambiarAlerta({tipo: 'error', mensaje: 'Hubo un problema al intentar agregar al jugador.'});
                 })  
                }
            }
            
                      
        } else {
            cambiarEdoAlerta(true);
            cambiarAlerta({tipo: 'error', mensaje: 'Completa todos los campos'});
        }
         
    }
    const nameUsuario = sessionStorage.getItem("name")
    return ( 
        <div className="hero">
      <nav>
      <img src="https://tinyurl.com/2b2ek3ck"/>
      <center><h2>Registrar Nuevo Jugador</h2></center> 
      <div>
            <h3><img src="https://tinyurl.com/233pns5r"/></h3>
            <h2>{nameUsuario}</h2>
    </div>
      </nav>
        <Helmet>
            <title>Registrar Jugador</title>
        </Helmet>
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
                    <Label htmlFor='sexo'> Género </Label>
                    <GrupoInput>
                        <select name="sexo" onChange = {handleChange}  >
                            <option value="Femenino"> Femenino </option>
                            <option value="Masculino"> Masculino </option>
                        </select> 
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
                    <Label htmlFor='escuela'> Escuela </Label>
                    <GrupoInput>
                        <select name="escuela" onChange = {handleChange}>
                            <option value="CET 1"> CET 1 Walter Cross Buchanan </option>
                            <option value="Cecyt 1"> CECyT No. 1 Gonzalo Vázquez Vela </option>
                            <option value="Cecyt 2"> CECyT No. 2 Miguel Bernard </option>
                            <option value="Cecyt 3"> CECyT No. 3 Estanislao Ramírez Ruiz </option>
                            <option value="Cecyt 4"> CECyT No. 4 Lázaro Cárdenas </option>
                            <option value="Cecyt 5"> CECyT No. 5 Benito Juárez </option>
                            <option value="Cecyt 6"> CECyT No. 6 Miguel Othón de Mendizábal </option>
                            <option value="Cecyt 7"> CECyT No. 7 Cuauhtémoc </option>
                            <option value="Cecyt 8"> CECyT No. 8 Narciso Bassols </option>
                            <option value="Cecyt 9"> CECyT No. 9 Juan de Dios Bátiz </option>
                            <option value="Cecyt 10"> CECyT No. 10 Carlos Vallejo Márquez </option>
                            <option value="Cecyt 11"> CECyT No. 11 Wilfrido Massieu </option>
                            <option value="Cecyt 12"> CECyT No. 12 José María Morelos </option>
                            <option value="Cecyt 13"> CECyT No. 13 Ricardo Flores Magón </option>
                            <option value="Cecyt 14"> CECyT No. 14 Luis Enrique Erro </option>
                            <option value="Cecyt 15"> CECyT No. 15 Diódoro Antúnez Echegaray </option>
                            <option value="CICS Sto Tomas"> CICS Unidad Santo Tomás </option>
                            <option value="CICS Milpa Alta"> CICS Unidad Milpa Alta </option>
                            <option value="ENCB"> ENCB </option>
                            <option value="ENMyH"> ENMyH </option>
                            <option value="ESCA Sto Tomas"> ESCA Unidad Santo Tomás </option>
                            <option value="ESCA Tepepan"> ESCA Unidad Tepepan </option>
                            <option value="ESCOM"> ESCOM </option>
                            <option value="ESE"> ESE </option>
                            <option value="ESEO"> ESEO </option>
                            <option value="ESFM"> ESFM </option>
                            <option value="ESIME Zacatenco"> ESIME Unidad Zacatenco </option>
                            <option value="ESIME Azcapotzalco"> ESIME Unidad Azcapotzalco </option>
                            <option value="ESIME Culhuacan"> ESIME Unidad Culhuacán </option>
                            <option value="ESIME Ticoman"> ESIME Unidad Ticomán </option>
                            <option value="ESIQIE"> ESIQIE </option>
                            <option value="ESIT"> ESIT </option>
                            <option value="ESIA Tecamachalco"> ESIA Unidad Tecamachalco </option>
                            <option value="ESIA Ticoman"> ESIA Unidad Ticomán </option>
                            <option value="ESIA Zacatenco"> ESIA Unidad Zacatenco </option>
                            <option value="ESM"> ESM </option>
                            <option value="EST"> EST </option>
                            <option value="UPIBI"> UPIBI </option>
                            <option value="UPIICSA"> UPIICSA </option>
                            <option value="UPIITA"> UPIITA </option>
                        </select> 
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
                <Boton as="button"  type = 'submit' >  {jugador ? 'Editar Jugador' : 'Agregar Jugador'} </Boton> <br/>
                <BtnRegresar ruta = '/menu-profe'/>
            </ContenedorBotonCentrado>
        <Alerta 
           tipo= {alerta.tipo}
           mensaje= {alerta.mensaje}
           estadoAlerta={estadoAlerta}
           cambiarEdoAlerta={cambiarEdoAlerta}
        /> 
        </FormularioJugador>  
        
        </main>
        
        </div>
     );
}
 
export default RegistrarJugador;