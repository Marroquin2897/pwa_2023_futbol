import styled from "styled-components";
import {Link} from 'react-router-dom';

const Boton = styled(Link)`
    background: #560000;
    width: ${(props) => props.conIcono ? '15.62rem' : 'auto'}; /* 250px cuando tenga un icono se hara un poco mas largo*/
    margin-left: 1.25rem; /* 20px */
    border: none;
    border-radius: 0.625rem; /* 10px */
    color: #fff;
    font-family: 'Ubuntu', sans-serif;
    height: 3.75rem; /* 60px */
    padding: 1.25rem 1.87rem; /* 20px 30px */
    font-size: 1.25rem; /* 20px */
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    outline: none;
    
    &:hover{
        box-shadow: 3px 0px 30px rgba(163,163,163,1);
    }
    svg { 
        height: ${(props) => props.iconoGrande ? '100%' : '0.75rem;'};  /* 12px */
        fill: white;
    }
`;
export default Boton;