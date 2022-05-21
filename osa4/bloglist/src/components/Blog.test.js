import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'



test('only blog title shown by default', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Blog Author',
    url: 'Test Blog Url',
    show: false,
    user: {
      username: 'Testi',
      password: 'testitesti' }
  }
  const user = {
    username: 'Testi',
    password: 'testitesti'
  }

  render(<Blog blog={blog} user={user} />)

  const element = screen.getByText('Title: Test Blog Title', { exact: false })
  expect(element).toBeDefined()
  const not_element = screen.queryByText('Test Blog Author', { exact: false })
  expect(not_element).toBeNull()
})

test('author, url and likes are shown when button is pressed', async () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Blog Author',
    url: 'Test Blog Url',
    show: false,
    user: {
      username: 'Testi',
      password: 'testitesti' }
  }
  const u = {
    username: 'Testi',
    password: 'testitesti'
  }

  const mockToggleHandler = jest.fn(() => {blog.show = !(blog.show)})

  render(<Blog blog={blog} user={u} blogs={[blog]} toggleShow={mockToggleHandler} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(mockToggleHandler.mock.calls).toHaveLength(1)

  const element_a = screen.getByText('Test Blog Author', { exact: false })
  expect(element_a).toBeDefined()
  const element_u = screen.getByText('Test Blog Url', { exact: false })
  expect(element_u).toBeDefined()
})