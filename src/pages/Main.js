import React, { useEffect, useState, useContext } from 'react'
import DashHeader from '../components/DashHeader'
import LoadingComp from '../components/Loader'
import ErrorComp from '../components/ErrorView'
import User from '../components/campaign/sections/User'
import AgenciesComponents from '../components/campaign/sections/Agency'
import ClientsComponents from '../components/campaign/sections/Client'
import CampaignsComponents from '../components/campaign/sections/Campaign'
import Collector from '../components/campaign/sections/Collector'
import AdChannel from '../components/campaign/sections/AdChannel'
import { RulesMyAccount, RulesWizzard } from '../components/campaign/sections/Rules'
import Maps from '../components/campaign/sections/Maps'
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
  getMyInfo as getMyInfoRequest
} from '../_services'
import { useLoader } from '../_helpers/Loader'
import '../styles/main.css'

const MainMenu = ({ path }) => {
  const token = localStorage.getItem('token')
  const { mockedData, data, setData } = useContext(UserContext)
  const { agencies, clients, adfluence_campaigns } = data
  const MenuLoader = useLoader()

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
        name: 'Rules',
        module: RulesWizzard
      }
    ],
    'my-account': [
      {
        name: 'User',
        module: User
      },
      ...commonTabs,
      {
        name: 'Ad Channel',
        module: AdChannel
      },
      {
        name: 'Rules',
        module: RulesMyAccount
      },
      {
        name: 'Maps',
        module: Maps
      },
      {
        name: 'Review',
        module: Review
      },
      {
        name: 'Launch',
        module: Launch
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
    console.log('holaa')
    MenuLoader.loading()
    let requests = [getMyInfo(), getUsers(), getUserAgencies(), getUserClients(), getUserAdfluenceCampaigns()]
    Promise.allSettled(requests)
      .then(responses => {
          setData({
            ...data,
            myInfo: responses[0].status === 'rejected' || responses[1].status === 'rejected' ? data.myInfo : responses[1].value.data.find(user => responses[0].value.data.email === user.email),
            users: responses[1].status === 'rejected' ? null : responses[1].value.data,
            agencies: responses[2].status === 'rejected' ? [] : responses[2].value.data,
            clients: responses[3].status === 'rejected' ? [] : responses[3].value.data,
            adfluence_campaigns: responses[4].status === 'rejected' ? [] : responses[4].value.data
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
