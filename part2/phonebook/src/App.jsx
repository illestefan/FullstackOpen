import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  // get persons from the server
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => { setPersons(initialPersons) })
  }, [])
  
  // event handler for the form submit event (add button)
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
    }
    // post the newPerson to the server
    personService
      .create(newPerson)
      .then(returnedPerson => { 
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }
  
  // event handlers for the input fields
  // set the newName state to the value of the inputPersonName field
  const handleNameChange = (event) => { setNewName(event.target.value) }
  // set the newNumber state to the value of the inputPersonNumber field
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }
  // set the newFilter state to the value of the inputFilter field
  const handleFilterChange = (event) => { setNewFilter(event.target.value) }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />
      
      <h3>Add a new</h3>

      <PersonForm 
        addPerson={addPerson}                     // event handler for the forms submit event (add button)
        newName={newName}                         // newName state
        handleNameChange={handleNameChange}       // event handler for changes in the person name input field
        newNumber={newNumber}                     // newNumber state
        handleNumberChange={handleNumberChange}   // event handler for changes in the person number input field
      />
      
      <h3>Numbers</h3>

      <Persons persons={persons} filter={newFilter} />
    </div>
  )
}

export default App
