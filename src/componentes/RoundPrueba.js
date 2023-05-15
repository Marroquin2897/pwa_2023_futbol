import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';
import {firebaseApp} from "../firebase/firebaseConfig";


const firestore = getFirestore(firebaseApp);
const matchesCollection = collection(firestore, 'Matches');

function RoundRobin() {
  const [teams, setTeams] = useState(Array(6).fill(''));
  const [matches, setMatches] = useState([]);

  function generateMatches() {
    const numTeams = teams.length;
    const numRounds = numTeams;
    const numMatchesPerRound = (numTeams+1)/2;
  
    const rounds = [];
    for (let i = 0; i < numRounds; i++) {
      const round = [];
      for (let j = 0; j < numMatchesPerRound; j++) {
        const home = (i + j) % numTeams;
        const away = (numTeams - 1 - j + i) % numTeams;
        round.push(`${teams[home]} vs ${teams[away]}`);
      }
     {/*if (numTeams % 2 === 1) {
        round.push(`${teams[numTeams - 1]} has a bye`);
      } */} 
      rounds.push(round);
    }
    setMatches(rounds);
  
    // Save matches to Firebase
    rounds.forEach((round, index) => {
      round.forEach(async (match) => {
        const docRef = await addDoc(matchesCollection, { round: index + 1, match });
        console.log('Match saved with ID: ', docRef.id);
      });
    });
  }
  

  function handleChange(e, index) {
    const newTeams = [...teams];
    newTeams[index] = e.target.value;
    setTeams(newTeams);
  }

  // Listen for changes in the Matches collection
  onSnapshot(matchesCollection, (snapshot) => {
    const matchesData = snapshot.docs.map((doc) => doc.data());
    console.log('Matches updated: ', matchesData);
  });

  return (
    <div>
      <h1>Round-robin competition system for odd numbers of teams</h1>
      <div>
        {teams.map((team, index) => (
          <input key={index} value={team} onChange={(e) => handleChange(e, index)} placeholder={`Team ${index + 1}`} />
        ))}
      </div>
      <button onClick={generateMatches}>Generate Matches</button>
      <div>
        {matches.map((round, index) => (
          <div key={index}>
            <h3>Round {index + 1}</h3>
            {round.map((match, i) => (
              <p key={i}>{match}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoundRobin;