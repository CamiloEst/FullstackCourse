import Login from './components/LoginForm'
import { useEffect, useState } from 'react'

import MainPage from './components/MainPage'
import SuccesMessage from './components/SuccesMessage'
import ErrorMessage from './components/ErrorMessage'

import loginServices from './services/login'
import usersServices from './services/users'

const App = () => {
  const [user, setUser] = useState(null)
  const [succesMessage, setSuccesMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      usersServices.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const sendUser = async (credentials) => {
    try {
      const user = await loginServices.login({ ...credentials })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      usersServices.setToken(user.token)
      setUser(user)
    } catch (error) {
      switch (error.response.status) {
      case 400:
        setErrorMessage('User name and password must be provided')
        break
      case 401:
        setErrorMessage('Incorrect username or password')
        break
      default:
        setErrorMessage(error.response.data.error)
        break
      }
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  return (
    <>
      <SuccesMessage message={succesMessage} />
      <ErrorMessage message={errorMessage} />
      {user === null ? (
        <Login sendUser={sendUser} messageHandlers={[setErrorMessage]} />
      ) : (
        <MainPage
          name={user.name}
          handleLogout={handleLogout}
          messageHandlers={[setSuccesMessage, setErrorMessage]}
        />
      )}
    </>
  )
}

export default App
