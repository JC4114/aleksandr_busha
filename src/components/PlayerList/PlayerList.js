import React, { useState, useEffect } from 'react';
import { get, ref } from 'firebase/database';
import database from '../../firebase';

function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

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

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

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
      {selectedPlayer ? (
        <div>
          <h2>{selectedPlayer.name}</h2>
          <ul>
            {selectedPlayer.scores.map((score) => (
              <li key={score.subject}>
                {score.subject}: {score.A}
              </li>
            ))}
          </ul>
          <button onClick={() => setSelectedPlayer(null)}>Back to list</button>
        </div>
      ) : (
        <div>
          {filteredPlayers.map((player) => (
            <div key={player.id} onClick={() => handlePlayerClick(player)}>
              <h2>{player.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlayerList;
