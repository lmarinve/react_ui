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
  request
} from '../../../_services'

const CampaignsList = ({ adfluence_campaigns, goToUpdateCampaign, setActiveTab }) => (
  <div className="campaign-list-container animated fadeInUp">
    <div className="campaign-list">
        {
            adfluence_campaigns.length > 0
              ? adfluence_campaigns.map((campaign, i) => (
                  <CardCampaign 
                    campaignImage={CampaignPhoto}
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
                    campaignImage={CampaignPhoto}
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

    const clientsTest = ["Client ID", "Client ID", "Client ID"]
    const injectionTest = ["Injection tags #1", "Injection  tags #2", "Injection tags #3"]
    const adChannelTest = ["Ad channel #1", "Ad channel #2", "Ad channel #3"]
    const usersTest = ["lmarinvera@mediagistic.com", "ray@mediagistic.com"]

    const { isThereActiveEntity, entity, clients, setAlert, createCampaign, updateCampaign, removeCampaign, setMyCampaignsAsActive } = props
    const [campaign, setCampaign] = React.useState(() => {
        if (!isThereActiveEntity())
          return { name: '' }
        else
          return { ...entity() }
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
    const create = () => {
        if (campaign.name.length && clientsToChoose.activeTab()) {
            loaders['create'].loading()
            request()
              .then(() => {
                  createCampaign({ name: campaign.name, clientId: clientsToChoose.activeTab().id })
                  setAlert({
                    title: 'Success!',
                    message: 'The campaign was created',
                    icon: 'fas fa-sync-alt'
                  })
                  setMyCampaignsAsActive()
              })
              .finally(loaders['create'].loaded)
        }
    }
    const update = () => {
        if (campaign.name.length) {
            loaders['update'].loading()
            request()
              .then(() => {
                updateCampaign(campaign.id, campaign.name)
                setAlert({
                    title: 'Success!',
                    message: 'The campaign was updated',
                    icon: 'fas fa-sync-alt'
                })
                  setMyCampaignsAsActive()
              })
              .finally(loaders['update'].loaded)    
        }
    }
    const remove = () => {
        loaders['remove'].loading()
        request()
          .then(() => {
            removeCampaign(campaign.id)
            setAlert({
                title: 'Success!',
                message: 'The campaign was removed',
                icon: 'fas fa-sync-alt'
            })
            setMyCampaignsAsActive()
          })
          .finally(loaders['remove'].loaded)
    }
    const clientsToChoose = UseTabController(clients)

    useEffect(() => {
        if (!isThereActiveEntity())
          setCampaign({ name: '', })
        else
          setCampaign({ ...entity() })
    
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
                <img src={CampaignPhoto} />
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
                  options={clientsTest}
                />
                {/* <div className="select-container">
                    <button className="select-btn">
                        Client
                        <i className="select-icon fas fa-angle-down" />
                    </button>
                    <div className="list-container">
                        {
                            clientsToChoose.tabs().map((client, i) => (
                                <label key={client.id} onClick={() => clientsToChoose.setActiveTab(i)} className={clientsToChoose.isActiveTab(i) ? 'active' : ''}> {client.name} </label>
                            ))
                        }
                    </div>
                </div> */}
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
        setActiveTab(1)
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

const CampaignWizzard = ({ adfluence_campaigns, setActiveTab }) => (
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