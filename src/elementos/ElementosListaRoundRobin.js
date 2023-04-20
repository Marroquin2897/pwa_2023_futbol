import styled from 'styled-components';
import theme from './../theme';

const Lista = styled.ul`
    list-style: none;
    padding: 0 2.5rem; /* 40px */
    height: 100%;
    overflow-y: auto;
 
    li {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr  auto;
    }
 
    @media (max-width: 50rem) { /*80px*/
        li {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
        }
    }
`;
 
const ElementoLista = styled.li`
    padding: 1.25rem 0; /* 20px */
    border-bottom: 2px solid #F2F2F2;
    display: grid;
    gap: 1px; /* 5px */
    justify-content: space-evenly;
 
    & > div {
        width: 100%;
        display: flex;
        align-items: center;
    }
 
    &:hover button,
    &:hover a {
        opacity: 1;
    }
`;
 
const Label = styled.th`
    color: #A9002E;
    display: block;
    font-weight: 700;
    padding: 10px;
    min-height: 40px;
    cursor: pointer;

    
`;
const Nombre = styled.div`
    color: #FFFFFF;
    font-weight: 500;
    font-size: 1.25rem; /* 20px */
    display: flex;
    align-items: center;
    
    svg {
        width: 3.12rem; /* 50px */
        height: auto;
        margin-right: 1.25rem; /* 20px */
        border-radius: 0.62rem; /* 10px */
    }
 
    @media (max-width: 50rem) { /* 80px */
        font-size: 1.12rem;
    }
`;

const ContenedorBotones = styled.div`
    @media (max-width: 50rem) { /* 80px */
        justify-content: end;
    }
`;
 
const BotonAccion = styled.button`
    outline: none;
    background: ${theme.grisClaro};
    border: none;
    width: 2.5rem; /* 40px */
    display: inline-block;
    height: 2.5rem; /* 40px */
    line-height: 2.5rem; /* 40px */
    font-size: 16px;
    cursor: pointer;
    border-radius: 0.31rem; /* 5px */
    margin-left: 0.625rem; /* 10px */
    transition: .3s ease all;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
 
    &:hover {
        background: ${theme.grisClaro2};
    }
 
    svg {
        width: 1.125rem; /* 18px */
    }
 
    @media (max-width: 50rem) { /* 80px */
        opacity: 1;
    }
`;
 

const ContenedorBotonCentral = styled.div`
    display: flex;
    justify-content: center;
    margin: 2.5rem; /* 40px */
`;
 
const BotonCargarMas = styled.button`
    background: #560000;
    border: none;
    border-radius: 7px;
    color: #fff;
    text-align: center;
    font-family: 'Work Sans', sans-serif;
    padding: 1rem 1.87rem; /* 20px 30px */
    font-size: 1.25rem; /* 20px */
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    outline: none;
    transition: .3s ease all;
    &:hover {
        box-shadow: 3px 0px 30px rgba(163,163,163,1);
    }
`;
const ContenedorSubtitulo = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
 
const Subtitulo = styled.h3`
    color: ${theme.grisClaro2};
    font-weight: 400;
    font-size: 40px;
    padding: 2.5rem 0; /* 40px */
`;

export {
    Lista,
    ElementoLista,
    Label,
    Nombre,
    ContenedorBotones,
    BotonAccion,
    BotonCargarMas,
    ContenedorBotonCentral,
    ContenedorSubtitulo,
    Subtitulo
};