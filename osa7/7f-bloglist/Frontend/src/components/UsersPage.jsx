import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const UsersPage = ({ user, handleLogout }) => {
  const navigate = useNavigate()
  const users = useSelector((state) => state.users)

  return (
    <div>
      <div style={{ marginTop: '2em' }}>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </td>
                <td>{u.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => navigate('/')} style={{ marginTop: '1em' }}>
          Back
        </button>
      </div>
    </div>
  )
}

export default UsersPage
