import React from 'react';
import Chart from './chart';
import InputField from './InputField';
import './PlayerForm.css'




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
    
  const data = subjects.map(subject => ({subject, A: '', fullMark: 100}));
  

  const fields = [];

  for (let i = 0; i < data.length; i++) {
    fields.push(<InputField key={i} label={data[i].subject} />);
  }

  return <>
    <div className='form'>{fields}</div>
    <Chart data={data}/>
    </>;
}

export default PlayerForm;
