import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('if a new blog is saved, return the right content', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const inputTitle = screen.getByPlaceholderText('Blog title')
    const inputAuthor = screen.getByPlaceholderText('Blog author')
    const inputUrl = screen.getByPlaceholderText('Blog url')

    const sendButton = screen.getByText('Save')

    await user.type(inputTitle, 'React patterns')
    await user.type(inputAuthor, 'Michael Chan')
    await user.type(inputUrl, 'https://reactpatterns.com/')

    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)

    expect(createBlog.mock.calls[0][0].title).toBe('React patterns')
    expect(createBlog.mock.calls[0][0].author).toBe('Michael Chan')
    expect(createBlog.mock.calls[0][0].url).toBe('https://reactpatterns.com/')
  })
})
