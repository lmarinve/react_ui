import React, { useState, useEffect } from 'react'
import CardAgency from '../CardAgency'
import useTabController from '../../../_helpers/UseTabController'
import UserContext from '../../../Contexts/User'
import useEntityHandler from '../../../_helpers/useEntityHandler'
import {
  getUserAgencies as getUserAgenciesRequest,
  createUserAgency as createUserAgencyRequest,
  updateUserAgency as updateUserAgencyRequest,
  removeUserAgency as removeUserAgencyRequest
} from '../../../_services'

import { useLoader } from '../../../_helpers/Loader'
import CardButton from '../../CardButton'
import ConfigurationCard from '../../ConfigurationCard'

const AgencyList = ({ agencies, setEntity, setActiveTab }) => {
  const updateAgency = agency => {
    setEntity(agency)
    setActiveTab(1)
  }

  return <div className="agency-list-container animated fadeInUp">
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
}

const AgencyConfiguration = ({ agencies, isThereActiveEntity, entity, setMyAgenciesAsActive }) => {
  const token = localStorage.getItem('token')
  const [createdAgency, setCreatedAgency] = useState(false)
  const agencyLoader = useLoader()
  const [agency, setAgency] = useState(() => {
    if (!isThereActiveEntity())
      return { id: '', name: '' }
    else
      return { ...entity() }
  })
  const handleChange = event => {
    setAgency({
      ...agency,
      [event.target.name]: event.target.value
    })
  }
  const responseHandler = () => {
      try {
        setMyAgenciesAsActive()
      } catch (error) {
        console.log(error)
      }
  }
  const createUserAgency = () => {
    if (agency.name.length) {
      agencyLoader.loading()
      createUserAgencyRequest(token, agency)
        .then(responseHandler)
        .finally(agencyLoader.loaded)

    }
    return 0
  }
  const updateUserAgency = () => {
    if (agency.name.length) {
      agencyLoader.loading()
      updateUserAgencyRequest(token, agency)
        .then(responseHandler)
        .finally(agencyLoader.loaded)

    }
    return 0
  }
  const removeUserAgency = () => {
      agencyLoader.loading()
      removeUserAgencyRequest(token, agency.id)
        .then(responseHandler)
        .finally(agencyLoader.loaded)

  }

  useEffect(() => {
    if (!isThereActiveEntity())
      setAgency({ id: '', name: '' })
    else
      setAgency({ ...entity() })

    return () => setAgency({})
  }, [entity()])

  return <div className="agency-config-container animated fadeInUp">
    {console.log(agency)}
    <ConfigurationCard entity={agency} handleChange={handleChange} itemsName='Clients' entityName='Agency' />
    <div className="crud-btn-container">
      {
        !isThereActiveEntity()
          ? <CardButton text='Create' iconClassName='far fa-file-plus' handleClick={createUserAgency} isLoading={agencyLoader.isLoading} />
          : <> 
            <CardButton text='Update' iconClassName='fas fa-sync-alt' isLoading={agencyLoader.isLoading} handleClick={updateUserAgency} />
            <CardButton text='Delete' iconClassName='fas fa-trash-alt' isLoading={agencyLoader.isLoading} handleClick={removeUserAgency} />
            </>
      }
    </div>
    {
        createdAgency
          && <p>Created!</p>
    }
         </div>
}

const AgencyMyAccount = () => {
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

  return (
    <div className="agency-section-container animated fadeInUp">
      <div className="agency-section-menu">
        <div className="agency-menu-box">
          {
            tabs().map((tab, index) => (
              // eslint-disable-next-line react/jsx-key
              <button 
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
