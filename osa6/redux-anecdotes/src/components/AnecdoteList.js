import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
  const sorted_anecdotes = [...state.anecdotes]

  if (state.filters === '') {
    sorted_anecdotes.sort((a, b) => {
      return b.votes - a.votes
    })
    return sorted_anecdotes
    } else {
      return sorted_anecdotes.filter(an => an.content.toLowerCase().includes(state.filters.toLowerCase()))
    }
  })

  return (
  <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
        <button onClick={() => {
            dispatch(voteAnecdote(anecdote.id))
            dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
          }}>vote</button>
        </div>
      </div>  
    )}
    </div>
)}

export default AnecdoteList