import React from 'react'

const Step = (props) => {
  const { name, handleClick, status} = props
// status = "actual" si el boton corresponde a la seccion activa
// status = "previous" si los botones esta a la izquierda del seleccionado
  return (
    <div className={`step ${status}`} onClick={handleClick}>
      <div className='count-title'>{name}</div>
    </div>
  )
}

export default Step
