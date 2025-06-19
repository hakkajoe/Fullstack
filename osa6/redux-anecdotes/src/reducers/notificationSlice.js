import { createSlice } from '@reduxjs/toolkit'

let timeoutId = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationMessage(_state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { setNotificationMessage, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (text, seconds) => {
  return dispatch => {
    if (timeoutId) clearTimeout(timeoutId)

    dispatch(setNotificationMessage(text))

    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
      timeoutId = null
    }, seconds * 1000)
  }
}