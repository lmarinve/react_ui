/* eslint-disable react/jsx-closing-tag-location */
import React, { useState, useEffect } from 'react'
import CardClient from '../CardClient'
import useTabController from '../../../_helpers/UseTabController'
import UserContext from '../../../Contexts/User'
import { 
  getUserClients as getUserClientsRequest,
  createUserClient as createUserClientRequest,
  updateUserClient as updateUserClientRequest,
  removeUserClient as removeUserClientRequest,
  request
} from '../../../_services'
import useEntityHandler from '../../../_helpers/useEntityHandler'
import CardButton from '../../CardButton'
import ConfigurationCard from '../../ConfigurationCard'
import CreateNewCard from '../CreateNewCard'
import { useLoader } from '../../../_helpers/Loader'

const ClientsList = ({ clients, goToUpdateClient, setActiveTab, setEntity }) => (
    <div className="client-list-container animated fadeInUp">
        <div className="client-list">
            {
              clients.length > 0
                ? clients.map((client, i) => (
                    <CardClient 
                      clientId={client.id}
                      clientName={client.name}
                      clientAddress="Test address"
                      contactName="Test name"
                      contactPhone="Test phone"
                      contactEmail="ray@mediagistic.com"
                      blueBtnText="Update"
                      key={client.id}
                      handleClick={() => goToUpdateClient(client)}
                    /> 
                ))
                : <CreateNewCard 
                  title='There are no clients' 
                  entity='Client' 
                  handleClick={() => {
                  setEntity({})
                  setActiveTab(2)
                  }}
                  />
            }
        </div>
    </div>
)

const MyClients = ({ clients, goToUpdateClient, setActiveTab, setEntity }) => (
    <div className="client-list-container animated fadeInUp">
        <div className="client-list">
             {
              clients.length > 0
                ? clients.map((client, i) => (
                    <CardClient 
                      clientId={client.id}
                      clientName={client.name}
                      clientAddress="Test address"
                      contactName="Test name"
                      contactPhone="Test phone"
                      contactEmail="ray@mediagistic.com"
                      blueBtnText="Update"
                      key={client.id}
                      handleClick={() => goToUpdateClient(client)}
                    /> 
                ))
                : <CreateNewCard 
                  title='There are no clients' 
                  entity='Client' 
                  handleClick={() => {
                    setEntity({})
                    setActiveTab(2)
                    }}
                  />
             }
        </div>
    </div>
)

const ClientConfiguration = (props) => {
    const token = localStorage.getItem('token')
    const { isThereActiveEntity, entity, setMyClientsAsActive, agencies, setAlert, createClient, updateClient,removeClient } = props
    const [client, setClient] = useState(() => {
        if (!isThereActiveEntity())
          return { name: '', agencyId: null }
        else
          return { ...entity(), agencyId: entity().agency }
    })
    const loaders = {
      'create': useLoader(),
      'update': useLoader(),
      'remove': useLoader()
    }
    const handleChange = event => {
        setClient({
          ...client,
          [event.target.name]: event.target.value
        })
    }
    const handleResponse = (successMessage) => {
        try {
          setAlert({
            title: 'Success!',
            message: successMessage,
            icon: 'fas fa-sync-alt'
          })
          setMyClientsAsActive()
        } catch (error) {
            console.log(error)
            throw new Error('something went wrong')
        }
    }
    const createUserClient = () => {
        if (client.name.length && client.agencyId) {
            loaders['create'].loading()
            createUserClientRequest(token, client)
              .then(handleResponse.bind(this, 'The client was created!'))
              .finally(loaders['create'].loaded)
        } else {
          return 0
        }
    }
    const canUpdateClient = () => (client.name.length && client.agencyId)
    const updateUserClient = () => { 
        if (canUpdateClient()) {
            loaders['update'].loading()
            updateUserClientRequest(token, client)
              .then(handleResponse.bind(this, 'the client was updated!'))
              .finally(loaders['update'].loaded)    
        }
    }
    const removeUserClient = () => {
        loaders['remove'].loading()
        removeUserClientRequest(token, client.id)
          .then(handleResponse.bind(this, 'the client was removed!'))
          .finally(loaders['remove'].loaded)
    }

    const agenciesToChoose = agencies.map(agency => agency.name)
    const handleOptionsChange = value => {
      setClient({
        ...client,
        agencyId: agencies.find(agency => agency.name === value).id,
      })
    }

    useEffect(() => {
        if (!isThereActiveEntity())
          setClient({ name: '', })
        else
          setClient({ ...entity() })
    
        return () => {
          setClient({})
          for (let key in loaders) {
            loaders[key].loaded()
          }
        }
      }, [entity()])

    return <div className="client-config-container animated fadeInUp">
        <ConfigurationCard 
          agencies={agenciesToChoose} 
          activeOption={agencies.find(agency => agency.id === client.agencyId) ? agencies.find(agency => agency.id === client.agencyId).name : null} 
          handleOptionsChange={handleOptionsChange} 
          entity={client} 
          handleChange={handleChange} 
          itemsName='Campaigns' 
          entityName='Client' 
          isThereActiveEntity={isThereActiveEntity}
        />
        <div className="crud-btn-container">
        { 
            !isThereActiveEntity()
            ? <CardButton text='Create' iconClassName='far fa-file-plus' handleClick={createUserClient} isLoading={loaders['create'].isLoading} />
            // eslint-disable-next-line react/jsx-fragments
            : <> 
                <CardButton text='Update' iconClassName='fas fa-sync-alt' isLoading={loaders['update'].isLoading} handleClick={updateUserClient} />
                <CardButton text='Delete' iconClassName='fas fa-trash-alt' isLoading={loaders['remove'].isLoading} handleClick={removeUserClient} />
              </>
        }
        </div>
    </div>
}


