import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import usersService from '../services/users'

export const initializeUsers = createAsyncThunk('users/fetchAll', async () => {
  const users = await usersService.getAll()
  return users
})

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initializeUsers.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export default usersSlice.reducer
