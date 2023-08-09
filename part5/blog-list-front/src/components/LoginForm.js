import { useState } from 'react'
import Input from './Input'

const Login = ({ sendUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleChangeUserName = ({ target }) => {
    setUsername(target.value)
  }

  const handleChangePassword = ({ target }) => {
    setPassword(target.value)
  }

  const login = async (event) => {
    event.preventDefault()
    sendUser({ username, password })
  }

  return (
    <>
      <h1>Loggin into aplication</h1>
      <form onSubmit={login}>
        <Input
          id="username"
          text="username"
          value={username}
          changeHandler={handleChangeUserName}
        />
        <Input
          id="password"
          text="password"
          value={password}
          changeHandler={handleChangePassword}
          type="password"
        />

        <div>
          <button type="submit" id="login-button">
            Login
          </button>
        </div>
      </form>
    </>
  )
}

export default Login
