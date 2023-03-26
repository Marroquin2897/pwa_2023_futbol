import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import { FormularioEscuela } from '../elementos/FormularioEscuela';
import {useAuth} from './../contextos/AuthContext';
import { Label, GrupoInput, ContenedorBotonCentrado, Boton, MensajeExito } from '../elementos/ElementosFormulario';
import ComponenteInput from './Input';
import firebaseApp from "../firebase/firebaseConfig";
import {getFirestore, addDoc, collection} from "firebase/firestore"
import {Link, useNavigate} from 'react-router-dom';


const RegistrarEscuela = () => {

    const firestore = getFirestore(firebaseApp);
    const navigate = useNavigate();
    const{usuario} = useAuth();
    const [nameE,cambiarNombreE] = useState({campo: '',valido: null});
    const [nameA,cambiarNombreA] = useState({campo: '',valido: null});
    const [formularioValido, cambiarFormularioValido] = useState(null);

    const expresiones = {
		nombreE: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        nombreA: /^[a-zA-ZÀ-ÿ\s]{1,40}$/
        
	}

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nombreEntrenador = e.target.nombreEntrenador.value;
        const nombreAsistente = e.target.nombreAsistente.value;
        const escuela = e.target.escuela.value;
        const modalidades = e.target.modalidades.value;
        const categoria = e.target.categoria.value;

        if(nameE.valido === 'true' && nameA.valido === 'true') {
            cambiarFormularioValido(true);
        } else {
            cambiarFormularioValido(false);
        }

        try {
            await addDoc (collection(firestore,'escuelas'),{
                nombreEntrenador: nombreEntrenador,
                nombreAsistente: nombreAsistente,
                escuela: escuela,
                modalidades: modalidades,
                categoria: categoria,
                uidUsuario: usuario.uid
            })

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
        <h1> REGISTRAR ESCUELA </h1>
        <main>
            <FormularioEscuela onSubmit={handleSubmit}>
                <ComponenteInput
                    label= "Entrenador (a) en Jefe (a) "
                    tipo= "text"
                    name="nombreEntrenador"
                    leyendaError="Solo se permiten letras"
                    expresionRegular={expresiones.nombreE}
                    estado={nameE}
                    cambiarEstado={cambiarNombreE}
                    />
                <ComponenteInput
                    label= "Entrenador Asistente"
                    tipo= "text"
                    name="nombreAsistente"
                    leyendaError="Solo se permiten letras"
                    expresionRegular={expresiones.nombreA}
                    estado={nameA}
                    cambiarEstado={cambiarNombreA}
                />
                <div>
                    <Label htmlFor='escuela'> Escuela </Label>
                    <GrupoInput>
                        <select name="escuela">
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
                    <Label htmlFor='modalidades'> Modalidades </Label>
                    <GrupoInput>
                        <select name="modalidades">
                            
                            <option value="Futbol 7"> Fútbol 7 </option>
                            <option value="Futbol Rapido"> Fútbol Rápido </option>
                            <option value="Futbol Asociacion"> Fútbol Asociación </option>
                            <option value="tresmodalidades"> Fútbol 7/Fútbol Rápido Fútbol/Asociación</option>
                        </select> 
                    </GrupoInput>   
                </div>
                <div>
                    <Label htmlFor='categoria'> Categoria </Label>
                    <GrupoInput>
                        <select name="categoria">
                            
                            <option value="femenil"> Femenil </option>
                            <option value="varonil"> Varonil </option>
                        </select> 
                    </GrupoInput>   
                </div>
                <ContenedorBotonCentrado>
                <Boton  type = 'submit' > Registrar </Boton>  
                {formularioValido === true && <MensajeExito>Registrado exitosamente</MensajeExito>}
            </ContenedorBotonCentrado>
            </FormularioEscuela>
        </main>
        </>
     );
}
 
export default RegistrarEscuela;