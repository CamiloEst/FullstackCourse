
import { useDispatch } from 'react-redux'
import { filterByName } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(filterByName(event.target.value.toUpperCase()))
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
