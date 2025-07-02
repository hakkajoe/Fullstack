import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updated = action.payload
      const idx = state.findIndex((b) => b.id === updated.id)
      if (idx !== -1) {
        state[idx] = updated
      }
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload)
    },
  },
})

export const { setBlogs, addBlog, updateBlog, removeBlog } = blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch(addBlog(newBlog))
    return newBlog
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user,
    }
    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    dispatch(updateBlog(returnedBlog))
    return returnedBlog
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
    return id
  }
}

export default blogsSlice.reducer
