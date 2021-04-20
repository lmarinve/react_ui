import React from 'react'
import useTabController from '../../../_helpers/UseTabController'
import CardFlight from '../CardFlight'
import { Select } from '../Select'
import CardButton from '../../CardButton'
import CreateNewCard from '../CreateNewCard'
import useEntityHandler from '../../../_helpers/useEntityHandler'
import {
    getFlights as getFlightsRequest,
    createFlight as createFlightRequest,
    updateFlight as updateFlightRequest,
    removeFlight as removeFlightRequest
} from '../../../_services'
import { useLoader } from '../../../_helpers/Loader'
import UserContext from '../../../Contexts/User'

const FlightsList = ({ flights, setEntity, setActiveTab, goToUpdateFlight, locations }) =>{
    return(
        <div className="flight-list-container animated fadeInUp">
            <div className="flight-list">
                {
                    flights.length > 0
                      ? flights.map(flight => (
                          <CardFlight
                            key={UUIDGenerator()}
                            name={flight.name}
                            origin={locations.find(location => location.id === flight.origin).city}
                            destination={locations.find(location => location.id === flight.destination).city}
                            handleUpdate={() => goToUpdateFlight(flight)}
                          />
                      ))
                      : <CreateNewCard 
                        title='There are no flights' 
                        entity='Flight' 
                        handleClick={() => {
                            setEntity({})
                            setActiveTab(1)
                        }}
                        />
                }
            </div>
        </div>
    )
}

const FlightsConfiguration = (props) =>{
    const {
        adfluence_campaigns, flights, token, entity, setEntity, setActiveTab,
        update, isThereActiveEntity, setAlert, locations
    } = props
    const loaders = {
        'create': useLoader(),
        'update': useLoader(),
        'remove': useLoader()
    }
    const [flight, setFlight] = React.useState(() => {
        if (!isThereActiveEntity())
          return {
              name: '',
              origin: null,
              destination: null,
              adfluenceCampaignId: null
          }
        else
          return { ...entity(), adfluenceCampaignId: entity().campaign }
    })
    const handleChange = event => {
        setFlight({
            ...flight,
            [event.target.name]: event.target.value
        })
    }
    const responseHandler = (successMessage) => {
        try {
          update()
            .then(() => {
                setAlert({
                    title: 'Success!',
                    message: successMessage,
                    icon: 'fas fa-sync-alt'
                })
            })
        } catch (error) {
          console.log(error)
          throw new Error(error)
        }
    }

    const [activeAdfluenceCampaign, setActiveAdfluenceCampaign] = React.useState(adfluence_campaigns.find(campaign => campaign.id === flight.adfluenceCampaignId))
    const handleOptionsChange = value => {
        setFlight({
          ...flight,
          adfluenceCampaignId: adfluence_campaigns.find(campaign => campaign.name === value).id,
        })
        setActiveAdfluenceCampaign(adfluence_campaigns.find(campaign => campaign.name === value))
    }

    const canCreateOrUpdate = () => {
        return flight.name && flight.origin && flight.destination && flight.adfluenceCampaignId
    }

    const createFlight = () => {
        if (canCreateOrUpdate()) {
            loaders['create'].loading()
            createFlightRequest(token, flight)
              .then(responseHandler.bind(this, 'The flight was created'))
              .catch(console.error)
              .finally(loaders['create'].loaded)
        }
    }

    const updateFlight = () => {
        if (canCreateOrUpdate())
            loaders['update'].loaded()
            updateFlightRequest(token, flight)
              .then(responseHandler.bind(this, 'The flight was updated'))
              .catch(console.error)
              .finally(loaders['update'].loaded)
    }

    const removeFlight = () => {
        loaders['remove'].loading()
        removeFlightRequest(token, entity().id)
        .then(responseHandler.bind(this, 'The flight was removed'))
        .catch(console.error)
        .finally(loaders['update'].loaded)
    } 

    return(
        <div className="flight-config-container animated fadeInUp">
            <div className="card-container">
                <div className="row">
                    <label>Name:</label>
                    <input type="text" name='name' defaultValue={flight.name} onInput={handleChange} />
                </div>
                <div className="row">
                    <label>Origin:</label>
                    <input type="text" name='origin' defaultValue={flight.origin} onInput={handleChange} />
                </div>
                <div className="row">
                    <label>Destination:</label>
                    <input type="text" name='destination' defaultValue={flight.destination} onInput={handleChange} />
                </div>
                <div className="flight-selects">
                    <Select 
                      title="Campaign"
                      elementsName="campaigns"
                      activeOption={activeAdfluenceCampaign ? activeAdfluenceCampaign.name : null}
                      options={adfluence_campaigns.map(campaign => campaign.name)}
                      handleOptionsChange={handleOptionsChange}
                    />
                </div>
            </div>
            <div className="crud-btn-container">
                {
                    !isThereActiveEntity()
                    ? <CardButton text='Create' iconClassName='far fa-file-plus' handleClick={createFlight} isLoading={loaders['create'].isLoading} />
                    // eslint-disable-next-line react/jsx-fragments
                    : <> 
                        <CardButton text='Update' iconClassName='fas fa-sync-alt' isLoading={loaders['update'].isLoading} handleClick={updateFlight} />
                        <CardButton text='Delete' iconClassName='fas fa-trash-alt' isLoading={loaders['remove'].isLoading} handleClick={removeFlight} />
                      </>
                }
            </div>
        </div>
    )
}

const Flights = ({ setAlert }) => {
    const token = localStorage.getItem('token')
    const { data, setData } = React.useContext(UserContext)
    const { flights, adfluence_campaigns, locations } = data
    const { tabs, activeTab, setActiveTab, isActiveTab,activeIndex } = useTabController([
        { name: 'Flights list', Component: FlightsList },
        { name: 'Flight configuration', Component: FlightsConfiguration  }
    ])
    const ActiveTab = activeTab()
    const { entity, setEntity, isThereActiveEntity } = useEntityHandler({})
    const setFlightsAsActive = () => {
        return getFlightsRequest(token) 
          .then((response) => {
              setData({
                  ...data,
                  flights: response.data
              })
              setActiveTab(0)
          })
    }
    const goToUpdateFlight = (flight) => {
        setEntity(flight)
        setActiveTab(1)
    }

    return(
        <div className="flight-section-container">
             <div className="flight-section-menu">
                <div className="flight-menu-box">
                    {
                        tabs().map((tab, index) => (
                            <button 
                              key={UUIDGenerator()} 
                              className={isActiveTab(index) ? 'active' : ''} 
                              onClick={() => {
                                if (index === activeIndex())
                                  return 0

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
            <ActiveTab.Component
              token={token}
              flights={flights}
              locations={locations}
              adfluence_campaigns={adfluence_campaigns}
              entity={entity}
              setEntity={setEntity}
              setActiveTab={setActiveTab}
              update={setFlightsAsActive}
              setAlert={setAlert}
              isThereActiveEntity={isThereActiveEntity}
              goToUpdateFlight={goToUpdateFlight}
            />
        </div>
    )
}

export default Flights