import React from 'react'
import { useNotificationValue } from '../context/NotificationContext'
import styled from 'styled-components'

const StyledNotification = styled.section`
  position: fixed;
  width: 25%;
  height: 10%;
  background-color: ${({ type }) => (type === 'succes' ? '#11101d' : '#f44336')};
  z-index: 999;
  left: 74%;
  top: 3%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 5px;
  font-size: 18px;
`

const Notification = () => {
  const notification = useNotificationValue()

  if (notification === null) {
    return null
  }
  console.log(notification.type)
  //const style = notification.type === 'succes' ? sucesStyle : errorStyle

  return <StyledNotification type={notification.type}>{notification.payload}</StyledNotification>
}

export default Notification
