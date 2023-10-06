// this is the component for the form to add a new person to the phonebook
// it takes the following props:
// - addPerson: the function (event handler) to add a new person to the phonebook
// - newName: the state with the name of the new person
// - handleNameChange: the function (event handler) to handle changes in the name input field
// - newNumber: the state with the number of the new person
// - handleNumberChange: the function (event handler) to handle changes in the number input field
const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
        <form onSubmit={addPerson}>
        <div>
            name: <input
                    id="inputPersonName"
                    value={newName} 
                    onChange={handleNameChange} 
                />
        </div>
        <div>
            number: <input
                    id="inputPersonNumber"
                    value={newNumber}
                    onChange={handleNumberChange} 
            />
        </div>
        <div><button type="submit">add</button></div>
        </form>
    )
}

export default PersonForm
