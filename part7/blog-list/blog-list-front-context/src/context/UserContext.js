import { useReducer, createContext, useContext } from 'react'
import usersServices from '../services/users'

const userReducer = (state, action) => {
  switch (action.type) {
  case 'LOGIN':
    window.localStorage.setItem('loggedBlogUser', JSON.stringify(action.payload))
    usersServices.setToken(action.payload.token)
    return action.payload
  case 'LOGOUT':
    window.localStorage.removeItem('loggedBlogUser')
    return null
  case 'OPENSESSION':
    usersServices.setToken(action.payload.token)
    return action.payload
  default:
    return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const notifiactionAndDispatch = useContext(UserContext)
  return notifiactionAndDispatch[0]
}

export const useUserDispatch = () => {
  const notifiactionAndDispatch = useContext(UserContext)
  return notifiactionAndDispatch[1]
}


export default UserContext