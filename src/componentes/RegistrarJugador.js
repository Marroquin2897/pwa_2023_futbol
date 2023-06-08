import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FormularioJugador, Label, GrupoInput, ContenedorBotonCentrado, Input, Boton } from '../elementos/ElementosFormulario';
import { ContenedorBotonCentral, ContenedorSubtitulo, Subtitulo } from '../elementos/ElementosDeLista';
import { Link } from 'react-router-dom';
import { ReactComponent as IconoRegresar } from './../imagenes/flecha.svg';
import BtnRegresar from '../elementos/BtnRegresar';
import Alerta from '../elementos/Alerta';
import { useAuth } from './../contextos/AuthContext';
import { firebaseApp } from "../firebase/firebaseConfig";
import { useNavigate } from 'react-router-dom';
import agregarJugador from '../firebase/agregarJugador';
import editarJugador from '../firebase/editarJugador';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';


const RegistrarJugador = ({ jugador }) => {

    const navigate = useNavigate();
    const { usuario } = useAuth();
    const firestore = getFirestore(firebaseApp);
    const [nombreJugador, cambiarNombreJ] = useState('');
    const [apellidosJugador, cambiarApellidosJ] = useState('');
    const [fechaNacJugador, cambiarFechaNacJ] = useState('');
    const [nssJugador, cambiarNssJ] = useState('');
    const [curpJugador, cambiarCurpJ] = useState('');
    const [escuelaJugador, cambiarEscuelaJ] = useState('');
    const [boletaJugador, cambiarBoletaJ] = useState('');
    const [semestreJugador, cambiarSemestreJ] = useState('');
    const [sexoJugador, cambiarSexoJ] = useState('');
    const [estadoAlerta, cambiarEdoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});
    const [escuelasProfe, setEscuelasProfe] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);


    useEffect(() => { //Comprobamos si hay algun jugador, si hay obtenemos los valores que tiene ese jugador
        if (jugador) {
            if (jugador.data().uidUsuario === usuario.uid) {
                cambiarNombreJ(jugador.data().nombreJugador);
                cambiarApellidosJ(jugador.data().apellidosJugador);
                cambiarFechaNacJ(jugador.data().fechaNacJugador);
                cambiarNssJ(jugador.data().nssJugador);
                cambiarCurpJ(jugador.data().curpJugador);
                cambiarEscuelaJ(jugador.data().escuelaJugador);
                cambiarBoletaJ(jugador.data().boletaJugador);
                cambiarSemestreJ(jugador.data().semestreJugador);
                cambiarSexoJ(jugador.data().sexoJugador);
                setMostrarFormulario(true)
            } else {
                navigate('/lista-jugadores');
            }
        }
        trarEscuelasProfe();
    }, [jugador, usuario, navigate]);


    const handleChange = (e) => {
        switch (e.target.name) {
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
    const trarEscuelasProfe = async () => {
        const uidProfe = usuario.uid
        const escuelasEncontradas = []
        console.log(uidProfe)
        const consultaSuperior = query(collection(firestore, 'Escuelas Superior'), where('uidUsuario', '==', usuario.uid));
        const consultaMediaSuperior = query(collection(firestore, 'Escuelas Media Superior'), where('uidUsuario', '==', usuario.uid));
        const [resultadoSuperior, resultadoMediaSuperior] = await Promise.all([getDocs(consultaSuperior), getDocs(consultaMediaSuperior)]);
    
        resultadoSuperior.forEach((doc) => {
            escuelasEncontradas.push({ id: doc.id, ...doc.data() });
        });
    
        resultadoMediaSuperior.forEach((doc) => {
            escuelasEncontradas.push({ id: doc.id, ...doc.data() });
        });
        console.log(escuelasEncontradas)
        if(escuelasEncontradas.length > 0){
            setMostrarFormulario(true)
            setEscuelasProfe(escuelasEncontradas)
            console.log(escuelasProfe)
        }else{
            setMostrarFormulario(false)
        }
    }

    function verificaEscuelaSelec(escuelaJugador){
        var categoriaEscProf = ""
        escuelasProfe.map((escuela) =>{
            if(escuela.escuela === escuelaJugador){
                categoriaEscProf = escuela.categoria
            }
        })
        return categoriaEscProf; 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const expresionNombreJ = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
        const expresionApellidoJ = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
        const expresionNssJ = /^\d{10,11}$/;
        const expresionCurpJ = /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GR|GT|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS){1}[B-DF-HJ-NP-TV-Z]{3}\w{1}\d{1}$/;
        const expresionBoletaJ = /^\d{9,10}$/;

        //Validando que en los campos ingrese el tipo de dato correcto y numero exacto de caracteres
        if (!expresionNombreJ.test(nombreJugador)) {
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Ingrese un Nombre Válido'
            });
            return;
        }
        if (!expresionApellidoJ.test(apellidosJugador)) {
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Ingrese Apellido Paterno y Materno'
            });
            return;
        }
        const fechaIngresada = new Date(fechaNacJugador)
        // Obtener el año actual
        const anioActual = new Date().getFullYear();
          
        // Obtener la fecha hace 15 años
        const fechaLimite = new Date(anioActual - 15, 0, 1); // Restar 15 años al año actual

        console.log("esta fecha limita",fechaLimite)
         // Validar que la fecha ingresada no sea mayor al año actual
         if (fechaIngresada.getFullYear() > anioActual ) {
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo:'error',
                mensaje:'La fecha no puede ser mayor al año actual.'
            });
            return;
         }else if(fechaLimite <= fechaIngresada){ // Validar que la persona tenga al menos 15 años en el año actual
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo:'error',
                mensaje:'Debes tener al menos 15 años.'
            });
            return;
         }
        
        const generoEsc = verificaEscuelaSelec(escuelaJugador)
        if(generoEsc === "Varonil" && sexoJugador === "Femenino" || generoEsc === "Femenil" && sexoJugador === "Masculino" ){
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo:'error',
                mensaje:'El género del jugador es diferente al de la escuela seleccionada.'
            });
            return;
        }
        if(sexoJugador === "opcDeter"){
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo:'error',
                mensaje:'No has seleccionado el género'
            });
            return;
        }
        if(escuelaJugador === "opcDeter"){
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo:'error',
                mensaje:'No has seleccionado una escuela.'
            });
            return;
        }
        if(semestreJugador === "opcDeter"){
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo:'error',
                mensaje:'No has seleccionado el semestre.'
            });
            return;
        }
        if (!expresionNssJ.test(nssJugador)) {
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'NSS deben ser 11 dígitos'
            });
            return;
        }
        if (!expresionCurpJ.test(curpJugador)) {
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'CURP: Sólo se permiten letras y numeros '
            });
            return;
        }
        if (!expresionBoletaJ.test(boletaJugador)) {
            cambiarEdoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'El No. de boleta deben ser 10 dígitos'
            });
            return;
        }

        //Comprobamos que los campos tengan un valor 
        if (nombreJugador !== '' && apellidosJugador !== '' && fechaNacJugador !== '' && nssJugador !== '' && curpJugador !== '' && escuelaJugador !== '' && boletaJugador !== ''
            && semestreJugador !== '' && sexoJugador !== '') {
            const consulta = await getDocs(query(collection(firestore, 'jugadores'), where('boletaJugador', '==', boletaJugador)));
            if (jugador && boletaJugador!==jugador.data().boletaJugador && consulta.size>0) {
                cambiarEdoAlerta(true);
                cambiarAlerta({ tipo: 'error', mensaje: 'Ya existe un jugador con esta boleta' });             
            }else if(jugador && boletaJugador===jugador.data().boletaJugador || jugador && boletaJugador!==jugador.data().boletaJugador && consulta.size===0 ) {
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
                }).catch((error) => {
                    console.log(error);
                })
            }else{
                if (consulta.size > 0) {
                    cambiarEdoAlerta(true);
                    cambiarAlerta({ tipo: 'error', mensaje: 'Este jugador ya ha sido registrado' });   
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
                        .then(() => {
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
                            cambiarAlerta({ tipo: 'exito', mensaje: 'Jugador Registrado Exitosamente' });
                        })
                        .catch((error) => {
                            cambiarEdoAlerta(true);
                            cambiarAlerta({ tipo: 'error', mensaje: 'Hubo un problema al intentar agregar al jugador.' });
                        })
                }
            }
        } else {
            cambiarEdoAlerta(true);
            cambiarAlerta({ tipo: 'error', mensaje: 'Completa todos los campos' });
        }

    }
    const nameUsuario = sessionStorage.getItem("name")
    return (
        <div className="hero">
            <nav>
                <img src="https://tinyurl.com/2obtocwe" />
                <center><h2>{jugador ? 'Editar Jugador' : 'Registrar Nuevo Jugador'}</h2>
                    <h3>{nameUsuario}</h3></center>
                <h3><img src="https://tinyurl.com/2kaldmbh" /></h3>

            </nav>
            <Helmet>
                <title>Registrar Jugador</title>
            </Helmet>
            <main>
                { mostrarFormulario 
                ? 
                <FormularioJugador onSubmit={handleSubmit}>
                <div>
                    <Label> Nombre(s) </Label>
                    <GrupoInput>
                        <Input
                            type='text'
                            name='nombre'
                            value={nombreJugador}
                            onChange={handleChange}
                        />
                    </GrupoInput>
                </div>
                <div>
                    <Label> Apellido(s) </Label>
                    <GrupoInput>
                        <Input
                            type='text'
                            name='apellidos'
                            value={apellidosJugador}
                            onChange={handleChange}
                        />
                    </GrupoInput>
                </div>
                <div>
                    <Label> Fecha de Nacimiento </Label>
                    <GrupoInput>
                        <Input
                            type='date'
                            name='fechanac'
                            value={fechaNacJugador}
                            onChange={handleChange}
                        />
                    </GrupoInput>
                </div>
                <div>
                    <Label htmlFor='sexo'> Género </Label>
                    <GrupoInput>
                        <select name="sexo" value = {sexoJugador} onChange={handleChange}  >
                            <option value="opcDeter">Elige el género</option>
                            <option value="Femenino"> Femenino </option>
                            <option value="Masculino"> Masculino </option>
                        </select>
                    </GrupoInput>
                </div>
                <div>
                    <Label> Número de Seguridad Social </Label>
                    <GrupoInput>
                        <Input
                            type='text'
                            name='nss'
                            value={nssJugador}
                            onChange={handleChange}
                        />
                    </GrupoInput>
                </div>
                <div>
                    <Label> CURP </Label>
                    <GrupoInput>
                        <Input
                            type='text'
                            name='curp'
                            value={curpJugador}
                            onChange={handleChange}
                        />
                    </GrupoInput>
                </div>
                <div>
                    <Label htmlFor='escuela'> Escuela </Label>
                    <GrupoInput>
                        <select name="escuela" onChange={handleChange}>
                            <option value="opcDeter" > Elige una escuela </option>
                            {
                                escuelasProfe.map((escuela) => {
                                    if(escuelaJugador===escuela.escuela){
                                        return <option key={escuela.id} selected value={escuela.escuela}>
                                            {escuela.escuela}
                                        </option>
                                    }else{
                                        return <option key={escuela.id} value={escuela.escuela}>
                                            {escuela.escuela}
                                        </option>
                                    }
                                })}
                        </select>
                    </GrupoInput>
                </div>
                <div>
                    <Label> Boleta </Label>
                    <GrupoInput>
                        <Input
                            type='text'
                            name='boleta'
                            minlength="10" 
                            maxlength="10" 
                            value={boletaJugador}
                            onChange={handleChange}
                        />
                    </GrupoInput>
                </div>
                <div>
                    <Label htmlFor='semestre'> Semestre </Label>
                    <GrupoInput>
                        <select name="semestre" value = {semestreJugador} onChange={handleChange}  >
                            <option value="opcDeter">Elige el semestre</option>
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
                    <Boton as="button" type='submit' >  {jugador ? 'Editar Jugador' : 'Agregar Jugador'} </Boton> <br />
                    <BtnRegresar ruta='/menu-profe' />
                </ContenedorBotonCentrado>
                <Alerta
                    tipo={alerta.tipo}
                    mensaje={alerta.mensaje}
                    estadoAlerta={estadoAlerta}
                    cambiarEdoAlerta={cambiarEdoAlerta}
                />
            </FormularioJugador>  
                
                : 
                <ContenedorSubtitulo>
                <Subtitulo> No tienes escuelas registradas</Subtitulo>
                <Boton as={Link} to='/registrar-escuela'>Registrar Escuela</Boton>
                <BtnRegresar ruta = '/menu-profe'/>
            </ContenedorSubtitulo>
                }
            </main>

        </div>
    );
}
export default RegistrarJugador;