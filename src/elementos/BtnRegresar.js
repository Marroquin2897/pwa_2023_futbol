import React from 'react';
import styled from 'styled-components';
import {ReactComponent as IconoFlecha} from './../imagenes/flecha.svg';
import {useNavigate} from 'react-router-dom';

const Btn = styled.button`
    display: block;
    width: 5.12rem; /* 50px */
    height: 3.12rem; /* 50px */
    line-height: 3.12rem; /* 50px */
    text-align: center;
    margin-right: 1.25rem; /* 20px */
    border: none;
    background: #560000;
    color: #0B0B0B;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5.31rem; /* 5px */
    cursor: pointer;
 
    @media(max-width: 60rem){ /* 950px */
        width: 2.5rem; /* 40px */
        height: 2.5rem; /* 40px */
        line-height: 2.5rem; /* 40px */
    }
`;
 
const Icono = styled(IconoFlecha)`
    width: 50%;
    height: auto;
    fill: #fff;
`;

const BtnRegresar = ({ruta = '/sesion-iniciada'}) => { //Aqui vamos a poner la ruta para que regrese a la interfaz de inicio
	const navigate = useNavigate();

	return (
		<Btn onClick={() => navigate(ruta)}><Icono /></Btn>
	);
}
 
export default BtnRegresar;