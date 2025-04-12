import React from 'react';

const PersonForm = ({ onSubmit, name, onNameChange, number, onNumberChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={name} onChange={onNameChange} style={{ backgroundColor: '#74e48', borderColor: '#74e48' }} />
    </div>
    <div>
      number: <input value={number} onChange={onNumberChange} style={{ backgroundColor: '#74e48' }} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
