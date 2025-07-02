import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  type: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message
      state.type = action.payload.type
    },
    clearNotification(state) {
      state.message = null
      state.type = null
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, type, time = 3000) => {
  return (dispatch) => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time)
  }
}

export default notificationSlice.reducer
