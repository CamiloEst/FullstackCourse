import { useEffect } from 'react'

import Notification from './components/Notification'
import Login from './components/LoginForm'
import MainPage from './components/MainPage'
import { useUserDispatch, useUserValue } from './context/UserContext'
import { Route, Routes } from 'react-router-dom'

import styled from 'styled-components'

const StyledDiv = styled.div`
  height: 100vh;
  width: 100%;
`

const App = () => {
  const dispatch = useUserDispatch()
  const user = useUserValue()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch({ type: 'OPENSESSION', payload: user })
    }
  }, [])

  return (
    <StyledDiv>
      <Routes>
        <Route path="*" Component={user === null ? Login : MainPage} />
      </Routes>
      <Notification />
    </StyledDiv>
  )
}

export default App
