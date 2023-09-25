import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const DisplayAnecdoteVotes = ({ votes }) => {
  return (
    <p>has {votes} votes</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  // store the votes of each anecdote in the 'votes' array
  // create the array with the same length as the anecdotes array and fill it with zeros
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleNextClick = () => {
    // take the length of the anecdotes array
    const anecdotesLength = anecdotes.length
    // and create a random index between 0 and the length of the anecdotes array
    const randomIndex = Math.floor(Math.random() * anecdotesLength)
    // set the selected anecdote to this of the random index
    setSelected(randomIndex)
  }

  const handleVoteClick = () => {
    console.log('vote clicked')
    console.log('selected', selected)
    console.log('votes', votes)
    console.log('votes[selected] before ', votes[selected])
    // first create a copy of the votes array
    const votes_copy = [...votes]
    // then increment the value in the copy
    votes_copy[selected] += 1
    // finally update the state with the copy
    setVotes(votes_copy)
    console.log('votes[selected] after ', votes_copy[selected])
  }

  return (
    <div>
      <div>
        {anecdotes[selected]}
        <DisplayAnecdoteVotes votes={votes[selected]} />
      </div>
      <div>
        <Button handleClick={handleVoteClick} text='vote'/>
        <Button handleClick={handleNextClick} text='next anecdote'/>
      </div>
    </div>
  )
}

export default App