const ClientMyAccount = ({ setAlert }) => {
    const token = localStorage.getItem('token')
    const { data, setData } = React.useContext(UserContext)
    const { clients, agencies } = data

    const { tabs, activeTab, isActiveTab, setActiveTab } = useTabController([
        { name: 'Clients list', Component: ClientsList },
        { name: 'My clients', Component: MyClients },
        { name: 'Client configuration', Component: ClientConfiguration }
    ])
    const ActiveTab = activeTab().Component
    const { entity, setEntity, isThereActiveEntity } = useEntityHandler({})
    const setMyClientsAsActive = () => {
        getUserClientsRequest(token)
          .then((response) => {
            setData({
              ...data,
              clients: response.data 
            })
            setActiveTab(1)
          })
    }
    const createClient = (client) => {
      const newClient = {
        ...client,
        id: clients.length + 1,
      }
      setData({
        ...data,
        clients: [...clients, newClient]
      })
    }
    const updateClient = (clientId, clientNewName) => {
      let clientToUpdateIndex = clients.findIndex(client => client.id === clientId)
      setData({
        ...data,
        clients: clients.map((client, i) => {
          if (i === clientToUpdateIndex)
              return { ...client, name: clientNewName }
          else 
              return client
        })
      })
    }
    const removeClient = (clientId) => {
      setData({
        ...data,
        clients: clients.filter(client => client.id !== clientId)
      })
    }
    const goToUpdateClient = (client) => {
        setEntity(client)
        setActiveTab(2)
    }

    return(
        <div className="client-section-container animated fadeInUp">
            <div className="client-section-menu">
                <div className="client-menu-box">
                    {
                      tabs().map((tab, index) => (
                          // eslint-disable-next-line react/jsx-key
                          <button
                            className={isActiveTab(index) ? 'active' : ''} 
                            onClick={() => {
                              if (index === 2)
                                setEntity({})
                                  
                              return setActiveTab(index)
                            }}
                          > 
                            {tab.name} 
                          </button>
                      )) 
                    }
                </div>
            </div>
            <ActiveTab 
              clients={clients} 
              setMyClientsAsActive={setMyClientsAsActive} 
              isThereActiveEntity={isThereActiveEntity} 
              entity={entity} 
              setEntity={setEntity}
              setActiveTab={setActiveTab}
              goToUpdateClient={goToUpdateClient}
              agencies={agencies}
              setAlert={setAlert}
              createClient={createClient}
              updateClient={updateClient}
              removeClient={removeClient}
              token={token}
            />
        </div>
    )
}

const ClientWizzard = ({ clients, setActiveTab }) => (
    <div className="client-section-container animated fadeInUp">
        <div className="client-select-container">
            <div className="client-list">
                {
                  clients.map((client, clientIndex) => (
                    <CardClient 
                      clientId="COBAY"
                      clientName={client.name}
                      clientAddress="Test address"
                      contactName="Test name"
                      contactPhone="Test phone"
                      contactEmail="ray@mediagistic.com"
                      blueBtnText="Select"
                      handleClick={() => {
                          setActiveTab(2, { adfluence_campaigns: client.adfluence_campaigns })
                      }}
                      key={client.id}
                    />
                  ))
                }
            </div>
        </div>
    </div>
)

export default { 
    'my-account': ClientMyAccount, 
    'campaign-wizard': ClientWizzard 
}
