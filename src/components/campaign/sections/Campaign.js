/* eslint-disable react/jsx-fragments */
import React, { useEffect } from 'react'
import SearchList from '../SearchList'
import CardCampaign from '../CardCampaign'
import UseTabController from '../../../_helpers/UseTabController'
import useEntityHandler from '../../../_helpers/useEntityHandler'
import UserContext from '../../../Contexts/User'
import ConfigurationCard from '../../ConfigurationCard'
import CardButton from '../../CardButton'
import { Select } from '../Select'

import CampaignPhoto from '../../../images/lucia3.jpg'
import CreateNewCard from '../CreateNewCard'
import { useLoader } from '../../../_helpers/Loader'
import {
  getUserAdfluenceCampaigns as getUserAdfluenceCampaignsRequest,
  createAdfluenceCampaign as createAdfluenceCampaignRequest,
  updateAdfluenceCampaign as updateAdfluenceCampaignRequest,
  removeAdfluenceCampaign as removeAdfluenceCampaignRequest,
  request,
} from '../../../_services'

const CampaignsList = ({ adfluence_campaigns, goToUpdateCampaign, setActiveTab }) => (
  <div className="campaign-list-container animated fadeInUp">
    <div className="campaign-list">
        {
            adfluence_campaigns.length > 0
              ? adfluence_campaigns.map((campaign, i) => (
                  <CardCampaign 
                    // campaignImage={CampaignPhoto}
                    CampaignId={campaign.id}
                    CampaignName={campaign.name}
                    CampaignStart="2021-01-19"
                    CampaignEnd="2021-10-19"
                    CampaignBudget="5.00"
                    CampaignStatus="Active"
                    blueBtnText="Update"
                    handleClick={() => goToUpdateCampaign(campaign)}
                    key={campaign.id}
                  />
              ))
              : <CreateNewCard
                title='There are no adfluence campaigns'
                entity='Campaign'
                handleClick={() => setActiveTab(2)}
                />
        }
    </div> 
  </div>
)

const MyCampaigns = ({ adfluence_campaigns, goToUpdateCampaign, setActiveTab }) => (
  <>
    <SearchList animation="animated fadeInDown" searchPlaceholder="Search campaigns..." />
    <div className="campaign-list-container animated fadeInUp">
      <div className="campaign-list">
      {
            adfluence_campaigns.length > 0
              ? adfluence_campaigns.map((campaign, i) => (
                  <CardCampaign 
                    // campaignImage={CampaignPhoto}
                    CampaignId={campaign.id}
                    CampaignName={campaign.name}
                    CampaignStart="2021-01-19"
                    CampaignEnd="2021-10-19"
                    CampaignBudget="5.00"
                    CampaignStatus="Active"
                    blueBtnText="Update"
                    handleClick={() => goToUpdateCampaign(campaign)}
                    key={campaign.id}
                  />
              ))
              : <CreateNewCard
                title='There are no adfluence campaigns'
                entity='Campaign'
                handleClick={() => setActiveTab(2)}
                />
        }
      </div>
    </div>
  </>
)

