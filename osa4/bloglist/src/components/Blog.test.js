import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('showing blogs and pushing buttons', () => {
  let blog
  let u
  beforeEach(() => {
    blog = {
      title: 'Test Blog Title',
      author: 'Test Blog Author',
      url: 'Test Blog Url',
      likes: 0,
      show: false,
      user: {
        username: 'Testi',
        password: 'testitesti' }
    }
    u = {
      username: 'Testi',
      password: 'testitesti'
    }
  })

  test('only blog title shown by default', () => {

    render(<Blog blog={blog} user={u} />)

    const element = screen.getByText('Title: Test Blog Title', { exact: false })
    expect(element).toBeDefined()
    const not_element = screen.queryByText('Test Blog Author', { exact: false })
    expect(not_element).toBeNull()
  })

  test('author, url and likes are shown when show button is pressed', async () => {

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
    const element_l = screen.getByText('Likes: 0', { exact: false })
    expect(element_l).toBeDefined()
  })

  test('when like button is clicked twice, like button is clicked twice', async () => {
    blog.show = true
    const mockLikeHandler = jest.fn(() => {})

    render(<Blog blog={blog} user={u} blogs={[blog]} addLike={mockLikeHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})