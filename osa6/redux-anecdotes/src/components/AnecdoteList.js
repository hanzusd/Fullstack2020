import { useDispatch, useSelector } from "react-redux"
import { voting } from '../reducers/anecdoteReducer'
import { notificationForVoteAnecdote, notificationHide } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filters === '') {
      return state.anecdotes
    } else {
      return state.anecdotes.filter(an => an.content.toLowerCase().includes(state.filters.toLowerCase()))
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
            dispatch(voting(anecdote.id))
            dispatch(notificationForVoteAnecdote(anecdote.content))
            setTimeout(() => {
              dispatch(notificationHide())
            }, 5000)
          }}>vote</button>
        </div>
      </div>  
    )}
    </div>
)}

export default AnecdoteList