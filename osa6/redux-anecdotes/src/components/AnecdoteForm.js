import { useDispatch } from "react-redux"
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationForCreateAnecdote, notificationHide } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const  create = async (event) => {
      event.preventDefault()
      const new_anecdote = event.target.anecdote.value
      event.target.anecdote.value = ''
      const newAnecdote = await anecdoteService.createNew(new_anecdote)
      dispatch(createAnecdote(newAnecdote))
      
      dispatch(notificationForCreateAnecdote(new_anecdote))
      setTimeout(() => {
        dispatch(notificationHide())
      }, 5000)
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