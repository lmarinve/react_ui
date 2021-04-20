import React, { useState, useEffect } from 'react'
import CardAgency from '../CardAgency'
import useTabController from '../../../_helpers/UseTabController'
import UserContext from '../../../Contexts/User'
import useEntityHandler from '../../../_helpers/useEntityHandler'
import {
  getUserAgencies as getUserAgenciesRequest,
  createUserAgency as createUserAgencyRequest,
  updateUserAgency as updateUserAgencyRequest,
  removeUserAgency as removeUserAgencyRequest,
  request
} from '../../../_services'

import { useLoader } from '../../../_helpers/Loader'
import CreateNewCard from '../CreateNewCard'
import CardButton from '../../CardButton'
import ConfigurationCard from '../../ConfigurationCard'

const AgencyList = ({ agencies, setEntity, setActiveTab }) => {
  const updateAgency = agency => {
    setEntity(agency)
    setActiveTab(1)
  }

  const goToConfiguration = () => setActiveTab(1)

    return(
        // CASO: no hay ninguna agencia creada
        // <CreateNewCard 
        //     sectionTitle="Agency"
        //     cardTitle="Agencies"
        // />
        
            agencies.length < 1
            ? <CreateNewCard 
              title="There are no agencies"
              entity="Agency"
              handleClick={goToConfiguration}
              />
            :   <div className="agency-list-container animated fadeInUp">
                    <div className="agency-list">
                        {
                        agencies.map((agency, i) => (
                            <CardAgency 
                              agencyId={agency.id}
                              agencyName={agency.name}
                              agencyAddress="Test address"
                              contactName="Test name"
                              contactPhone="Test phone" 
                              contactEmail="ray@mediagistic.com"
                              blueBtnText="Update"
                              key={agency.id}
                              handleClick={() => updateAgency(agency)}
                            />
                        ))
                        }
                    </div>
                </div>
    )
}

const AgencyConfiguration = ({ agencies, isThereActiveEntity, entity, setMyAgenciesAsActive, addAgency, updateAgency, removeAgency, setAlert }) => {
  const token = localStorage.getItem('token')
  const [createdAgency, setCreatedAgency] = useState(false)
  const loaders = {
    'create': useLoader(),
    'update': useLoader(),
    'remove': useLoader()
  }
  const [agency, setAgency] = useState(() => {
    if (!isThereActiveEntity())
      return { name: '' }
    else
      return { ...entity() }
  })
  const handleChange = event => {
    setAgency({
      ...agency,
      [event.target.name]: event.target.value
    })
  }
  const responseHandler = (successMessage) => {
      try {
        setAlert({
          title: 'Success!',
          message: successMessage,
          icon: 'fas fa-sync-alt'
        })
        setMyAgenciesAsActive()
      } catch (error) {
        console.log(error)
        throw new Error('Something went wrong')
      }
  }
  const createUserAgency = () => {
    if (agency.name.length) {
      loaders['create'].loading()
      createUserAgencyRequest(token, agency)
        .then(responseHandler.bind(this, 'The agency was created!'))
        .finally(loaders['create'].loaded)

    }
    return 0
  }
  const updateUserAgency = () => {
    if (agency.name.length) {
      loaders['update'].loading()
      updateUserAgencyRequest(token, agency)
        .then(responseHandler.bind(this, 'The agency was updated'))
        .finally(loaders['update'].loaded)

    }
    return 0
  }
  const removeUserAgency = () => {
      loaders['remove'].loading()
      removeUserAgencyRequest(token, entity().id)
        .then(responseHandler.bind(this, 'The agency was removed!'))
        .finally(loaders['remove'].loaded)

  }

  useEffect(() => {
    if (!isThereActiveEntity())
      setAgency({ name: '' })
    else
      setAgency({ ...entity() })

    return () => {
      setAgency({})
      for (let key in loaders) {
        loaders[key].loaded()
      }
    }
  }, [entity()])

  return <div className="agency-config-container animated fadeInUp">
    {console.log(agency)}
    <ConfigurationCard entity={agency} handleChange={handleChange} itemsName='Clients' entityName='Agency' isThereActiveEntity={isThereActiveEntity} />
    <div className="crud-btn-container">
      {
        !isThereActiveEntity()
          ? <CardButton text='Create' iconClassName='far fa-file-plus' handleClick={createUserAgency} isLoading={loaders['create'].isLoading} />
          : <> 
            <CardButton text='Update' iconClassName='fas fa-sync-alt' isLoading={loaders['update'].isLoading} handleClick={updateUserAgency} />
            <CardButton text='Delete' iconClassName='fas fa-trash-alt' isLoading={loaders['remove'].isLoading} handleClick={removeUserAgency} />
            </>
      }
    </div>
         </div>
}

