import React, { useEffect, useState, useContext } from 'react'
import DashHeader from '../components/DashHeader'
import LoadingComp from '../components/Loader'
import ErrorComp from '../components/ErrorView'
import User from '../components/campaign/sections/User'
import AgenciesComponents from '../components/campaign/sections/Agency'
import ClientsComponents from '../components/campaign/sections/Client'
import CampaignsComponents from '../components/campaign/sections/Campaign'
import Collector from '../components/campaign/sections/Collector'
import GoogleCampaign from '../components/campaign/sections/GoogleCampaign'
import facebookCampaign from '../components/campaign/sections/facebookCampaign'
import { FlightRulesMyAccount, FlightRulesWizzard } from '../components/campaign/sections/FlightRules'
import { WeatherRulesMyAccount, WeatherRulesWizzard } from '../components/campaign/sections/WeatherRules'
import Maps from '../components/campaign/sections/Maps'
import Locations from '../components/campaign/sections/locations'
import Flights from '../components/campaign/sections/Flights'
import Weather from '../components/campaign/sections/Weather'
import Review from '../components/campaign/sections/Review'
import Launch from '../components/campaign/sections/Launch'
import UseTabController from '../_helpers/UseTabController'
import Step from '../components/campaign/Step'
import ExplanationBox from '../components/campaign/ExplanationBox'
import Alert from '../components/campaign/Alert'
import { navigate } from '@reach/router'
import UserContext from '../Contexts/User'
import { 
  getUsers as getUsersRequest,
  getUserAgencies as getUserAgenciesRequest, 
  getUserClients as getUserClientsRequest,
  getUserAdfluenceCampaigns as getUserAdfluenceCampaignsRequest ,
  getMyInfo as getMyInfoRequest,
  getFacebookCampaigns as getFacebookCampaignsRequest,
  getGoogleCampaigns as getGoogleCampaignsRequest,
  getFlightRules as getFlightRulesRequest,
  getWeatherRules as getWeatherRulesRequest,
  getLocations as getLocationsRequest,
  getFlights as getFlightsRequest,
  getWeather as getWeatherRequest
} from '../_services'
import { useLoader } from '../_helpers/Loader'
import '../styles/main.css'

