const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor, tokenExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blogs)
})

blogsRouter.post(
  '/',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = request.user

    if (!decodedToken) {
      return response.status(401).json({ error: 'token invalid' })
    }

    if (!body.title || !body.url) {
      return response.status(400).json({ error: 'title and url are required' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }
)

blogsRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body

  if (!comment || comment.trim() === '') {
    return response.status(400).json({ error: 'comment cannot be empty' })
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  blog.comments.push(comment.trim())
  await blog.save()

  const populatedBlog = await Blog.findById(request.params.id).populate(
    'user',
    {
      username: 1,
      name: 1,
      id: 1,
    }
  )

  response.status(201).json(populatedBlog)
})

blogsRouter.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = request.user

    if (!decodedToken) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const blogToDelete = await Blog.findById(request.params.id)

    if (!blogToDelete) {
      return response.status(404).json({ error: 'blog not found' })
    }

    if (blogToDelete.user.toString() !== user.id) {
      return response
        .status(403)
        .json({ error: 'you are not authorized to delete this blog' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
)

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate('user', ['name', 'username'])
  response.json(updatedBlog)
})

module.exports = blogsRouter
