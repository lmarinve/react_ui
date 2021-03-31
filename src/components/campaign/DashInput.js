import React from 'react'

const DashInput = (props) => {
  const {inputTitle, inputId, inputType, inputValue, inputClass, inputRead, handleChange, ref } = props
  return (
    <div className='input-dash-container'>
      <label>{inputTitle}</label>
      <input 
        className={`input-dash ${inputClass}`} 
        id={inputId} 
        type={inputType} 
        readOnly={inputRead}  
        name={inputId}
        onInput={handleChange}
      />
    </div>
  )
}

export default DashInput