const MainMenu = ({ path }) => {
  const token = localStorage.getItem('token')
  const { mockedData, data, setData } = useContext(UserContext)
  const { agencies, clients, adfluence_campaigns } = data
  const MenuLoader = useLoader()
  const pageLoaders = {
    'weatherRules': useLoader()
  }

  const getMyInfo = () => {
      return getMyInfoRequest(token)
  }
  const getUsers = () => {
      return getUsersRequest(token)
  }
  const getUserAgencies = () => {
      return getUserAgenciesRequest(token)
  }
  const getUserClients = () => {
      return getUserClientsRequest(token)
  }
  const getUserAdfluenceCampaigns = () => {
      return getUserAdfluenceCampaignsRequest(token)
  }
  const getGoogleCampaigns = () => {
      return getGoogleCampaignsRequest(token)
  }
  const getFacebookCampaigns = () => {
      return getFacebookCampaignsRequest(token)
  }
  const getFlightRules = () => {
      return getFlightRulesRequest(token)
        .then((response) => {
           return response
        })
  }
  const getWeatherRules = () => {
    pageLoaders['weatherRules'].loading()
    return getWeatherRulesRequest(token)
      .then((response) => {
         pageLoaders['weatherRules'].loaded()
         return response
      })
  }
  const getLocations = () => {
    return getLocationsRequest(token)
  }
  const getFlights = () => {
    return getFlightsRequest(token)
  }
  const getWeather = () => {
    return getWeatherRequest(token)
  }

  const cleanedUrlPath = path.replace('/', '')
  const Agencies = AgenciesComponents[cleanedUrlPath] || AgenciesComponents['campaign-wizard']
  const Clients = ClientsComponents[cleanedUrlPath] || ClientsComponents ['campaign-wizard']
  const Campaigns = CampaignsComponents[cleanedUrlPath] || CampaignsComponents['campaign-wizard']

  const commonTabs = [
    // CASO: si el usuario selecciona Campaign Wizard
    {
        name: 'Agencies',
        module: Agencies
    },
    {
        name: 'Clients',
        module: Clients,
    },
    {
        name: 'Campaigns',
        module: Campaigns,
    }
  ]

  const Tabs = {
    'campaign-wizard': [
      // CASO: si el usuario selecciona Campaign Wizard
      ...commonTabs,
      {
        name: 'Collectors',
        module: Collector
      },
      {
        name: 'Flight Rules',
        module: FlightRulesWizzard
      },
      {
        name: 'Weather Rules',
        module: WeatherRulesWizzard
      },
      {
        name: 'Review',
        module: Review
      },
      {
        name: 'Launch',
        module: Launch
      }
    ],
    'my-account': [
      {
        name: 'User',
        module: User
      },
      ...commonTabs,
      {
        name: 'Google',
        module: GoogleCampaign
      },
      {
        name: 'Facebook',
        module: facebookCampaign
      },
      {
        name: 'Flight Rules',
        module: FlightRulesMyAccount
      },
      {
        name: 'Weather Rules',
        module: WeatherRulesMyAccount
      },
      {
        name: 'Maps',
        module: Maps
      },
      {
        name: 'Locations',
        module: Locations
      },
      {
        name: 'Flights',
        module: Flights
      },
      {
        name: 'Weather',
        module: Weather
      }
    ]
  }

  const MenuTabs = Tabs[cleanedUrlPath]

  const { activeTab, setActiveTab, tabs, activeIndex } = UseTabController(MenuTabs)

  const ActiveTab = activeTab().module

  const handlePreviousClick = () => {
    if ( (tabs().indexOf(activeTab()) - 1) > -1 ) {
      return setActiveTab(tabs().indexOf(activeTab()) - 1, tabs()[tabs().indexOf(activeTab()) - 1].props)
    } else {
      return null
    }
  }

  const handleNextClick = () => {
    if ( (tabs().indexOf(activeTab()) + 1) > -1){
      return setActiveTab(tabs().indexOf(activeTab()) + 1)
    } else {
      return null
    }
  }

  const canShowPrevOrNextButton = (buttonName) => {
    const buttonHandler = {
      'previous': () => ( tabs().indexOf( activeTab() ) - 1 ),
      'next': () => ( tabs().indexOf( activeTab() ) + 1 )
    }

    return tabs()[buttonHandler[buttonName]()]
  }

  const handleTabClick = tabIndex => {
    if (cleanedUrlPath === 'my-account')
      return setActiveTab(tabIndex)
    else if(tabIndex <= activeIndex())
      return setActiveTab(tabIndex, tabs()[tabIndex].props)

    return 0
  } 

  const [alert, setAlert] = useState({})

  useEffect(() => {
    MenuLoader.loading()
    let requests = [
      getMyInfo(), getUsers(), getUserAgencies(), getUserClients(), getUserAdfluenceCampaigns(), 
      getFacebookCampaigns(), getGoogleCampaigns(), getFlightRules(), getWeatherRules(),
      getLocations(), getFlights(), getWeather()
    ]
    Promise.allSettled(requests)
      .then(responses => {
          setData({
            ...data,
            myInfo: responses[0].status === 'rejected' || responses[1].status === 'rejected' 
              ? {
                ...responses[0].value.data,
                agencies: responses[2].status === 'rejected' ? [] : responses[2].value.data.filter(agency => agency.users.find(userId => userId === responses[0].value.data.pk)),
                clients: responses[3].status === 'rejected' ? [] : responses[3].value.data.filter(client => client.users.find(userId => userId === responses[0].value.data.pk)),
                campaigns: responses[4].status === 'rejected' ? [] : responses[4].value.data
              }
              : {
                ...responses[1].value.data.find(user => responses[0].value.data.email === user.email),
                agencies: responses[2].status === 'rejected' ? [] : responses[2].value.data.filter(agency => agency.users.find(userId => userId === responses[0].value.data.pk)),
                clients: responses[3].status === 'rejected' ? [] : responses[3].value.data.filter(client => client.users.find(userId => userId === responses[0].value.data.pk)),
                campaigns: responses[4].status === 'rejected' ? [] : responses[4].value.data
              },
            users: responses[1].status === 'rejected' ? [] : responses[1].value.data,
            agencies: responses[2].status === 'rejected' ? [] : responses[2].value.data,
            clients: responses[3].status === 'rejected' ? [] : responses[3].value.data,
            adfluence_campaigns: responses[4].status === 'rejected' ? [] : responses[4].value.data,
            facebookCampaigns: responses[5].status === 'rejected' ? [] : responses[5].value.data,
            googleCampaigns: responses[6].status === 'rejected' ? [] : responses[6].value.data,
            flightRules: responses[7].status === 'rejected' ? [] : responses[7].value.data,
            weatherRules: responses[8].status === 'rejected' ? [] : responses[8].value.data,
            locations: responses[9].status === 'rejected' ? [] : responses[9].value.data,
            flights: responses[10].status === 'rejected' ? [] : responses[10].value.data,
            weather_list: responses[11].status === 'rejected' ? [] : responses[11].value.data
          })
      })
      .catch(console.log)
      .finally(MenuLoader.loaded)
  }, [])

  return (
    <div className="main-container animated fadeIn">
      <div className="main-header">
        <DashHeader
          title='Back to Dashboard' handleClick={() => navigate('/dashboard', { replace: true })}
        />
        <div className="campaign-timeline-container animated fadeInDown">
          <div className='campaign-timeline'>
            {tabs().map((section, i) => {
              const getTabStatus = () => {
                if (section.name === activeTab().name)
                  return 'actual'
                else if (i < activeIndex())
                  return 'previous'
                else
                  return ''
              }

              return (
                <Step 
                  key={section.name} 
                  name={section.name} 
                  handleClick={() => handleTabClick(i)}
                  status={getTabStatus()}
                />
              )
            }
            )}
          </div>
        </div>
      </div>
      {
        // Caso: si ha ocurrido un error
        // <div className="error-section-container">
        //     <ErrorComp />
        // </div>
        
        MenuLoader.isLoading()
          ? <div className="loading-section-container">
              <LoadingComp />
            </div> 
          : <ActiveTab 
            agencies={agencies}
            clients={clients}
            campaigns={adfluence_campaigns}
            setAlert={setAlert}
            />
      }
      <div className='navigation-buttons-container'>
        {canShowPrevOrNextButton('previous')
            && <button className="navigation-buttons animated fadeInUp" onClick={() => handlePreviousClick()}><i className="fas fa-caret-left" /></button>}
        {(cleanedUrlPath === 'my-account' && canShowPrevOrNextButton('next'))
            && <button className="navigation-buttons animated fadeInDown" onClick={() => handleNextClick()}><i className="fas fa-caret-right" /></button>}
      </div>
      <ExplanationBox
        title='Campaign Type'
        text='This block of text will explain to the user what they need to do in this section of the wizard. Each section is different, therefore this block is made up of dynamic text.'
      />
      {
        Object.keys(alert).length > 0
          && <Alert 
            icon={alert.icon}
            title={alert.title}
            message={alert.message}
            handleClick={() => setAlert({})}
             />
      }
      {/* Caso: Se creo una nueva agencia */}
       {/* <Alert 
         icon="far fa-file-plus"
         title="Congratulations!"
         message="A new Agency has been created sucessfully"
       /> */}
      {/* Caso: Se actualizo una nueva agencia */}
        {/* <Alert 
        icon="fas fa-sync-alt"
        title="Congratulations!"
        message="The Agency has been updated sucessfully"
       /> */}
      {/* Caso: Se borro una nueva agencia */}
        {/* <Alert 
        icon="fas fa-trash-alt"
        title="Congratulations!"
        message="The Agency has been deleted sucessfully"
       /> */}
      {/* Caso: ocurrio un error */}
       {/* <Alert 
        icon="far fa-frown"
        title="Oh no!"
        message="An error has occurred, try it again"
       /> */}
      {/* Caso: no tienes permiso */}
       {/* <Alert 
        icon="far fa-ban"
        title="Not so fast!"
        message="You are not allowed to do that, try something else"
       /> */}
    </div>
  )
}

export default MainMenu
