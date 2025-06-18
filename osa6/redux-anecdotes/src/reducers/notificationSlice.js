import { createSlice } from '@reduxjs/toolkit'

let timeoutId = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(_state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (text, seconds = 5) => dispatch => {
  if (timeoutId) clearTimeout(timeoutId)

  dispatch(setNotification(text))
  timeoutId = setTimeout(() => {
    dispatch(clearNotification())
    timeoutId = null
  }, seconds * 1000)
}

export default notificationSlice.reducer