const CampaignConfiguration = (props) => {
    const token = localStorage.getItem('token')

    const clientsTest = ["Client ID", "Client ID", "Client ID"]
    const injectionTest = ["Injection tags #1", "Injection  tags #2", "Injection tags #3"]
    const adChannelTest = ["Ad channel #1", "Ad channel #2", "Ad channel #3"]
    const usersTest = ["lmarinvera@mediagistic.com", "ray@mediagistic.com"]

    const { isThereActiveEntity, entity, clients, setAlert, createCampaign, updateCampaign, removeCampaign, setMyCampaignsAsActive } = props
    const [campaign, setCampaign] = React.useState(() => {
        if (!isThereActiveEntity())
          return { name: '', clientId: null }
        else
          return { ...entity(), clientId: entity().client }
    })
    const loaders = {
        'create': useLoader(),
        'update': useLoader(),
        'remove': useLoader()
    }
    const handleChange = event => {
        setCampaign({
          ...campaign,
          [event.target.name]: event.target.value
        })
    }
    const handleResponse = successMessage => {
      try {
        setAlert({
          title: 'Success!',
          message: successMessage,
          icon: 'fas fa-sync-alt'
        })
        setMyCampaignsAsActive()
      } catch (error) {
        throw new Error('Something went wrong')
      }
    }
    const create = () => {
        if (campaign.name.length && campaign.clientId) {
            loaders['create'].loading()
            createAdfluenceCampaignRequest(token, campaign)
              .then(handleResponse.bind(this, 'The campaign was succesfully created!!'))
              .finally(loaders['create'].loaded)
        }
    }
    const update = () => {
        if (campaign.name.length && campaign.clientId) {
            loaders['update'].loading()
            updateAdfluenceCampaignRequest(token, campaign)
              .then(handleResponse.bind(this, 'The campaign was succesfully updated!!'))
              .finally(loaders['update'].loaded)    
        }
    }
    const remove = () => {
        loaders['remove'].loading()
        removeAdfluenceCampaignRequest(token, campaign.id)
          .then(handleResponse.bind(this, 'The campaign was succesfully removed!'))
          .finally(loaders['remove'].loaded)
    }
    
    const handleCampaignChange = value => {
      setCampaign({
        ...campaign,
        clientId: clients.find(client => client.name === value).id
      })
    }

    useEffect(() => {
        if (!isThereActiveEntity())
          setCampaign({ name: '', clientId: null })
        else
          setCampaign({ ...entity(), clientId: entity().client })
    
        return () => {
          setCampaign({})
          for (let key in loaders) {
            loaders[key].loaded()
          }
        }
      }, [entity()])

    return <div className="campaign-config-container animated fadeInUp">
    <div className="card-container">
        <div className="campaign-photo-container">
            <div className="campaign-photo">
                <i className="campaign-icon fas fa-store-alt" />
                {/* <img src={CampaignPhoto} /> */}
                <div className="upload-img-container">
                    <input type="file" />
                    <i className="upload-icon fal fa-upload" />
                </div>
            </div>
        </div>
        <div className="campaign-data-container">
            <div className="row">
                <label>Name:</label>
                <input type="text" name='name' onInput={handleChange} value={campaign.name} />
            </div>
            <div className="row">
                <label>Start date:</label>
                <input type="date" />
            </div>
            <div className="row">
                <label>End date:</label>
                <input type="date" />
            </div>
            <div className="row">
                <label>Base daily budget:</label>
                <input type="text" />
            </div>
            <div className="status-row">
                <div className="status">
                    <label>Active:</label>
                    <input type="checkbox" />
                </div>
            </div>
            <div className="campaign-selects">
                <Select 
                  title="Clients"
                  elementsName="clients"
                  isSelectable
                  options={clients.map(client => client.name)}
                  activeOption={clients.find(client => client.id === campaign.clientId) ? clients.find(client => client.id === campaign.clientId).name : null}
                  handleOptionsChange={handleCampaignChange}
                />
                <Select 
                  title="Copy injection tags"
                  elementsName="Copy injection tags"
                  isSelectable
                  options={injectionTest}
                />
            </div>
            <div className="campaign-selects">
                <Select 
                  title="Ad channel"
                  elementsName="Ad channels"
                  isSelectable
                  options={adChannelTest}
                />
                <Select 
                  title="Users"
                  elementsName="users"
                  isSelectable
                  options={usersTest}
                />
            </div>
        </div>
    </div>
    <div className="crud-btn-container">
        {
            isThereActiveEntity()
              ? <>
                <CardButton text='Update' iconClassName='fas fa-sync-alt' handleClick={update} isLoading={loaders['update'].isLoading} /> 
                <CardButton text='Delete' iconClassName='fas fa-trash-alt' handleClick={remove} isLoading={loaders['remove'].isLoading} />
                </>
              : <CardButton text='Create' iconClassName='far fa-file-plus' handleClick={create} isLoading={loaders['create'].isLoading} />
        }
    </div>
           </div>
}

