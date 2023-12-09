import React from 'react'

function AddButton({type, onClick = () => {} }) {
  return (
    <button className={type} onClick={onClick}>{type}</button>
  )
}

export default AddButton