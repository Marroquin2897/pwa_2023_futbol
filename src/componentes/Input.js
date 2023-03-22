import React from 'react';
import {Input, Label, GrupoInput, LeyendaError, IconoValidacion} from './../elementos/ElementosFormulario'
import { faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';

const ComponenteInput = ({label,tipo,name,leyendaError,expresionRegular,estado,cambiarEstado,funcion}) => {

    const onChange = (e) => {
        cambiarEstado({...estado,campo: e.target.value})
    }

    const validacion = () => {
        if(expresionRegular){
            if(expresionRegular.test(estado.campo)){
                cambiarEstado({...estado,valido: 'true'});
            } else {
                cambiarEstado({...estado,valido: 'false'});
            }
        }
        if(funcion){
            funcion();
        }
    }
    return ( 
        <div>
              <Label htmlFor={name} valido={estado.valido}> {label} </Label>
                <GrupoInput>
                    <Input 
                    id={name}
                    type={tipo}
                    value={estado.campo}
                    onChange={onChange}
                    onKeyUp={validacion}
                    onBlur={validacion}
                    valido={estado.valido}
                     /> 
                    <IconoValidacion 
                        icon = {estado.valido === 'true' ? faCheckCircle : faTimesCircle} 
                        valido={estado.valido}/>
                </GrupoInput> 
                <LeyendaError valido={estado.valido}> {leyendaError} </LeyendaError> 
            </div>
     );
}
 
export default ComponenteInput ;