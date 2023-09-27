import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <tr><td>{person.name}</td><td>{person.number}</td></tr>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567' 
    }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
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
      number: newNumber
    }
  
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }
  
  const handlePersonChange = (event) => { setNewName(event.target.value) }
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value={newName} 
                  onChange={handlePersonChange} 
                />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange} 
          />
        </div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      
      <table>
        <tbody>
          {persons.map(person => 
            <Person key={person.name} person={person} />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App
