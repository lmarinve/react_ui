import React, { useEffect, useState, useContext } from 'react'
import DashHeader from '../components/DashHeader'
import LoadingComp from '../components/Loader'
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
import { navigate } from '@reach/router'
import UserContext from '../Contexts/User'
import { 
  getUserAgencies as getUserAgenciesRequest, 
  getUserClients as getUserClientsRequest,
  getUserAdfluenceCampaigns as getUserAdfluenceCampaignsRequest 
} from '../_services'
import { useLoader } from '../_helpers/Loader'
import '../styles/main.css'

const MainMenu = ({ path }) => {
  const token = localStorage.getItem('token')
  const { mockedData, data, setData } = useContext(UserContext)
  const MenuLoader = useLoader()

  const getUserAgencies = () => {
      return getUserAgenciesRequest(token)
  }
  const getUserClients = () => {
      return getUserClientsRequest(token)
  }
  const getUserAdfluenceCampaigns = () => {
      return getUserAdfluenceCampaignsRequest(token)
  }

  useEffect(() => {
      MenuLoader.loading()
      let requests = [getUserAgencies(), getUserClients(), getUserAdfluenceCampaigns()]
      Promise.all(requests)
        .then(responses => {
            setData({
              ...data,
              agencies: responses[0].data,
              clients: responses[1].data,
              adfluence_campaigns: responses[2].data
            })
        })
        .finally(MenuLoader.loaded)
  }, [])

  const cleanedUrlPath = path.replace('/', '')
  const Agencies = AgenciesComponents[cleanedUrlPath] || AgenciesComponents['campaign-wizard']
  const Clients = ClientsComponents[cleanedUrlPath] || ClientsComponents ['campaign-wizard']
  const Campaigns = CampaignsComponents[cleanedUrlPath] || CampaignsComponents['campaign-wizard']

  const commonTabs = [
    // CASO: si el usuario selecciona Campaign Wizard
    {
        name: 'Agencies',
        module: Agencies,
        props: {
          agencies: mockedData.agencies.push(data.agencies)
        }
    },
    {
        name: 'Clients',
        module: Clients,
        props: {
          clients: mockedData.agencies[0].clients
        }
    },
    {
        name: 'Campaigns',
        module: Campaigns,
        props: {}
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

  const { activeTab, setActiveTab, tabs, activeProps, activeIndex } = UseTabController(MenuTabs, mockedData)

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
        MenuLoader.isLoading()
          ? <div className="loading-section-container">
              <LoadingComp />
            </div> 
          : <ActiveTab {...activeProps()} />
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
    </div>
  )
}

export default MainMenu
