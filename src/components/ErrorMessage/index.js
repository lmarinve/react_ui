import React from 'react'

export default function ({ message, marginBottom = '' }) {
  return (
    <div className="error-message-container" style={{ marginBottom }}>
      <span> {message} </span>
    </div>
  )
}
