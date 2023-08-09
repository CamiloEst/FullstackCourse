
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getToken = () => token

const usersServices = { setToken, getToken }

export default usersServices