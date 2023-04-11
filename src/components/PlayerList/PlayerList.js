import React, { useState, useEffect } from 'react';
import { off, ref, onValue, remove } from 'firebase/database';
import database from '../../firebase';
import Select from 'react-select';
import { css } from '@emotion/css';

function PlayerList({ onSelect }) {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [filteredPlayers, setFilteredPlayers] = useState(null);

  useEffect(() => {
    const playersRef = ref(database, 'players');

    const playersListener = onValue(playersRef, (snapshot) => {
      const players = snapshot.val();
      const newPlayers = [];
      for (let key in players) {
        newPlayers.push({ ...players[key], id: key });
      }
      setPlayers(newPlayers);
    });

    return () => {
      off(playersListener);
    };
  }, []);

  useEffect(() => {
    if (selectedOption) {
      setFilteredPlayers(players.filter((player) => player.id === selectedOption.value));
    } else if (searchTerm) {
      setFilteredPlayers(
        players.filter((player) => player.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    } else {
      setFilteredPlayers(null);
    }
  }, [players, searchTerm, selectedOption]);

  const options = players.map((player) => ({ value: player.id, label: player.name }));

  const handleSearch = (inputValue) => {
    setSearchTerm(inputValue);
  };

  const handleSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (selectedOption) {
      const selectedPlayer = players.find((player) => player.id === selectedOption.value);
      onSelect(selectedPlayer);
    }
  };

  const handleDelete = (playerId) => {
    remove(ref(database, `players/${playerId}`));
  };

  return (
    <div>
      <h1>Player List</h1>
      <Select
        className={css`
          width: 200px;
          margin-bottom: 10px;
        `}
        options={options}
        placeholder="Search players"
        isClearable
        onChange={handleSelect}
        onInputChange={handleSearch}
      />
      {filteredPlayers &&
        filteredPlayers.map((player) => (
          <div key={player.id}>
            <h2>{player.name}</h2>
            <ul>
              {player.scores.map((score) => (
                <li key={score.subject}>
                  {score.subject}: {score.A}
                </li>
              ))}
            </ul>
            <button onClick={() => handleDelete(player.id)}>Delete</button>

          </div>
        ))}
    </div>
  );
}

export default PlayerList;
