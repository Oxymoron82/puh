import React from 'react';

const Persons = ({ persons, onDelete }) => (
  <ul>
    {persons.map(person => (
      <li className='person' key={person.id}>
        {person.name}: {person.number}{' '}
        <button onClick={() => onDelete(person.id)}>delete</button>
      </li>
    ))}
  </ul>
);

export default Persons;
