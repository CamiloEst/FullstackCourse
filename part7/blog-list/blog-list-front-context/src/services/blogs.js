import axios from 'axios'
import usersServices from './users'

const baseUrl = 'http://localhost:3001/api/blogs'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const postBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: usersServices.getToken() },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export const putBlog = async (modifiedBlog) => {
  const config = {
    headers: { Authorization: usersServices.getToken() },
  }
  const response = await axios.put(
    `${baseUrl}/${modifiedBlog.id}`,
    modifiedBlog,
    config
  )
  return response.data
}

export const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: usersServices.getToken() },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.status
}

export const commentBlog = async (id, content) => {
  const config = {
    headers: { Authorization: usersServices.getToken() },
  }
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    { content },
    config
  )
  return response.data
}

const blogsServices = { getAll, postBlog, putBlog, deleteBlog }

export default blogsServices
