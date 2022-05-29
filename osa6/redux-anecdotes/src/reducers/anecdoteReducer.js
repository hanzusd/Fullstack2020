import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const voteForAnecdote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...voteForAnecdote,
        votes: voteForAnecdote.votes + 1
      }
      state = state.map(an =>
        an.id !== id ? an : votedAnecdote)
      state.sort((a, b) => {
        return b.votes-a.votes
      })
      return state
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  } 
})

export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const ans = await anecdoteService.getAll()
    dispatch(setAnecdotes(ans))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const new_an = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(new_an))
  }
}

export default anecdoteSlice.reducer