const AgencyMyAccount = ({ setAlert }) => {
  const token = localStorage.getItem('token')
  const { data, setData } = React.useContext(UserContext)
  const { agencies } = data
  const { tabs, activeTab, isActiveTab, setActiveTab } = useTabController([
    { name: 'Agency list', Component: AgencyList },
    { name: 'Agency configuration', Component: AgencyConfiguration  }
  ])
  const ActiveTab = activeTab().Component
  const { entity, setEntity, isThereActiveEntity } = useEntityHandler({})
  const setMyAgenciesAsActive = () => {
      getUserAgenciesRequest(token)
        .then((response) => {
          setData({
            ...data,
            agencies: response.data 
          })
          setActiveTab(0)
        })
  }
  const addAgency = agencyName => {
    const newAgency = {
      id: agencies.length + 1,
      name: agencyName
    }
    setData({
      ...data,
      agencies: [...agencies, newAgency]
    })
  }
  const updateAgency = (agencyId, agencyNewName) => {
    let agencyToUpdateIndex = agencies.findIndex(agency => agency.id === agencyId)
    setData({
      ...data,
      agencies: agencies.map((agency, i) => {
        if (i === agencyToUpdateIndex)
            return { ...agency, name: agencyNewName }
        else 
            return agency
      })
    })
  }
  const removeAgency = (agencyId) => {
    setData({
      ...data,
      agencies: agencies.filter(agency => agency.id !== agencyId)
    })
  }

  return (
    <div className="agency-section-container animated fadeInUp">
      <div className="agency-section-menu">
        <div className="agency-menu-box">
          {
            tabs().map((tab, index) => (
              // eslint-disable-next-line react/jsx-key
              <button 
                key={UUIDGenerator()}
                className={isActiveTab(index) ? 'active' : ''} 
                onClick={() => {
                  if (index === 1) 
                    setEntity({})
                  
                  return setActiveTab(index)
                }}
              > {tab.name} 
              </button>
            ))
          }
        </div>
      </div>
        <ActiveTab 
          setMyAgenciesAsActive={setMyAgenciesAsActive} 
          agencies={agencies} 
          isThereActiveEntity={isThereActiveEntity} 
          entity={entity} 
          setEntity={setEntity}
          setActiveTab={setActiveTab}
          addAgency={addAgency}
          updateAgency={updateAgency}
          removeAgency={removeAgency}
          setAlert={setAlert}
        />                                          
    </div>
  )
}

const AgencyWizzard = ({ agencies, setActiveTab }) => (
    <div className="agency-section-container animated fadeInUp">
        <div className="agency-select-container">
            {  
              agencies.map((agency, agencyIndex) => (
                <CardAgency 
                  agencyId="MEDIA"
                  agencyName={agency.name}
                  agencyAddress="Test address"
                  contactName="Test name"
                  contactPhone="Test phone" 
                  contactEmail="ray@mediagistic.com"
                  blueBtnText="Select"
                  key={agency.id}
                  handleClick={() => {
                    setActiveTab(1, { clients: agency.clients })
                  }}
                />
              ))
            }
        </div>
    </div>
)

export default { 
  'my-account': AgencyMyAccount, 
  'campaign-wizard': AgencyWizzard 
}
