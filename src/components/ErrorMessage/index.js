import React from 'react'

export default function ({ message, marginBottom = '' }) {
  return (
    <div className="error-message-container" style={{ marginBottom, marginTop: '10px' }}>
      <span> {message} </span>
    </div>
  )
}
