import React from 'react'

const Input = ({ id, text,placeholder ,value, changeHandler, type }) => {
  const inputType = type ? type : 'text'

  return (
    <div>
      {text}: <input id={id} type={inputType} value={value} onChange={changeHandler} placeholder={placeholder} />
    </div>
  )
}

export default Input
