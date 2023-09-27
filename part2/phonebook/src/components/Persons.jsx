// render a Person as a table row
const Person = ({ person }) => {
    return (
      <tr><td>{person.name}</td><td>{person.number}</td></tr>
    )
}

// render a list of Persons as a table
const Persons = ({ persons, filter }) => {
    // define the filter function for persons to show
    // if the filter is empty, show all persons
    // if the filter is not empty, show only persons whose name contains the filter string
    // all strings are converted to lowercase to make the search case-insensitive
    const personsToShow = filter === ''
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    
    // render the table of persons to show (each Person is rendered as one table row)
    return (
        <table>
        <tbody>
            {personsToShow.map(person => 
                <Person key={person.id} person={person} />
            )}
        </tbody>
        </table>
    )
}

export default Persons
