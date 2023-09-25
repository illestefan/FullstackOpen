import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // define the state variables for the states 'good' (voted good), 'neutral' (voted neutral) and 'bad' (voted bad)
  // as well as for the states 'total' (total number of votes), 'average' (average vote) and 'positive' (positive votes)
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0.0)
  const [positive, setPositive] = useState(0.0)

  // handle CLick on the 'good' vote button
  const handleGoodClick = () => {
    // increment number of 'good' notes by one
    const updatedGood = good + 1
    // update the state variable 'good' with the new value
    setGood(updatedGood)
    // calculate the new total number of votes from the updated good votes plus the neutral and bad votes
    setTotal(updatedGood + neutral + bad)
    // calculate the new average vote from good minus bad votes divided by the total number of votes
    setAverage((updatedGood - bad) / (updatedGood + neutral + bad))
    // calculate the rate of positive votes from the updated good votes divided by the total number of votes times 100 to get a percentage
    setPositive(updatedGood / (updatedGood + neutral + bad) * 100)
  }

  // handle Click on the 'neutral' vote button
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(good + updatedNeutral + bad)
    setAverage((good - bad) / (good + updatedNeutral + bad))
    setPositive(good / (good + updatedNeutral + bad) * 100)
  }

  // handle Click on the 'bad' vote button
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(good + neutral + updatedBad)
    setAverage((good - updatedBad) / (good + neutral + updatedBad))
    setPositive(good / (good + neutral + updatedBad) * 100)
  }

  return (
    <div>
      <h1>give feedback</h1>
      
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </div>
  )
}

export default App