import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, putBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const handleVisibleContent = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const increaseLikes = (blogId) => {
    putBlog(blogId)
  }

  const removeBlog = (blogId) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blogId)
    }
  }

  let  blogCreatedByUser = false
  try {
    blogCreatedByUser =  blog.user.id === JSON.parse(localStorage.getItem('loggedBlogUser')).id
  } catch (error) {
    blogCreatedByUser = false
  }

  return (
    <div style={blogStyle} className='blog'>
      <div className='basicInfo'>
        {blog.title} by {blog.author}{' '}
        <button onClick={handleVisibleContent}>
          {!visible ? 'show' : 'hide'}
        </button>
      </div>
      <div style={showWhenVisible} className='hiddenInfo'>
        <a  href={blog.url} rel="noreferrer" target="_blank">
          {blog.url}
        </a>
        <div>
          Likes: {blog.likes}{' '}
          <button onClick={() => increaseLikes(blog.id)}>Like</button>
        </div>
        <div>Created by: {blog.user.username}</div>
        {blogCreatedByUser && (
          <button className='remove' onClick={() => removeBlog(blog.id)}>Remove</button>
        )}
      </div>
    </div>
  )
}


Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  putBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
