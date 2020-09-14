import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Votes = ({current, votes}) => (
  <div>
    has {votes[current]} votes
  </div>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))
  const [mostVotes, setMostVotes] = useState(0)

  const vote = (selected) => {
    const copy = [...votes]
    copy[selected] += 1;
    setVotes(copy)
    if (copy[selected] > copy[mostVotes]) {
      setMostVotes(selected)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}<br></br>
      <Votes current={selected} votes={votes}/>
      <Button handleClick={() => vote(selected) } text="vote" />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * 6))} text="random anecdote" />
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[mostVotes]}<br></br>
      <Votes current={mostVotes} votes={votes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

