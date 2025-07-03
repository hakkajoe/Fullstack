import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import { showNotification } from './reducers/notificationSlice'
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from './reducers/blogsSlice'
import { setUser, clearUser } from './reducers/userSlice'
import { initializeUsers } from './reducers/usersSlice'
import Navigation from './components/Navigation'
import BlogDetails from './components/BlogDetails'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import UsersPage from './components/UsersPage'
import UserDetails from './components/UserDetails'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.message === null) {
    return null
  }

  const className = notification.type === 'success' ? 'success' : 'error'

  return <div className={className}>{notification.message}</div>
}

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.users)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (user !== null) {
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      await dispatch(createBlog(blogObject))
      await dispatch(initializeUsers())
      dispatch(
        showNotification(`a new blog ${blogObject.title} added`, 'success')
      )
    } catch {
      dispatch(showNotification('error creating blog', 'error'))
    }
  }

  const handleLike = async (blog) => {
    try {
      await dispatch(likeBlog(blog))
    } catch (error) {
      dispatch(showNotification('error liking blog', 'error'))
    }
  }

  const handleRemove = async (blog) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (!ok) return

    try {
      await dispatch(deleteBlog(blog.id))
      await dispatch(initializeUsers())
      dispatch(showNotification(`deleted '${blog.title}'`, 'success'))
    } catch (error) {
      dispatch(showNotification('error deleting blog', 'error'))
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(showNotification('wrong username or password', 'error'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedAppUser')
    dispatch(clearUser())
    blogService.setToken(null)
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog" id="new_blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  if (user === null) {
    return (
      <Container className="mt-5">
        <h2 className="mb-4">Log in to application</h2>
        <Notification />
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Group>
          <Button id="login" type="submit" variant="primary">
            Login
          </Button>
        </Form>
      </Container>
    )
  }

  return (
    <Router>
      <Navigation user={user} handleLogout={handleLogout} />
      <Container className="mt-4">
        <h2 className="mb-4">blog app</h2>
        <Notification />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {blogForm()}
                <div className="mt-4">
                  {blogs
                    .slice()
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                      <div key={blog.id} style={blogStyle}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>{' '}
                        {blog.author}
                      </div>
                    ))}
                </div>
              </div>
            }
          />
          <Route
            path="/users"
            element={<UsersPage user={user} handleLogout={handleLogout} />}
          />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
      </Container>
    </Router>
  )
}

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  borderRadius: 4,
  marginBottom: 8,
  padding: 8,
}

export default App
