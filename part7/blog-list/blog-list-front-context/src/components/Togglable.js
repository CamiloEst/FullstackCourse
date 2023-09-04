import { useState, forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components'

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

const CancelButton = styled.button`
  background-color: #1d1b31;
  font-size: 17px;
  color: white;
  border-style: solid;
  transition: all 0.3s linear;
  cursor: pointer;
  padding: 0.4rem 1.2rem;
  border-radius: 11px;
  margin-top: 10px;

  &:hover {
    background-color: #f44336;
    border-color: #d32f2f;
  }
`

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <StyledButton onClick={toggleVisibility}>
          {props.buttonLabel}
        </StyledButton>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <CancelButton onClick={toggleVisibility}>Cancel</CancelButton>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
export default Togglable
