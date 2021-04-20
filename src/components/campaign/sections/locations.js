import React from 'react'
import UserContext from '../../../Contexts/User'
import useTabController from '../../../_helpers/UseTabController'
import CardLocation from '../CardLocation'
import { Select } from '../Select'
import CardButton from '../../CardButton'
import CreateNewCard from '../CreateNewCard'
import useEntityHandler from '../../../_helpers/useEntityHandler'
import {
    getLocations as getLocationsRequest,
    createLocation as createLocationRequest,
    // updateLocations as updateLocationsRequest,
    // removeLocations as removeLocationsRequest
} from '../../../_services'
import { useLoader } from '../../../_helpers/Loader'

const LocationsList = ({ locations, setEntity, setActiveTab, goToUpdateLocation }) =>{
    return(
        <div className="location-list-container animated fadeInUp">
            <div className="location-list">
                {
                    locations.length > 0
                      ? locations.map(location => (
                        <CardLocation 
                          key={UUIDGenerator()}
                          locationId={location.id}
                          country={location.country}
                          city={location.city}
                        />
                      ))
                      : <CreateNewCard 
                        title='There are no locations' 
                        entity='Location' 
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

const LocationsConfiguration = (props) =>{
    const {
        locations, token, entity, setEntity, setActiveTab,
        update, isThereActiveEntity, setAlert
    } = props
    const loaders = {
        'create': useLoader(),
        'update': useLoader(),
        'remove': useLoader()
    }
    const [location, setLocation] = React.useState(() => {
        if (!isThereActiveEntity())
          return {
              id: null,
              city: null,
              country: null
          }
        else
          return {
              ...entity()
          }
    })
    const handleChange = event => {
        setLocation({
            ...location,
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
    const countriesTest = ["United States", "Canada", "Mexico"]
    const handleCountryChange = (value) => {
        setLocation({
            ...location,
            country: value
        })
    }
    const citiesTest = ["Chicago", "Miami", "New York", "Tampa"]
    const handleCityChange = (value) => {
        setLocation({
            ...location,
            city: value
        })
    }

    const createLocation = () => {
        if (location.id && location.city && location.country) {
            loaders['create'].loading()
            createLocationRequest(token, location)
              .then(responseHandler.bind(this, 'The location was created'))
              .catch(console.error)
              .finally(loaders['create'].loaded)
        }

        return 0
    }
    const updateLocation = () => null
    const removeLocation = () => null

    return(
        <div className="location-config-container animated fadeInUp">
            <div className="card-container">
                <div className="row">
                    <label>Location ID:</label>
                    <input type="text" name='id' defaultValue={location.id} onInput={handleChange} />
                </div>
                <div className="location-selects">
                    <Select 
                      title="Country"
                      elementsName="countries"
                      isSelectable
                      options={countriesTest}
                      activeOption={location.country}
                      handleOptionsChange={handleCountryChange}
                    />
                    <Select 
                      title="City"
                      elementsName="cities"
                      isSelectable
                      options={citiesTest}
                      activeOption={location.city}
                      handleOptionsChange={handleCityChange}
                    />
                </div>
            </div>
            <div className="crud-btn-container">
                {
                    !isThereActiveEntity()
                    ? <CardButton text='Create' iconClassName='far fa-file-plus' handleClick={createLocation} isLoading={loaders['create'].isLoading} />
                    // eslint-disable-next-line react/jsx-fragments
                    : <> 
                        <CardButton text='Update' iconClassName='fas fa-sync-alt' isLoading={loaders['update'].isLoading} handleClick={updateLocation} />
                        <CardButton text='Delete' iconClassName='fas fa-trash-alt' isLoading={loaders['remove'].isLoading} handleClick={removeLocation} />
                      </>
                }
            </div>
        </div>
    )
}

const Locations = ({ setAlert }) => {
    const token = localStorage.getItem('token')
    const { data, setData } = React.useContext(UserContext)
    const { locations } = data
    const { tabs, activeTab, setActiveTab, isActiveTab, activeIndex } = useTabController([
        { name: 'Locations list', Component: LocationsList },
        { name: 'Location configuration', Component: LocationsConfiguration  }
    ])
    const ActiveTab = activeTab()
    const { entity, setEntity, isThereActiveEntity } = useEntityHandler({})
    const setMyLocationsAsActive = () => {
        return getLocationsRequest(token) 
          .then((response) => {
              setData({
                  ...data,
                  locations: response.data
              })
              setActiveTab(0)
          })
    }
    const goToUpdateLocation = (Location) => {
        setEntity(Location)
        setActiveTab(1)
    }

    return(
        <div className="location-section-container">
             <div className="location-section-menu">
                <div className="location-menu-box">
                    {
                        tabs().map((tab, index) => (
                            <button 
                              key={UUIDGenerator()} 
                              className={isActiveTab(index) ? 'active' : ''} 
                              onClick={() => {
                                if (index === activeIndex())
                                  return 0

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
            <ActiveTab.Component
              token={token}
              locations={locations}
              entity={entity}
              setEntity={setEntity}
              setActiveTab={setActiveTab}
              update={setMyLocationsAsActive}
              setAlert={setAlert}
              isThereActiveEntity={isThereActiveEntity}
              goToUpdateLocation={goToUpdateLocation}
            />
        </div>
    )
}

export default Locations