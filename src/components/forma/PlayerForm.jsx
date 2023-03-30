import React, { useState, useCallback } from 'react';
import Chart from './chart';
import InputField from './InputField';
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

  const handleChange = useCallback((event, index) => {
    setData(prevData => {
      const newData = [...prevData];
      newData[index].A = event.target.value > 100 ? 100 : event.target.value;
      return newData;
    });
  }, []);

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
      <div className='form'>{fields}</div>
      <Chart data={data} />
    </div>
  );
}

export default PlayerForm;