const CampaignMyAccount = ({ setAlert }) => {
    const token = localStorage.getItem('token')
    const { data, setData } = React.useContext(UserContext)
    const { adfluence_campaigns, clients } = data

    const campaignTabs = [
            { name: 'Campaigns list', Component: CampaignsList },
            { name: 'My campaigns', Component: MyCampaigns },
            { name: 'Campaign configuration', Component: CampaignConfiguration }
          ]
    const { activeTab, isActiveTab, tabs, setActiveTab } = UseTabController(campaignTabs)

    const ActiveTab = activeTab().Component
    const { entity, setEntity, isThereActiveEntity } = useEntityHandler({})
    const setMyCampaignsAsActive = () => {
        getUserAdfluenceCampaignsRequest(token)
          .then(response => {
            setData({
              ...data,
              myInfo: {
                ...data.myInfo,
                campaigns: response.data
              },
              adfluence_campaigns: response.data
            })
            setActiveTab(1)
          })
    }
    const createCampaign = (campaign) => {
        const newCampaign = {
          ...campaign,
          id: adfluence_campaigns.length + 1,
        }
        setData({
          ...data,
          adfluence_campaigns: [...adfluence_campaigns, newCampaign]
        })
      }
      const updateCampaign = (campaignId, campaignNewName) => {
        let campaignToUpdateIndex = adfluence_campaigns.findIndex(campaign => campaign.id === campaignId)
        setData({
          ...data,
          adfluence_campaigns: adfluence_campaigns.map((campaign, i) => {
            if (i === campaignToUpdateIndex)
                return { ...campaign, name: campaignNewName }
            else 
                return campaign
          })
        })
      }
      const removeCampaign = (campaignId) => {
        setData({
          ...data,
          adfluence_campaigns: adfluence_campaigns.filter(campaign => campaign.id !== campaignId)
        })
      }
      const goToUpdateCampaign = (campaign) => {
          setEntity(campaign)
          setActiveTab(2)
      }

    return(
        <div className="campaign-section-container animated fadeInUp">
            <div className="campaign-section-menu">
                <div className="campaign-menu-box" style={tabs().length > 1 ? {} : { flexDirection: 'column', alignItems: 'center' }}>
                    {tabs().map((tab, index) => (
                        <button
                          key={index}
                          className={isActiveTab(index) ? 'active' : ''} 
                          onClick={() => {
                              if (index === 2)
                                  setEntity({})
                              setActiveTab(index)
                          }}
                        > {tab.name} 
                        </button>
                    ))}
                </div>
            </div>
           <ActiveTab 
             adfluence_campaigns={adfluence_campaigns}
             entity={entity}
             isThereActiveEntity={isThereActiveEntity}
             setMyCampaignsAsActive={setMyCampaignsAsActive}
             createCampaign={createCampaign}
             updateCampaign={updateCampaign}
             removeCampaign={removeCampaign}
             goToUpdateCampaign={goToUpdateCampaign}
             setActiveTab={setActiveTab}
             clients={clients}
             setAlert={setAlert}
           />
        </div>
    )
}

const CampaignWizzard = ({ adfluence_campaigns, clients, setActiveTab }) => (
    <div className="campaign-section-container animated fadeInUp">
        <div className="campaign-select-container">
            <div className="campaign-list">
                {
                    adfluence_campaigns.map((campaign, campaignIndex) => (
                        <CardCampaign 
                          campaignImage={CampaignPhoto}
                          CampaignId="Test ID" 
                          CampaignName={campaign.name}
                          CampaignStart="2021-01-19"
                          CampaignEnd="2021-10-19"
                          CampaignBudget="5.00"
                          CampaignStatus="Active"
                          blueBtnText="Select"
                          handleClick={() => {
                              setActiveTab(3, {})
                          }}
                          key={campaign.id}
                        />    
                    ))
                }
                {/* <CardCampaign 
                  campaignImage={CampaignPhoto}
                  CampaignId="Test ID" 
                  CampaignName="Coconut Bay January 2021"
                  CampaignStart="2021-01-19"
                  CampaignEnd="2021-10-19"
                  CampaignBudget="5.00"
                  CampaignStatus="Active"
                  blueBtnText="Select"
                />                    
                <CardCampaign 
                  campaignImage={CampaignPhoto}
                  CampaignId="Test ID" 
                  CampaignName="Coconut Bay January 2021"
                  CampaignStart="2021-01-19"
                  CampaignEnd="2021-10-19"
                  CampaignBudget="5.00"
                  CampaignStatus="Active"
                  blueBtnText="Select"
                />        
                <CardCampaign 
                  campaignImage={CampaignPhoto}
                  CampaignId="Test ID" 
                  CampaignName="Coconut Bay January 2021"
                  CampaignStart="2021-01-19"
                  CampaignEnd="2021-10-19"
                  CampaignBudget="5.00"
                  CampaignStatus="Active"
                  blueBtnText="Select"
                />                    
                <CardCampaign 
                  campaignImage={CampaignPhoto}
                  CampaignId="Test ID" 
                  CampaignName="Coconut Bay January 2021"
                  CampaignStart="2021-01-19"
                  CampaignEnd="2021-10-19"
                  CampaignBudget="5.00"
                  CampaignStatus="Active"
                  blueBtnText="Select"
                /> */}
            </div>
        </div>
    </div>
)

export default { 
    'my-account': CampaignMyAccount, 
    'campaign-wizard': CampaignWizzard 
}