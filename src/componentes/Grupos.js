import React from 'react';
import { Helmet } from 'react-helmet';
import {useState} from 'react';
import {getFirestore, collection, addDoc,query,where, getDocs, doc,setDoc } from 'firebase/firestore';
import {firebaseApp} from "../firebase/firebaseConfig";
import _ from "lodash";
const Grupos = () => {
    const [numEquipos, setNumEquipos] = useState(0);
    const [numGrupos, setNumGrupos] = useState(0);
    const [teamNames, setTeamNames] = useState([]);

    const handleNumEquiposChange = (event) => {
        const numEquipos = event.target.value;
        setNumEquipos(numEquipos);
        setTeamNames(Array.from({ length: numEquipos }, () => ""));
      };
    
      const handleNumGruposChange = (event) => {
        setNumGrupos(event.target.value);
      };
    
      const handleTeamNameChange = (index, event) => {
        const newTeamNames = [...teamNames];
        newTeamNames[index] = event.target.value;
        setTeamNames(newTeamNames);
      };
      // Genera las combinaciones del algoritmo Round Robin
        const generateRoundRobinMatches = (teamNames) => {
            const teams = teamNames.slice().filter((teamName) => teamName !== "");
            const rounds = teams.length - 1;
            const matches = [];
        
            for (let round = 0; round < rounds; round++) {
            const roundMatches = [];
        
            for (let i = 0; i < teams.length / 2; i++) {
                const home = teams[i];
                const away = teams[teams.length - 1 - i];
        
                if (home !== null && away !== null) {
                roundMatches.push({ local: home, visitante: away });
                }
            }
        
            matches.push(roundMatches);
        
            teams.splice(1, 0, teams.pop());
            }
        
            return _.flatten(matches);
        };
        // Divide los partidos en grupos y jornadas
        const divideMatchesIntoGroupsAndRounds = (matches, numGroups) => {
            const matchesByGroupAndRound = Array.from({ length: numGroups }, () =>
            Array.from({ length: matches.length / numGroups }, () => [])
            );
        
            for (let i = 0; i < matches.length; i++) {
            const groupIndex = i % numGroups;
            const roundIndex = Math.floor(i / numGroups);
            matchesByGroupAndRound[groupIndex][roundIndex].push(matches[i]);
            }
        
            return matchesByGroupAndRound;
        };

      const handleCrearCompetenciaClick = async () => {
        const firestore = getFirestore(firebaseApp);
        
    
        // Genera las combinaciones del algoritmo Round Robin
        const matches = generateRoundRobinMatches(teamNames);
    
        // Divide los partidos en grupos y jornadas
        const matchesByGroupAndRound = divideMatchesIntoGroupsAndRounds(
          matches,
          numGrupos
        );
    
        // Guarda los partidos en la colección "partidos" de Firebase
        for (let i = 0; i < numGrupos; i++) {
          const idGrupo = `grupo${i + 1}`;
    
          for (let j = 0; j < matchesByGroupAndRound[i].length; j++) {
            const idJornada = `jornada${j + 1}`;
            
            setDoc(doc(firestore, "partidos", `${idGrupo}_${idJornada}`), { partidos: matchesByGroupAndRound[i][j] })
            
          }
        }
        console.log("Competencia creada con éxito");
      };
      const teamNameInputs = [];
        for (let i = 0; i < numEquipos; i++) {
            teamNameInputs.push(
            <div key={i}>
                <label htmlFor={`teamName${i}`}>Nombre del equipo #{i + 1}:</label>
                <input
                type="text"
                id={`teamName${i}`}
                value={teamNames[i]}
                onChange={(event) => handleTeamNameChange(i, event)}
                />
            </div>
            );
        }


    return ( 
        <div className="hero">
            <nav>
            <img src="https://tinyurl.com/2b2ek3ck"/>
              <center><h2>Grupos</h2></center> 
              <h3><img src="https://tinyurl.com/233pns5r"/></h3>
            </nav>
            <Helmet>
                <title> Grupos </title>
            </Helmet>
            <div>
                <label htmlFor="numEquipos">Número de equipos:</label>
                <input
                type="number"
                id="numEquipos"
                value={numEquipos}
                onChange={handleNumEquiposChange}
                />
            </div>
            {teamNameInputs}
            <div>
                <label htmlFor="numGrupos">Número de grupos:</label>
                <input
                type="number"
                id="numGrupos"
                value={numGrupos}
                onChange={handleNumGruposChange}
                />
            </div>
            <button onClick={handleCrearCompetenciaClick}>Crear competencia</button>
            
        </div>
     );
}
 
export default Grupos;