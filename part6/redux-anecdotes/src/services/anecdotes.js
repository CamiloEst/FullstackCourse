import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}


const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const update = async (id, newContent) => {
  const response = await axios.put(`${baseUrl}/${id}`, newContent)
  return response.data
}

const  anecdoteServices = { getAll, createNew, update, get }
export default anecdoteServices