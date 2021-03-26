import React from 'react'
import { render } from 'react-dom'
import Context, { AuthProvider } from './Context'
import App from './App'

import './styles/styles.css'
import './styles/animate.css'
import './fontawesome-pro/all'
import './icomoon/style.css'

// import App from './pages/Main'

window.React = React

const AppWithAuthContext = () => (
  <AuthProvider> 
    <App /> 
  </AuthProvider>
)

const container = document.getElementById('app')

render(<AppWithAuthContext />, container)
