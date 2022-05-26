import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
      notificationForVoteAnecdote(state, action) {
        state = 'you voted for "' + action.payload + '"'
        return state
      },
      notificationForCreateAnecdote(state, action) {
        state = 'you added "' + action.payload + '"'
        return state
      },
      notificationHide(state) {
          state = ''
          return state
      }
    }
})

export const { notificationForVoteAnecdote, notificationForCreateAnecdote, notificationHide } = notificationSlice.actions
export default notificationSlice.reducer