import React, { createContext, useState } from 'react'

// En caso de que querramos usar un contexto sin tener que estar suscrito a un provider, tenemos que pasarle el estado directamente al createContext
// Si nos suscribimos al provider, estaremos accediendo a el y no al estado inicial que indicamos en el createContext
const Context = createContext({})

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => {
    return window.localStorage.getItem('token')
  })
  const value = {
    isAuth,
    activateUser: token => {
      setIsAuth(true)
      window.localStorage.setItem('token', token)
    },
    removeUser: () => {
      setIsAuth(false)
      window.localStorage.removeItem('token')
    }
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default Context
