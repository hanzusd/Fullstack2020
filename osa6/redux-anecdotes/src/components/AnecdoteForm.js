import { useDispatch } from "react-redux"
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const  create = async (event) => {
      event.preventDefault()
      const new_anecdote = event.target.anecdote.value
      event.target.anecdote.value = ''
      dispatch(createAnecdote(new_anecdote))
      
      dispatch(setNotification(`you added '${new_anecdote}'`, 5))
    }

    return (
    <div>
    <h2>create new</h2>
          <form onSubmit={create}>
            <div><input name="anecdote" /></div>
            <button>create</button>
          </form>
    </div>
    )
}

export default AnecdoteForm