import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newURL
    })

    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <div>
                    title: <input id="title" value={newTitle} name="title" onChange={({ target }) => setNewTitle(target.value)} placeholder='writetitle'/>
        </div>
        <div>
                    author: <input id="author" value={newAuthor} name="author" onChange={({ target }) => setNewAuthor(target.value)} placeholder='writeauthor'/>
        </div>
        <div>
                    url: <input id="url" value={newURL} name="url" onChange={({ target }) => setNewURL(target.value)} placeholder='writeurl'/>
        </div>
        <div>
          <button id="submit" type="submit">create new blog</button>
        </div>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm