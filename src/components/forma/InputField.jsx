import React from 'react';
import { Form } from 'react-bootstrap';
import './PlayerForm.css'

function InputField({ label, value,onChange }) {
  
  

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control type='number' max={100} value={value} onChange={onChange} />
    </Form.Group>
  );
}

export default InputField;
