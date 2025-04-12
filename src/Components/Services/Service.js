// src/services/service.js
import axios from 'axios';

const baseUrl = 'https://puhelinluettelo-backend-1-79se.onrender.com/api/persons';

const getAllPersons = () => {
  return axios.get(baseUrl);
};

const createPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAllPersons, createPerson, deletePerson };
