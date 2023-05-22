import styled, {css} from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const colores = {
    borde: "#0075FF",
    error: "#bb2929",
    exito: "#1ed12d"
}

const Formulario = styled.form `
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;

    @media (max-width: 800px){
        grid-template-columns: 1fr;
    }
`;

const Label = styled.label`
    color: negro;
    display: block;
    font-weight: 700;
    padding: 10px;
    min-height: 40px;
    cursor: pointer;

    ${props => props.valido === 'false' && css`
        color: ${colores.error}
    `}
`;
const GrupoInput = styled.div `
    position: relative;
    z-index: 90;
`;

const Input = styled.input`
    width: 30%;
    background: #ffff;
    border-radius: 30px;
    height: 45px;
    line-height: 45px;
    padding: 0 40px 0 10px;
    transition: .3s ease all;
    border: 3px solid transparent;

    &: focus {
        border: 3px solid ${colores.borde};
        outline: none;
        box-shadow: 3px 0px 30px rgba(163,163,163,0.4)
    }

    ${props => props.valido === 'true' && css`
        border: 3px solid transparent
    `}
    ${props => props.valido === 'false' && css`
        border: 3px solid ${colores.error} !important;
    `}
`;


const ContenedorBotonCentrado = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-column: span 2;

    @media (max-width: 800px){
		grid-column: span 1;
	}
`;

const Boton = styled.button`
    border: none;
    outline: none;
    width: 50%;
    padding: 15px 0;
    color: #fff;
    font-size: 16px;
    letter-spacing: 1px;
    background: #560000;
    cursor: pointer;
    transition: 1s ease all;
    
    &: hover {
        box-shadow: 3px 0px 30px rgba(163,163,163,1);
    }
`;




export {Formulario,Label, GrupoInput, Input, ContenedorBotonCentrado,Boton};


