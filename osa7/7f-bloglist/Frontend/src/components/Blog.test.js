import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog Component', () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://example.com',
      likes: 42,
      user: {
        name: 'Test User',
        username: 'testuser',
      },
    }
  
    const user = {
      username: 'testuser',
    }
  
    let component
    let mockUpdateBlog
  
    beforeEach(() => {
      mockUpdateBlog = jest.fn()
      component = render(
        <Blog blog={blog} user={user} updateBlog={mockUpdateBlog} removeBlog={() => {}} />
      )
    })
  
    test('renders title and "view" button by default', () => {
      const blogTitle = component.container.querySelector('.blog-title')
      const blogInfo = component.container.querySelector('.blog-info')
      const url = component.container.querySelector('.blog-url')
      const likes = component.container.querySelector('.blog-likes')
  
      expect(blogTitle).toBeDefined()
      expect(blogInfo).toBeDefined()
      expect(url).toBeNull()
      expect(likes).toBeNull()
    })
  
    test('clicking "view" button reveals URL and likes', () => {
      const viewButton = component.getByText('view')
      fireEvent.click(viewButton)
  
      const url = component.container.querySelector('.blog-url')
      const likes = component.container.querySelector('.blog-likes')
  
      expect(url).toBeDefined()
      expect(likes).toBeDefined()
    })

    test('clicking "like" button calls the updateBlog function twice', () => {
        const likeButton = component.getByText('like');
    
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)
    
        expect(mockUpdateBlog).toHaveBeenCalledTimes(2)
    })
})