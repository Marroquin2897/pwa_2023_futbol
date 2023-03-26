import React,{useState} from 'react';
import { Helmet } from 'react-helmet';
import { FormularioJugador,Label, GrupoInput, ContenedorBotonCentrado, Boton, MensajeExito } from '../elementos/ElementosFormulario';
import ComponenteInput from './Input';
import firebaseApp from "../firebase/firebaseConfig";
import {useAuth} from './../contextos/AuthContext';
import {getFirestore, addDoc, collection} from "firebase/firestore"
import {Link, useNavigate} from 'react-router-dom';

const RegistrarJugador = () => {
    const firestore = getFirestore(firebaseApp);
    const navigate = useNavigate();
    const{usuario} = useAuth();

    const [nombreJ,cambiarNombreJ] = useState({campo: '',valido: null});
    const [apellidosJ,cambiarApellidosJ] = useState({campo: '',valido: null});
    const [fechaNacJ,cambiarFechaNacJ] = useState({campo: '',valido: null});
    const [nssJ,cambiarNssJ] = useState({campo: '',valido: null});
    const [curpJ,cambiarCurpJ] = useState({campo: '',valido: null});
    const [boletaJ,cambiarBoletaJ] = useState({campo: '',valido: null});
    const [formularioValido, cambiarFormularioValido] = useState(null);

    const expresiones = {
		nombreJugador: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        apellidosJugador: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
        nssJugador: /^\d{10,11}$/,
        curpJugador: /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GR|GT|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS){1}[B-DF-HJ-NP-TV-Z]{3}\w{1}\d{1}$/,
        boletaJugador: /^\d{9,10}$/
	}

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nameJugador = e.target.nameJugador.value;
        const lastnameJugador = e.target.lastnameJugador.value;
        const fechaNacJugador = e.target.fechaNacJugador.value;
        const nssJugador = e.target.nssJugador.value;
        const curpJugador = e.target.curpJugador.value;
        const boletaJugador = e.target.boletaJugador.value;
        const semestreJugador = e.target.semestreJugador.value;

        if(nombreJ.valido === 'true' && apellidosJ.valido === 'true' && nssJ.valido === 'true' && curpJ.valido === 'true' &&
        boletaJ.valido === 'true') {
            cambiarFormularioValido(true);
        } else {
            cambiarFormularioValido(false);
        }

        try {
            await addDoc (collection(firestore,'jugadores'),{
                nameJugador: nameJugador,
                lastnameJugador: lastnameJugador,
                fechaNacJugador: fechaNacJugador,
                nssJugador: nssJugador,
                curpJugador: curpJugador,
                boletaJugador: boletaJugador,
                semestreJugador: semestreJugador,
                uidUsuario: usuario.uid
            });
        } catch (error){
            console.log(error);
        }
        navigate('/menu-profe');
    }
    return ( 
        <>
        <Helmet>
            <title>Registrar Escuela</title>
        </Helmet>
        <h1> REGISTRAR JUGADOR </h1>
        <main>
         <FormularioJugador onSubmit={handleSubmit}>
            <ComponenteInput
                    label= "Nombre(s)"
                    tipo= "text"
                    name="nameJugador"
                    leyendaError="Solo se permiten letras"
                    expresionRegular={expresiones.nombreJugador}
                    estado={nombreJ}
                    cambiarEstado={cambiarNombreJ}
            />
            <ComponenteInput
                    label= "Apellido(s)"
                    tipo= "text"
                    name="lastnameJugador"
                    leyendaError="Solo se permiten letras"
                    expresionRegular={expresiones.apellidosJugador}
                    estado={apellidosJ}
                    cambiarEstado={cambiarApellidosJ}
            />
            <ComponenteInput
                    label= "Fecha de Nacimiento"
                    tipo= "date"
                    name="fechaNacJugador"
                    estado={fechaNacJ}
                    cambiarEstado={cambiarFechaNacJ}
            />
            <ComponenteInput
                    label= "No. de Seguridad Social (NSS)"
                    tipo= "text"
                    name="nssJugador"
                    leyendaError="11 digitos"
                    expresionRegular={expresiones.nssJugador}
                    estado={nssJ}
                    cambiarEstado={cambiarNssJ}
            />
            <ComponenteInput
                    label= "CURP"
                    tipo= "text"
                    name="curpJugador"
                    leyendaError="Solo se permiten letras y numeros"
                    expresionRegular={expresiones.curpJugador}
                    estado={curpJ}
                    cambiarEstado={cambiarCurpJ}
            />
            <ComponenteInput
                    label= "Boleta"
                    tipo= "text"
                    name="boletaJugador"
                    leyendaError="10 digitos"
                    expresionRegular={expresiones.boletaJugador}
                    estado={boletaJ}
                    cambiarEstado={cambiarBoletaJ}
            />
            <div>
                    <Label htmlFor='semestre'> Semestre </Label>
                    <GrupoInput>
                        <select name="semestreJugador">
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
                <Boton  type = 'submit' > Registrar Jugador </Boton>  
                
            </ContenedorBotonCentrado>
        </FormularioJugador>   
        </main>
        
        </>
     );
}
 
export default RegistrarJugador;