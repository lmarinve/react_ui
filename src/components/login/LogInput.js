import React from 'react'

export default ({ icon, typeInput ,placeHolderText, nameId, onChange, animation }) => (
  <div className={`input-group-container ${animation}`}>
    <i className={`input-group-icon ${icon}`} />
    <input autoComplete='off' type={typeInput} className="input-group" id={nameId} name={nameId} placeholder={placeHolderText} onInput={onChange} />
  </div>
)
