import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
      showNotification(state, action) {
          return state = action.payload
      },
      hideNotification(state, action) {
          return state = ''
      }
    }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification =  (n, time) => {
  return async dispatch => {
    dispatch(showNotification(n))
    setTimeout(() => {
        dispatch(hideNotification())
    }, time*1000)
  }
} 

export default notificationSlice.reducer