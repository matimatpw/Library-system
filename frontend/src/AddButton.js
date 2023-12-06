import React from 'react'

function AddButton({type}) {
  return (
    <button className={type}>{type}</button>
  )
}

export default AddButton