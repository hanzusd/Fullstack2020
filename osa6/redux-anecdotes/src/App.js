import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, voting } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  const new_anecdote = ''

  const vote = (id) => {
    dispatch(voting(id))
  }

  const  create = (event) => {
    event.preventDefault()
    const new_anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(new_anecdote))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="anecdote" /></div>
        <button onClick={() => create(new_anecdote)}>create</button>
      </form>
    </div>
  )
}

export default App