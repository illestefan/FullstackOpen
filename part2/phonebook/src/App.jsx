import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <tr><td>{person.name}</td><td>{person.number}</td></tr>
  )
}

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
      number: newNumber
    }
  
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }
  
  const handlePersonChange = (event) => { setNewName(event.target.value) }
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }
  const handleFilterChange = (event) => { setNewFilter(event.target.value) }
  const personsToShow = newFilter === ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input 
                            value={newFilter} 
                            onChange={handleFilterChange} 
        />
      </div>

      <h2>add a new</h2>
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
          {personsToShow.map(person => 
            <Person key={person.name} person={person} />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App
