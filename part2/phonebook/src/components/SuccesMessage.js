import React from 'react'

const SuccesMessage = ({message}) => {
      const sucesStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
      }

    if(message === null){
      return null
    }

    return (
        <div style={sucesStyle}>
             {message}
        </div>
    )
}

export default SuccesMessage

