// render the course header (= name of course)
const Header = ({ name }) => {
    console.log('Header:', name)
    return (
        <h3>{name}</h3>
    )
}

// render a part of the course
const Part = ({ name, exercises }) => {
    console.log(name, exercises)
    return (
        <p>{name} {exercises}</p>
    )
}

// render the list of all parts of a course
const Content = ({ parts }) => {
    console.log('Content: ', parts)
    parts.map(part => console.log(part))
    return (
        <div>
            {parts.map(part => 
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </div>
    )
}

// render the total number of exercises per course
const Total = ({ parts }) => {
    console.log('Total: ', parts)
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    console.log('Total (sum): ', total)
    return (
        <p style={{fontWeight : 'bold'}}>total of {total} exercises</p>
    )
}

// render a course with it's parts and the number of exercises per course
const Course = ({ course }) => {
    console.log('Course: ', course)
    const {id, name, parts } = {...course}
    console.log('Name:', name)
    console.log('Parts:', parts)
    return (
      <div>
        <Header name={name} />
        <Content parts={parts} />
        <Total parts={parts} />
      </div>
    )
}

export default Course
