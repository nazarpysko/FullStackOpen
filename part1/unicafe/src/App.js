import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return <p>{text} {value}</p>
}

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good + neutral + bad} />
      <StatisticLine text="average" value={(good + bad * -1) / (good + neutral + bad) || 0} />
      <StatisticLine text="positive" value={good / (good + neutral + bad) * 100 || 0} />
    </div>
  )   
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}> good </button>
      <button onClick={() => setNeutral(neutral + 1)}> neutral </button>
      <button onClick={() => setBad(bad + 1)}> bad </button>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App