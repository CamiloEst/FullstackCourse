import { useEffect, useState, useRef } from 'react'

import blogsServices from '../services/blogs'

import BlogList from './BlogsList'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

import PropTypes from 'prop-types'

const MainPage = ({ name, handleLogout, messageHandlers }) => {
  const [setSuccesMessage, setErrorMessage] = messageHandlers

  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

  useEffect(() => {
    const getBlogs = async () => {
      setBlogs(await blogsServices.getAll())
    }
    getBlogs()
  }, [])

  const addBlog = async (newBlogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogsServices.postBlog({ ...newBlogObject })
      setBlogs(blogs.concat(newBlog))
      setSuccesMessage(`The blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => setSuccesMessage(null), 5000)
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage('Title and url must be provided')
        setTimeout(() => setErrorMessage(null), 5000)
      } else {
        setErrorMessage(error.response.data.error)
        setTimeout(() => setErrorMessage(null), 5000)
      }
    }
  }

  const putBlog = async (blogId) => {
    try {
      const blog = blogs.find((b) => b.id === blogId)
      const changedBlog = { ...blog, likes: blog.likes + 1 }
      const modifiedBlog = await blogsServices.putBlog(blogId, changedBlog)
      setBlogs(blogs.map((b) => (b.id === blogId ? modifiedBlog : b)))
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBlog = async (blogId) => {
    const blog = blogs.find((b) => b.id === blogId)
    try {
      await blogsServices.deleteBlog(blogId)
      setBlogs(blogs.filter((b) => b.id !== blogId))
      setSuccesMessage(
        `The blog ${blog.title} by ${blog.author} has been removed`
      )
      setTimeout(() => setSuccesMessage(null), 5000)
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage(`You can not delete the blog ${blog.title} by ${blog.author} becouse was added by another user`)
        setTimeout(() => setErrorMessage(null), 5000)
      } else {
        setErrorMessage(error)
        setTimeout(() => setErrorMessage(null), 5000)
      }
    }
  }

  return (
    <>
      <h1>Blogs</h1>
      <p>
        {name} logged in <button onClick={handleLogout}>Logout</button>
      </p>
      <Togglable ref={blogFormRef} buttonLabel="Add blog">
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <BlogList blogs={blogs} putBlog={putBlog} deleteBlog={deleteBlog} />
    </>
  )
}

MainPage.propTypes = {
  name: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  messageHandlers: PropTypes.array.isRequired
}

export default MainPage
