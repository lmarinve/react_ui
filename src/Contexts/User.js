import React, { createContext, useState } from 'react'

// En caso de que querramos usar un contexto sin tener que estar suscrito a un provider, tenemos que pasarle el estado directamente al createContext
// Si nos suscribimos al provider, estaremos accediendo a el y no al estado inicial que indicamos en el createContext
const Context = createContext({})

export const UserProvider = ({ children }) => {
  const [data, setData] = useState({
    myInfo: {
      username: 'Demo user 123',
      email: 'demouser@gmail.com',
      password: 'pajarraco123',
      firstName: 'Luis',
      lastName: 'Pajarraco',
      userId: 1,
      agencyName: 'demo',
      agencyId: 1
    },
    users: [
      {
        username: 'joalbert123',
        email: 'joalbert@gmail.com',
        password: 'pajarraco123',
        firstName: 'jose',
        lastName: 'milano',
        userId: 2,
        agencyName: 'demo2',
        agencyId: 2
      },
      {
        username: 'jeanpier 123',
        email: 'jeanpier@gmail.com',
        password: 'pajarraco123',
        firstName: 'Luis',
        lastName: 'monse',
        userId: 3,
        agencyName: 'demo',
        agencyId: 1
      }
    ],
    agencies: [],
    clients: [],
    adfluence_campaigns: [],
    googleCampaigns: [],
    facebookCampaigns: []
  })
  const [alert, setAlert] = useState({})
  const [activeMenu, setActiveMenu] = useState('')
  const value = {
    data,
    setData,
    alert,
    setAlert: setAlert,
    cleanData: () => setData({}),
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
