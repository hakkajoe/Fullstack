import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = ({ user, handleLogout }) => {
  const navStyle = {
    backgroundColor: '#eee',
    padding: '0.5em 1em',
    display: 'flex',
    alignItems: 'center',
    gap: '1.5em',
  }

  const spacer = { flexGrow: 1 }

  return (
    <div style={navStyle}>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Navigation
