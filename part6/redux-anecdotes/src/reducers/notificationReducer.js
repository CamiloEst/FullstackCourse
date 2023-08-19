import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return (state = action.payload)
    },
    deleteNotification(state, action) {
      return (state = null)
    },
  },
})

export const { showNotification, deleteNotification } =
  notificationSlice.actions

export const setNotification = (message, seconds) => {
  return (dispatch) => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(deleteNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
