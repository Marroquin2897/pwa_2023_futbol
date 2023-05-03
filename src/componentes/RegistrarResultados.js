import React,{useState} from 'react';
import { Helmet } from 'react-helmet';
import {firebaseApp} from "../firebase/firebaseConfig";
import {getFirestore, collection, addDoc,query,where, getDocs, doc,setDoc } from 'firebase/firestore';
import {Formulario, Label, GrupoInput, ContenedorBotonCentrado, Boton, Input } from '../elementos/ElementosFormularioJuegos';

const RegistrarResultados = () => {
    const [jornada, setJornada] = useState(0);
    const [enfrentamientos, setEnfrentamientos] = useState([]);

    const handleJornadaChange = (event) => {
        setJornada(parseInt(event.target.value));
      };
    
    const handleBuscarJornadaClick = async () => {
        const firestore = getFirestore(firebaseApp);
        const partidosRef = collection(firestore, "partidos");
        const jornadaQuery = query(partidosRef, where("jornada", "==", jornada));
        const jornadaSnapshot = await getDocs(jornadaQuery);
        
        const nuevosEnfrentamientos = jornadaSnapshot.docs.map((doc) => doc.data());
        setEnfrentamientos(nuevosEnfrentamientos);
      };


    return (  
        <div className="hero">
            <nav>
            <img src="https://tinyurl.com/2b2ek3ck"/>
              <center><h2> Registro de Resultados </h2></center> 
              <h3><img src="https://tinyurl.com/233pns5r"/></h3>
            </nav>
            <Helmet>
                <title> Registro de Resultados FR </title>
            </Helmet>
            <main>
                <div>
                <Label> Número de Jornada </Label>
                  <GrupoInput>
                    <Input
                      type='text'
                      id="jornadaInput"
                      value = {jornada}
                      onChange = {handleJornadaChange}
                    />
                  </GrupoInput>
                </div>
                <div>
                    <ContenedorBotonCentrado>
                    <Boton  type = 'submit' onClick={handleBuscarJornadaClick} > Buscar </Boton>  
                    </ContenedorBotonCentrado>
                    
                    {enfrentamientos.map((enfrentamiento,index)=> (
                        <div key={index}>
                            <Label>
                                Local: {enfrentamiento.local} 
                                <Input type="text" value={enfrentamiento.golesLocal}/>
                                VS
                                <Input type="text" value={enfrentamiento.golesVisitante}/>
                                Visitante: {enfrentamiento.visitante}
                            </Label> 
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
 
export default RegistrarResultados;