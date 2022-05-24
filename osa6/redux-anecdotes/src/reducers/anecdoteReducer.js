const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const createAnecdote = (new_anecdote) => {
  return {
    type: 'create',
    data: {
      content: new_anecdote,
      votes: 0, 
      id: getId()
    }
  }
}

export const voting = (id) => {
  return ({
    type: 'vote',
    data: { id }
  })
}

const initialState = anecdotesAtStart.map(asObject)

export const reducer = (state = initialState, action) => {
  state=[...state]
  switch (action.type) {
    case 'vote': {
      const id = action.data.id
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
    } case 'create': {
      return state.concat(action.data)
    }
    default: return state
  }
}

export default  reducer