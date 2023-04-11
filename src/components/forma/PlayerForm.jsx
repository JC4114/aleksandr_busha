import React, { useState, useCallback, useMemo } from 'react';
import Chart from './Chart';
import InputField from './InputField';
import { equalTo, get, orderByChild, push, query, ref, update } from 'firebase/database';
import database from '../../firebase';
import './PlayerForm.css';
import PlayerList from '../PlayerList/PlayerList';
import { useEffect } from 'react';

function PlayerForm() {
  const subjects = useMemo(
    () => [
      'Passing',
      'Speed',
      'Endurance',
      'Shooting Accuracy',
      'Dribbling Skills',
      'Physical Strength',
      'Heading Ability',
      'Defence',
      'Reaction Time',
      'Teamwork',
    ],
    []
  );

  const [data, setData] = useState(subjects.map((subject) => ({ subject, A: '' })));
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null); // добавляем стейт для фото
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (selectedPlayer) {
      setSelectedPlayer(selectedPlayer);
      setPlayerName(selectedPlayer.name);
      setData(selectedPlayer.scores);
      setPhotoPreview(selectedPlayer.photo);
      setEditing(true);
    }
  }, [selectedPlayer]);

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
    setPlayerName(player.name);
    setData(player.scores);
    setPhotoPreview(player.photo); // устанавливаем превью для фото
  };

  const handleChange = useCallback((event, index) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index].A = event.target.value > 100 ? 100 : event.target.value;
      return newData;
    });
  }, []);

  const handlePlayerNameChange = useCallback((event) => {
    setPlayerName(event.target.value);
  }, []);

  
  
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const playersRef = ref(database, 'players');
      const queryRef = query(playersRef, orderByChild('name'), equalTo(playerName));
      get(queryRef).then((snapshot) => {
        if (snapshot.exists()) {
          const playerKey = Object.keys(snapshot.val())[0];
          update(ref(database, `players/${playerKey}`), {
            name: playerName,
            scores: data,
            photo: photoPreview,
          }).then(() => {
            setData(subjects.map((subject) => ({ subject, A: '' })));
            setPlayerName('');
            setPhotoPreview(null);
            setSelectedPlayer(null); // сброс выбранного игрока
          });
        } else {
          push(playersRef, {
            name: playerName,
            scores: data,
            photo: photoPreview,
          }).then(() => {
            setData(subjects.map((subject) => ({ subject, A: '' })));
            setPlayerName('');
            setPhotoPreview(null);
          });
        }
      });
    },
    [playerName, data, subjects, photoPreview]
  );
    
  const handlePhotoChange = useCallback((event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
  }, []);

  const fields = data.map((item, index) => (
    <InputField
      key={index}
      label={item.subject}
      value={item.A}
      onChange={(event) => handleChange(event, index)}
    />
  ));

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <label>
          Player Name:
          <input type='text' value={playerName} onChange={handlePlayerNameChange} />
        </label>
        {fields}
        <label>
          Player Photo:
          <input type='file' onChange={handlePhotoChange} />
        </label>
        {photoPreview && <img src={photoPreview} alt='Player' />} {/* выводим превью фото */}
        <button type='submit'>Submit</button>
      </form>
      <Chart data={data} />
      <PlayerList onSelect={handlePlayerSelect} />
    </div>
  );

}

export default PlayerForm;
