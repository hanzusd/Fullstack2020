import { useDispatch } from "react-redux"
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const new_anecdote = ''

    const  create = (event) => {
        event.preventDefault()
        const new_anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(new_anecdote))
      }

    return (
    <div>
    <h2>create new</h2>
          <form onSubmit={create}>
            <div><input name="anecdote" /></div>
            <button onClick={() => create(new_anecdote)}>create</button>
          </form>
    </div>
    )
}

export default AnecdoteForm