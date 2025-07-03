import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, addCommentToBlog } from '../reducers/blogsSlice'

const BlogDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const [isReady, setIsReady] = useState(false)
  const [comment, setComment] = useState('')

  useEffect(() => {
    if (blogs.length > 0) {
      setIsReady(true)
    }
  }, [blogs])

  if (!isReady) return <div>Loading...</div>

  const blog = blogs.find((b) => b.id === id)

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    dispatch(addCommentToBlog(blog.id, comment.trim()))
    setComment('')
  }

  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <div>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
      </div>
      <div>
        {blog.likes} likes{' '}
        <button onClick={handleLike} id="like">
          like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      <h3>comments</h3>
      <form onSubmit={handleAddComment} style={{ marginBottom: '1em' }}>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment"
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments && blog.comments.length > 0 ? (
          blog.comments.map((c, i) => <li key={i}>{c}</li>)
        ) : (
          <div>No comments yet</div>
        )}
      </ul>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1em' }}>
        Back
      </button>
    </div>
  )
}

export default BlogDetails
