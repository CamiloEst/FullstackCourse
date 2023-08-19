import { createSlice } from '@reduxjs/toolkit'


const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterByName(state, action) {
      return action.payload
    }
  }
})

  export const { filterByName } = filterSlice.actions
  export default filterSlice.reducer
