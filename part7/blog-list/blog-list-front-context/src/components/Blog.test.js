import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('<Blog />', () => {
  let container
  let putBlog 

  beforeEach(() => {
    const blog = {
      title: 'Test blog',
      author: 'Test author',
      url: 'test.url.com',
      likes: 5,
      user: { username: 'testuser' },
    }

     putBlog = jest.fn()

    container = render(
      <Blog blog={blog} putBlog={putBlog} deleteBlog={() => {}} />
    ).container
  })

  test('do not show likes and url at start',  () => {
    const basicInfo = container.querySelector('.basicInfo')
    const hiddenInfo = container.querySelector('.hiddenInfo')

    expect(basicInfo).not.toHaveStyle('display: none')
    expect(hiddenInfo).toHaveStyle('display: none')
  })

  test('show likes and url when show button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')

    await user.click(button)

    const hiddenInfo = container.querySelector('.hiddenInfo')

    expect(hiddenInfo).not.toHaveStyle('display: none')

  })

  
  test('if like button is pressed twice, the likehandler is pressed twice', async () => {
    const user = userEvent.setup()

    const showButton = screen.getByText('show')
    await user.click(showButton)

    const likeButton = screen.getByText('Like')

    await user.click(likeButton)
    await user.click(likeButton)
    
    expect(putBlog.mock.calls).toHaveLength(2)
  })
})
