import React, { useState, useCallback } from 'react';
import Chart from './Chart';
import InputField from './InputField';
import database from '../../firebase';
import './PlayerForm.css';


function PlayerForm() {
  const subjects = [
    'Passing',
    'Speed',
    'Endurance',
    'Shooting Accuracy',
    'Dribbling Skills',
    'Physical Strength',
    'Heading Ability',
    'Defence',
    'Reaction Time',
    'Teamwork'
  ];

  const [data, setData] = useState(
    subjects.map(subject => ({ subject, A: '' }))
  );

  const [playerName, setPlayerName] = useState('');

  const handleChange = useCallback((event, index) => {
    setData(prevData => {
      const newData = [...prevData];
      newData[index].A = event.target.value > 100 ? 100 : event.target.value;
      return newData;
    });
  }, []);

  const handlePlayerNameChange = useCallback((event) => {
    setPlayerName(event.target.value);
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    database.ref('players').push({
      name: playerName,
      scores: data
    });
  }, [playerName, data]);

  const fields = data.map((item, index) => (
    <InputField
      key={index}
      label={item.subject}
      value={item.A}
      onChange={event => handleChange(event, index)}
    />
  ));

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <label>
          Player Name:
          <input type="text" value={playerName} onChange={handlePlayerNameChange} />
        </label>
        {fields}
        <button type="submit">Submit</button>
      </form>
      <Chart data={data} />
    </div>
  );
}

export default PlayerForm;
