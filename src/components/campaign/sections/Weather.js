import React from 'react'
import useTabController from '../../../_helpers/UseTabController'
import CardWeather from '../CardWeather'
import { Select } from '../Select'
import UserContext from '../../../Contexts/User'
import useEntityHandler from '../../../_helpers/useEntityHandler'
import {
    getWeather as getWeatherRequest,
    createWeather as createWeatherRequest,
    updateWeather as updateWeatherRequest,
    removeWeather as removeWeatherRequest
} from '../../../_services'
import { useLoader } from '../../../_helpers/Loader'
import CardButton from '../../CardButton'
import CreateNewCard from '../CreateNewCard'

const WeatherList = ({ weather_list, setEntity, setActiveTab, goToUpdateWeather }) =>{
    return(
        <div className="weather-list-container animated fadeInUp">
            <div className="weather-list">
                {
                    weather_list.length > 0
                      ? weather_list.map(weather => (
                        <CardWeather 
                          key={UUIDGenerator()}
                          city={weather.city}
                          handleUpdate={() => goToUpdateWeather(weather)}
                        />
                      ))
                      : <CreateNewCard 
                        title='There is no weather list' 
                        entity='Weather' 
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

const WeatherConfiguration = (props) =>{
    const {
        adfluence_campaigns, weather_list, token, entity, setEntity, setActiveTab,
        update, isThereActiveEntity, setAlert
    } = props
    const loaders = {
        'create': useLoader(),
        'update': useLoader(),
        'remove': useLoader()
    }
    const [weather, setWeather] = React.useState(() => {
        if (!isThereActiveEntity())
          return {
              city: '',
              adfluenceCampaignId: null
          }
        else
          return { ...entity(), adfluenceCampaignId: entity().campaign }
    })
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
    const cities = [
        { name: "Chicago", id: 1 }, 
        { name: "Miami", id: 2 },
        { name: "New York", id: 3 },
        { name: "Tampa", id: 4 }
    ]
    const handleCityChange = value => {
        setWeather({
            ...weather,
            city: cities.find(city => city.name === value).id
        })
    }

    const [activeAdfluenceCampaign, setActiveAdfluenceCampaign] = React.useState(adfluence_campaigns.find(campaign => campaign.id === weather.adfluenceCampaignId))
    const handleCampaignChange = value => {
        setWeather({
          ...weather,
          adfluenceCampaignId: adfluence_campaigns.find(campaign => campaign.name === value).id,
        })
        setActiveAdfluenceCampaign(adfluence_campaigns.find(campaign => campaign.name === value))
    }

    const createWeather = () => {
        if (weather.city && weather.adfluenceCampaignId) {
            loaders['create'].loading()
            createWeatherRequest(token, weather)
            .then(responseHandler.bind(this, 'The weather was created'))
            .catch(console.error)
            .finally(loaders['create'].loaded)
        }
    }
    const updateWeather = () => {
        if (weather.city && weather.adfluenceCampaignId) {
            loaders['update'].loading()
            updateWeatherRequest(token, weather)
            .then(responseHandler.bind(this, 'The weather was updated'))
            .catch(console.error)
            .finally(loaders['updated'].loaded)
        }
    }
    const removeWeather = () => {
        loaders['remove'].loading()
            removeWeatherRequest(token, weather.id)
            .then(responseHandler.bind(this, 'The weather was remove'))
            .catch(console.error)
            .finally(loaders['remove'].loaded)
    }

    return(
        <div className="weather-config-container animated fadeInUp">
            <div className="card-container">
                <div className="weather-selects">
                    <Select 
                      title="City"
                      elementsName="campaigns"
                      isSelectable
                      options={cities.map(city => city.name)}
                      activeOption={weather.city}
                      handleOptionsChange={handleCityChange}
                    />
                </div>
                <div className="weather-selects">
                    <Select 
                      title="Campaign"
                      elementsName="campaigns"
                      isSelectable
                      activeOption={activeAdfluenceCampaign ? activeAdfluenceCampaign.name : null}
                      options={adfluence_campaigns.map(campaign => campaign.name)}
                      handleOptionsChange={handleCampaignChange}
                    />
                </div>
            </div>
            <div className="crud-btn-container">
                {
                    !isThereActiveEntity()
                    ? <CardButton text='Create' iconClassName='far fa-file-plus' handleClick={createWeather} isLoading={loaders['create'].isLoading} />
                    // eslint-disable-next-line react/jsx-fragments
                    : <> 
                        <CardButton text='Update' iconClassName='fas fa-sync-alt' isLoading={loaders['update'].isLoading} handleClick={updateWeather} />
                        <CardButton text='Delete' iconClassName='fas fa-trash-alt' isLoading={loaders['remove'].isLoading} handleClick={removeWeather} />
                      </>
                }
            </div>
        </div>
    )
}

const Weather = ({ setAlert }) => {
    const token = localStorage.getItem('token')
    const { data, setData } = React.useContext(UserContext)
    const { adfluence_campaigns, weather_list } = data
    const { tabs, activeTab, setActiveTab, isActiveTab, activeIndex } = useTabController([
        { name: 'Weather list', Component: WeatherList },
        { name: 'Weather configuration', Component: WeatherConfiguration  }
    ])
    const ActiveTab = activeTab()
    const { entity, setEntity, isThereActiveEntity } = useEntityHandler({})
    const setWeatherAsActive = () => {
        return getWeatherRequest(token) 
          .then((response) => {
              setData({
                  ...data,
                  weather_list: response.data
              })
              setActiveTab(0)
          })
    }
    const goToUpdateWeather = (weather) => {
        setEntity(weather)
        setActiveTab(1)
    }

    return(
        <div className="weather-section-container">
             <div className="weather-section-menu">
                <div className="weather-menu-box">
                    {
                        tabs().map((tab, index) => (
                            <button 
                              key={UUIDGenerator()} 
                              className={isActiveTab(index) ? 'active' : ''} 
                              onClick={() => setActiveTab(index)}
                            > 
                              {tab.name} 
                            </button>
                        ))
                    }
                </div>
             </div>
            <ActiveTab.Component
              token={token}
              weather_list={weather_list}
              adfluence_campaigns={adfluence_campaigns}
              entity={entity}
              setEntity={setEntity}
              setActiveTab={setActiveTab}
              update={setWeatherAsActive}
              setAlert={setAlert}
              isThereActiveEntity={isThereActiveEntity}
              goToUpdateWeather={goToUpdateWeather}
            />
        </div>
    )
}

export default Weather