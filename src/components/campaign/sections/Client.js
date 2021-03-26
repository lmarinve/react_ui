/* eslint-disable react/jsx-closing-tag-location */
import React, { useState, useEffect } from 'react'
import CardClient from '../CardClient'
import useTabController from '../../../_helpers/UseTabController'
import UserContext from '../../../Contexts/User'
import { 
  getUserClients as getUserClientsRequest,
  createUserClient as createUserClientRequest,
  updateUserClient as updateUserClientRequest,
  removeUserClient as removeUserAgencyRequest 
} from '../../../_services'
import useEntityHandler from '../../../_helpers/useEntityHandler'
import CardButton from '../../CardButton'
import ConfigurationCard from '../../ConfigurationCard'
import { useLoader } from '../../../_helpers/Loader'

const ClientsList = ({ clients, updateClient }) => (
    <div className="client-list-container animated fadeInUp">
        <div className="client-list">
            {
                clients.map((client, i) => (
                    <CardClient 
                      clientId={client.id}
                      clientName={client.name}
                      clientAddress="Test address"
                      contactName="Test name"
                      contactPhone="Test phone"
                      contactEmail="ray@mediagistic.com"
                      blueBtnText="Update"
                      key={client.id}
                      handleClick={() => updateClient(client)}
                    /> 
                ))
            }
        </div>
    </div>
)

const MyClients = ({ clients, updateClient }) => (
    <div className="client-list-container animated fadeInUp">
        <div className="client-list">
        {
            clients.map((client, i) => (
                <CardClient 
                  clientId={client.id}
                  clientName={client.name}
                  clientAddress="Test address"
                  contactName="Test name"
                  contactPhone="Test phone"
                  contactEmail="ray@mediagistic.com"
                  blueBtnText="Update"
                  key={client.id}
                  handleClick={() => updateClient(client)}
                /> 
            ))
        }
        </div>
    </div>
)

const ClientConfiguration = (props) => {
    const token = localStorage.getItem('token')
    const { isThereActiveEntity, entity, setMyClientsAsActive, agencies } = props
    const clientLoader = useLoader()
    const [client, setClient] = useState(() => {
        if (!isThereActiveEntity())
          return { id: '', name: '', agencyId: '' }
        else
          return { ...entity() }
    })
    const handleChange = event => {
        setClient({
          ...client,
          [event.target.name]: event.target.value
        })
    }
    const handleResponse = () => {
        try {
            setMyClientsAsActive()
        } catch (error) {
            console.log(error)
        }
    }
    const createUserClient = () => {
        if (client.name.length && client.agencyId) {
            clientLoader.loading()
            createUserClientRequest(token, client)
              .then(handleResponse)
              .finally(clientLoader.loaded)
        }
    }
    const canUpdateClient = () => (client.name.length && client.agencyId && client.agencyName && client.id)
    const updateUserClient = () => { 
        console.log(client, agencies)
        if (canUpdateClient()) {
            clientLoader.loading()
            updateUserClientRequest(token, client)
              .then(handleResponse)
              .finally(clientLoader.loaded)    
        }
    }
    const removeUserClient = () => {
        clientLoader.loading()
        removeUserAgencyRequest(token, client.id)
          .then(handleResponse)
          .finally(clientLoader.loaded)
    }

    useEffect(() => {
        if (!isThereActiveEntity())
          setClient({ id: '', name: '', agencyId: '', agencyName: '' })
        else
          setClient({ ...entity() })
    
        return () => setClient({})
      }, [entity()])

    return <div className="client-config-container animated fadeInUp">
        <ConfigurationCard entity={client} handleChange={handleChange} itemsName='Campaigns' entityName='Client' isThereActiveEntity={isThereActiveEntity} />
        <div className="crud-btn-container">
        { 
            !isThereActiveEntity()
            ? <CardButton text='Create' iconClassName='far fa-file-plus' handleClick={createUserClient} isLoading={clientLoader.isLoading} />
            // eslint-disable-next-line react/jsx-fragments
            : <> 
                <CardButton text='Update' iconClassName='fas fa-sync-alt' isLoading={clientLoader.isLoading} handleClick={updateUserClient} />
                <CardButton text='Delete' iconClassName='fas fa-trash-alt' isLoading={clientLoader.isLoading} handleClick={removeUserClient} />
              </>
        }
        </div>
    </div>
}


const ClientMyAccount = () => {
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
    const updateClient = (client) => {
        setEntity({
            id: client.id,
            name: client.name,
            agencyId: client.agency.id,
            agencyName: client.agency.name
        })
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
              updateClient={updateClient}
              agencies={agencies}
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
