import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

// Display the anecdote and the number of votes
const DisplayAnecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
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
  // create the array with the same length as the anecdotes array 
  // so we can follow the number of votes for each anecdote and fill it initally with zeros
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const handleNextClick = () => {
    // take the length of the anecdotes array
    const anecdotesLength = anecdotes.length
    // and create a random index between 0 and the length of the anecdotes array
    // Math.random() returns a number between 0 and 1 sow we have to multiply it 
    // with the length of the anecdotes array to get the random index of an anecdote
    const randomIndex = Math.floor(Math.random() * anecdotesLength)
    // set the selected anecdote to the anecdote of the random index
    setSelected(randomIndex)
  }

  const handleVoteClick = () => {
    console.log('vote clicked')
    console.log('selected', selected)
    console.log('votes', votes)
    console.log('votes[selected] before ', votes[selected])
    // first create a copy of the votes array 
    // (remember it's not allowed to manipulate the state directly!)
    const votes_copy = [...votes]
    // then increment the value in the copy
    votes_copy[selected] += 1
    // finally update the state with the copy
    setVotes(votes_copy)
    console.log('votes[selected] after ', votes_copy[selected])
    // get the index of the anecdote with the most votes using the Math.max() 
    // function on the votes_copy array
    const mostVotedIndex = votes_copy.indexOf(Math.max(...votes_copy))
    console.log('mostVotedIndex', mostVotedIndex)
    // update the state with the index of the anecdote with the most votes
    setMostVoted(mostVotedIndex)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <DisplayAnecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <h1>Anecdote with most votes</h1>
      <DisplayAnecdote anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]} />
      <div>
        <Button handleClick={handleVoteClick} text='vote'/>
        <Button handleClick={handleNextClick} text='next anecdote'/>
      </div>
    </div>
  )
}

export default App