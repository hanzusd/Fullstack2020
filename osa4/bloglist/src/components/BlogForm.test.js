import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('BlogForm calls event handler and receivs right props', async () => {
  const mockCreateBlog = jest.fn()
  const mockSetVisible = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={mockCreateBlog} setAddBlogVisible={mockSetVisible}  />)

  const input_t = screen.getByPlaceholderText('this is title')
  const input_a = screen.getByPlaceholderText('this is author')
  const input_u = screen.getByPlaceholderText('this is url')
  const sendButton = screen.getByText('save')

  await user.type(input_t, 'Test Blog')
  await user.type(input_a, 'Test Author')
  await user.type(input_u, 'Test Url')
  await user.click(sendButton)

  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(mockCreateBlog.mock.calls[0][0].title).toBe('Test Blog')
  expect(mockCreateBlog.mock.calls[0][0].author).toBe('Test Author')
  expect(mockCreateBlog.mock.calls[0][0].url).toBe('Test Url' )
})