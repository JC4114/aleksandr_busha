import React, { useState, useEffect } from 'react';
import { get, ref } from 'firebase/database';
import database from '../../firebase';

function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const playersRef = ref(database, 'players');
    get(playersRef).then((snapshot) => {
      const players = [];
      snapshot.forEach((childSnapshot) => {
        const player = childSnapshot.val();
        player.id = childSnapshot.key;
        players.push(player);
      });
      setPlayers(players);
    });
  }, []);

  const filteredPlayers = searchTerm
    ? players.filter((player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div>
      <h1>Player List</h1>
      <form>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          list="players"
        />
        <datalist id="players">
          {filteredPlayers.map((player) => (
            <option key={player.id} value={player.name} />
          ))}
        </datalist>
      </form>
      {filteredPlayers.map((player) => (
        <div key={player.id}>
          <h2>{player.name}</h2>
          <ul>
            {player.scores.map((score) => (
              <li key={score.subject}>
                {score.subject}: {score.A}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default PlayerList;
