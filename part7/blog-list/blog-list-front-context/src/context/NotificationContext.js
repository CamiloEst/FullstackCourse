import { useReducer, createContext, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.payload
  case 'RESET':
    return null
  default:
    return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
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

export const useSuccesNotification = () => {
  const dispatch = useNotificationDispatch()
  return (payload, seconds) => { dispatch({ type: 'SET', payload: { payload, type:'succes' } })
    setTimeout(() => {
      dispatch({ type: 'RESET' })
    }, seconds * 1000)
  }
}

export const useErrorNotification = () => {
  const dispatch = useNotificationDispatch()
  return (payload, seconds) => { dispatch({ type: 'SET', payload: { payload, type:'error' } })
    setTimeout(() => { dispatch({ type: 'RESET' })}, seconds * 1000)
  }
}

export const useNotication = () => {
  const notifyError = useErrorNotification()
  const notifySucces = useSuccesNotification()
  return  [notifySucces, notifyError]
}

export default NotificationContext

