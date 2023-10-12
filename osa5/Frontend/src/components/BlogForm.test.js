import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleinput = screen.getByPlaceholderText('writetitle')
  const authorinput = screen.getByPlaceholderText('writeauthor')
  const urlinput = screen.getByPlaceholderText('writeurl')

  const sendButton = screen.getByText('create new blog')

  await user.type(titleinput, 'writetitle')
  await user.type(authorinput, 'writeauthor')
  await user.type(urlinput, 'writeurl')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('writetitle')
  expect(createBlog.mock.calls[0][0].author).toBe('writeauthor')
  expect(createBlog.mock.calls[0][0].url).toBe('writeurl')
})