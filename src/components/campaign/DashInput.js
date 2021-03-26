import React from 'react'

const DashInput = (props) => {
  const {inputTitle, inputId, inputType, inputValue, inputClass, inputRead} = props
  return (
    <div className='input-dash-container'>
      <label>{inputTitle}</label>
      <input className={`input-dash ${inputClass}`} id={inputId} type={inputType} readOnly={inputRead} value={inputValue} />
    </div>
  )
}

export default DashInput
