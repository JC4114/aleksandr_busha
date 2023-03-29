import React from 'react';
import { Form } from 'react-bootstrap';
import './PlayerForm.css'

function InputField({ label, value }) {
  const handleChange = (e) => {
    const value = e.target.value;
    // здесь можно сделать что-то с полученным значением
    console.log(value);
  }

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control type='Number' max='100' value={value} onChange={handleChange} />
    </Form.Group>
  );
}

export default InputField;
