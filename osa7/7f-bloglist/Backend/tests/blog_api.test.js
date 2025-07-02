const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const initialBlogs = [
    {
    title: "titteli1",
    author: "kirjoittaja2",
    url: "jotainjotain1.com",
    likes: 42,
    id: "6511798968cbda5d57471a7e"
    },
    {
    title: "titteli2",
    author: "kirjoittaja2",
    url: "jotainjotain2.com",
    likes: 43,
    id: "65118279f734e496b57266dd"
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('key parameter is called id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0]).toHaveProperty('id')
})

test('an entry can be added', async () => {
    const newBlog = {
        title: "testititteli",
        author: "testikirjoittaja",
        url: "testi.com"
    }
    
    const user = await User.findOne({})
    const userForToken = {
        username: user.username, 
        id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    
    await api
      .post('/api/blogs')
      .set({ 'Authorization': `Bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
    const alllikes = response.body.map(r => r.likes)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('testititteli')
    expect(alllikes).toContain(0)
})

test('an entry needs title', async () => {
    const newBlog = {
        author: "testikirjoittaja",
        url: "testi.com",
        likes: 44
    }
  
    const user = await User.findOne({})
    const userForToken = {
        username: user.username, 
        id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    await api
      .post('/api/blogs')
      .set({ 'Authorization': `Bearer ${token}` })
      .send(newBlog)
      .expect(400)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)

})

test('an entry needs url', async () => {
    const newBlog = {
        title: "testititteli",
        author: "testikirjoittaja",
        likes: 33
    }
  
    const user = await User.findOne({})
    const userForToken = {
        username: user.username, 
        id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    await api
      .post('/api/blogs')
      .set({ 'Authorization': `Bearer ${token}` })
      .send(newBlog)
      .expect(400)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)

})

test('adding a new blog without a valid token returns 401 Unauthorized', async () => {
    const newBlog = {
        title: "testititteli",
        author: "testikirjoittaja",
        url: "testi.com"
    }

    const token = ''

    await api
        .post('/api/blogs')
        .set({ 'Authorization': `Bearer ${token}` })
        .send(newBlog)
        .expect(401)
})

test('succesful deletion of blog with code 204', async () => {
    const blogsAtStart = initialBlogs
    const blogToDelete = blogsAtStart[0]

    const user = await User.findOne({})
    const userForToken = {
        username: user.username, 
        id: user.id
    }

    blogToDelete.user = user.id

    const token = jwt.sign(userForToken, process.env.SECRET)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ 'Authorization': `Bearer ${token}` })
      .set({ 'blogToDelete.user': 'testaaja'})
      .expect(204)
})

test('blog can be edited', async () => {
    const blogsAtStart = initialBlogs
    const blogToEdit = blogsAtStart[0]

    const editedBlog = {
        title: blogToEdit.title,
        author: blogToEdit.author,
        url: blogToEdit.url,
        likes: 50,
    }

    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(editedBlog)

    const response = await api.get('/api/blogs')
    const editedEntry = response.body.find(blog => blog.id === blogToEdit.id)

    expect(editedEntry.likes).toBe(50)
})

afterAll(async () => {
  await mongoose.connection.close()
})