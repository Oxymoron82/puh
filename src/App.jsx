import { useState, useEffect } from 'react';
import service from './Components/Services/Service'; // Import the service
import Notification from './Components/Notification';
import Filter from './Components/Filter';
import PersonForm from './Components/PersonForm';
import Persons from './Components/Persons';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  // Fetch all persons when the component mounts
  useEffect(() => {
    service
      .getAllPersons() // Fetch all persons using the service
      .then(response => {
        setPersons(response.data)
        console.log(response.data)
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    service
      .createPerson(newPerson) // Send POST request to backend using the service
      .then(response => {
        setPersons([...persons, response.data]); // Update state with the new person
        setNewName('');
        setNewNumber('');
        setNotification({ message: `${newPerson.name} added to phonebook`, type: "notification" });
        setTimeout(() => setNotification(null), 3000);
      })
      .catch(error => console.error("Error adding person:", error));
  };

  const deletePerson = (id) => {
    if (window.confirm(`Delete this contact?`)) {
      service
        .deletePerson(id) // Send DELETE request to backend using the service
        .then(() => {
          setPersons(persons.filter(person => person.id !== id)); // Remove person from state
          setNotification('Contact deleted');
          setTimeout(() => setNotification(null), 3000);
        })
        .catch(error => console.error("Error deleting person:", error));
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification?.message} type={notification?.type} />

      <Filter value={filter} onChange={handleFilterChange} />
      <h3 className='text-color'>Add a new</h3>
      <PersonForm 
        onSubmit={addPerson}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onDelete={deletePerson} />
    </div>
  );
};

export default App;
