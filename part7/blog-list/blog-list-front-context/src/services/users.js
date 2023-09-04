import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getToken = () => token

export const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

const usersServices = { setToken, getToken }

export default usersServices