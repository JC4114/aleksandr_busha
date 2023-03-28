import React from 'react';
import InputField from './InputField';
import './PlayerForm.css'

function PlayerForm() {
  const labels = ['Passing', 'Speed', 'Endurance', 'Shooting Accuracy', 'Dribbling Skills', 'Physical Strength', 'Heading Ability', 'Defence', 'Reaction Time', 'Teamwork'];
  const fields = [];

  for (let i = 0; i < labels.length; i++) {
    fields.push(<InputField key={i} label={labels[i]} type="number" max={100} onChange/>);
  }

  return <div className='form'>{fields}</div>;
}

export default PlayerForm;
