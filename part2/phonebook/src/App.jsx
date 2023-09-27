import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <tr><td>{person.name}</td></tr>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  
  const [newName, setNewName] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName
    }
  
    setPersons(persons.concat(newPerson))
    setNewName('')
  }
  
  const handlePersonChange = (event) => { setNewName(event.target.value) }

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
          <button type="submit">add</button>
        </div>
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
