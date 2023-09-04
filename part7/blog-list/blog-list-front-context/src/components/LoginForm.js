import { useState } from 'react'
import Input from './Input'

import loginServices from '../services/login'

import { useErrorNotification } from '../context/NotificationContext'
import { useUserDispatch } from '../context/UserContext'
import { ReactComponent as Logo } from '../imgs/blogs-logo.svg'
import styled from 'styled-components'

const Section = styled.section``

const FormSection = styled.form`
  position: fixed;
  width: 30%;
  height: 50%;
  left: 60%;
  top: 25%;
  padding: 2%;
  background-color: #b0b4bf;
  border-radius: 15px;
  box-shadow: 1px 1px 5px 1px rgba(17, 16, 29, 0.8);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;

  & h1{
    font-size: 30px;
  }

`

const LogoSection = styled.section`
  background-color: #11101d;
  position: fixed;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & .logo {
    width: 25%;
    fill: white;
  }

  & h1{
    color: white;
    font-size: 50px;
    font-weight: bolder;
  }

`

const StyledButton = styled.button`
  background-color: #11101d;
  font-size: 17px;
  color: white;
  border-style: solid;
  transition: all 0.3s linear;
  cursor: pointer;
  padding: 0.4rem 1.6rem;
  border-radius: 11px;

  &:hover {
    color: #11101d;
    border-radius: 11px;
    background-color: white;
  }
`
const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const notifyError = useErrorNotification()
  const dispatch = useUserDispatch()

  const handleChangeUserName = ({ target }) => {
    setUsername(target.value)
  }

  const handleChangePassword = ({ target }) => {
    setPassword(target.value)
  }

  const login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginServices.login({ username, password })
      dispatch({ type: 'LOGIN', payload: user })
    } catch (error) {
      switch (error.response.status) {
      case 400:
        notifyError('User name and password must be provided', 5)
        break
      case 401:
        notifyError('Incorrect username or password', 5)
        break
      default:
        notifyError(error.response.data.error, 5)
        break
      }
    }
  }

  return (
    <Section>
      <LogoSection>
        <h1>Blogs App</h1>
        <Logo className="logo" />
      </LogoSection>
      <FormSection onSubmit={login} className="flex justify-center flex-col">
        <h1>Loggin into aplication</h1>
        <Input
          id="username"
          text="Username"
          placeholder="Username"
          value={username}
          changeHandler={handleChangeUserName}
        />
        <Input
          id="password"
          text="Password"
          placeholder="Password..."
          value={password}
          changeHandler={handleChangePassword}
          type="password"
        />
        <StyledButton id="login-button">Login</StyledButton>
      </FormSection>
    </Section>
  )
}

export default Login
