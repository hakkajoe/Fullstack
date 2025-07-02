import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsSlice'
import notificationReducer from './reducers/notificationSlice'
import userReducer from './reducers/userSlice'
import usersReducer from './reducers/usersSlice'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer,
  },
})

export default store
