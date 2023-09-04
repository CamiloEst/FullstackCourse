import React from 'react'
import styled from 'styled-components'

const StyledSection = styled.section`
  display:flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 20px;
  gap: 3px;
  margin: 10px 0px;
`

const StyledInput = styled.input`
 font-size: 17px;
 padding: 0.5rem;
 width: 100%;
 border-radius: 5px;
 border: none;
`

const Input = ({ id, text, placeholder, value, changeHandler, type }) => {
  const inputType = type ? type : 'text'

  return (
    <StyledSection>
      <label htmlFor={id}>{text}</label>
      <StyledInput
        id={id}
        type={inputType}
        value={value}
        onChange={changeHandler}
        placeholder={placeholder}
      />
    </StyledSection>
  )
}

export default Input
