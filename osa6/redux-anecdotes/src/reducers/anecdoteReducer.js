import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

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
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  } 
})

export const { createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer