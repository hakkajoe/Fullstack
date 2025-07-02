import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const users = useSelector((state) => state.users)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (users.length > 0) {
      setIsReady(true)
    }
  }, [users])

  if (!isReady) return <div>Loading...</div>

  const user = users.find((u) => u.id === id)

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs && user.blogs.length > 0 ? (
          user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)
        ) : (
          <li>No blogs added</li>
        )}
      </ul>
      <button
        onClick={() => navigate('/users')}
        style={{ marginBottom: '1em' }}
      >
        Back
      </button>
    </div>
  )
}

export default UserDetails
