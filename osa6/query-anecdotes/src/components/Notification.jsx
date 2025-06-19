import { useContext } from 'react'
import { NotificationContext } from '../NotificationContext'

const Notification = () => {
  const [notification] = useContext(NotificationContext)

  if (!notification) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  // if (true) return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
