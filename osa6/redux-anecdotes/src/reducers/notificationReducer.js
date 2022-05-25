import { createSlice } from '@reduxjs/toolkit'

const initialState = 'tämä on viesti'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducer: {
        
    }
})

export default notificationSlice.reducer