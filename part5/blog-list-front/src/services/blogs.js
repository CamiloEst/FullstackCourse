import axios from 'axios'
import usersServices from './users'

const baseUrl = 'http://localhost:3001/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const postBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: usersServices.getToken() },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const putBlog = async (id, modifiedBlog) => {
  const config = {
    headers: { Authorization: usersServices.getToken() },
  }

  const response = await axios.put(`${baseUrl}/${id}`, modifiedBlog, config)
  return response.data
}

const deleteBlog = async(id) => {
  const config = {
    headers: { Authorization: usersServices.getToken() },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.status
}

const blogsServices = { getAll, postBlog, putBlog, deleteBlog }

export default blogsServices
