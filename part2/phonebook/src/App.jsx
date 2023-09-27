import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    // check if name already exists = if newName is in persons
    const nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
  
    // use the setPersons hook to add the new Person to the persons state
    setPersons(persons.concat(newPerson))
    // set the input fields for Name and Number back to empty strings
    setNewName('')
    setNewNumber('')
  }
  
  const handleNameChange = (event) => { setNewName(event.target.value) }
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }
  const handleFilterChange = (event) => { setNewFilter(event.target.value) }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />
      
      <h3>Add a new</h3>

      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />
      
      <h3>Numbers</h3>

      <Persons persons={persons} filter={newFilter} />
    </div>
  )
}

export default App
