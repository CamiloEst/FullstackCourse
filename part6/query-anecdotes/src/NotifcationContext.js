import {useReducer, createContext, useContext} from 'react'

const notificationReducer = (state, action) => {
  console.log(action);
    switch (action.type) {
        case 'CREATED':
            return `Anecdote "${action.content}" added`
        case 'VOTED':
            return `Anecdote "${action.content}" voted`
        case 'ERROR':
            return action.error
        case 'RESET':
            return null
        default:
            return null
    }
}  

const NotificationContext = createContext()


export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  
    return (
      <NotificationContext.Provider value={[notification, notificationDispatch] }>
        {props.children}
      </NotificationContext.Provider>
    )
  }


  export const useNotificationValue = () => {
    const notifiactionAndDispatch = useContext(NotificationContext)
    return notifiactionAndDispatch[0]
  }

  export const useNotificationDispatch = () => {
    const notifiactionAndDispatch = useContext(NotificationContext)
    return notifiactionAndDispatch[1]
  }

  export default NotificationContext