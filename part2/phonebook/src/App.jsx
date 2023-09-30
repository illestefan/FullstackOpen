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
      // ask if the user wants to update the number
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
      if (result) {
        // find the person to update by it's name
        const personToUpdate = persons.find(person => person.name === newName)
        // create a new person by copying the person to update and replacing the number
        const updatedPerson = { ...personToUpdate, number: newNumber }
        // call the update method of the personService
        personService
          .update(personToUpdate.id, updatedPerson)
          .then(returnedPerson => {
            // set the persons state to a new array where the person to update 
            // is replaced by the returnedPerson, all other persons are unchanged
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }
    // the name does not exist yet, create a new person
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

  const deletePerson = (id) => {
    console.log(`deletePerson(${id})`)
    const personToDelete = persons.find(person => person.id === id)
    const result = window.confirm(`Delete ${personToDelete.name}?`)
    if (result) {
      console.log(`deletePerson(${id}): confirmed`)
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
    else {
      console.log(`deletePerson(${id}): cancelled`)
    }
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

      <Persons 
        persons={persons} 
        filter={newFilter} 
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
