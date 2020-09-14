import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({good, neutral, bad, all}) => {
  if (all === 0) {return (<>No feedback given</>)}
  return (
  <div>
    <table>
      <tbody>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="average" value ={<Average good={good} bad={bad} all={all} />} />
      <StatisticLine text="positive" value ={<Positive good={good} all={all} />} />
      </tbody>
    </table>
  </div>
  )
}

const StatisticLine = ({text, value}) => {
  if (text === 'positive') { return (<tr><td>{text}</td><td>{value}%</td></tr>) }
  return <><tr><td>{text}</td><td>{value}</td></tr></>
}

const Average = (props) => {  
  return (
    ((props.good + (-1 * props.bad))/props.all))
}

const Positive = (props) => { 
  return (props.good/props.all * 100)}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" /><br></br>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={good+neutral+bad} />
    </div>
  ) 
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)