import { useDispatch, useSelector } from "react-redux"
import { voting } from '../reducers/anecdoteReducer'
import { notificationForVoteAnecdote, notificationHide } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    
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
      )
}

export default AnecdoteList