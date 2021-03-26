import React, { createContext, useState } from 'react'

// En caso de que querramos usar un contexto sin tener que estar suscrito a un provider, tenemos que pasarle el estado directamente al createContext
// Si nos suscribimos al provider, estaremos accediendo a el y no al estado inicial que indicamos en el createContext
const Context = createContext({})

export const UserProvider = ({ children }) => {
  const [data, setData] = useState({
    agencies: [],
    clients: [],
    adfluence_campaigns: []
  })
  const [activeMenu, setActiveMenu] = useState('')
  const value = {
    data,
    setData,
    cleanData: () => setData([]),
    mockedData: {
      agencies: [
        {
          id: 1,
          name: 'Adfluence rocks!',
          clients: [
            {
              id: 4,
              name: 'Beach Bay C.A',
              adfluence_campaigns: [
                {
                  id: 3,
                  name: 'Facebook weather campaign',
                  flights: []
                }
              ]
            }
          ]
        }
      ]
    },
    activeMenu,
    setActiveMenu
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default Context
