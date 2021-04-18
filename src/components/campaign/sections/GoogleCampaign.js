/* eslint-disable react/jsx-fragments */
import React from 'react'
import SearchList from '../SearchList'
import CardAdChannel from '../CardAdChannel'
import CardButton from '../../CardButton'
import CreateNewCard from '../CreateNewCard'
import useTabController from '../../../_helpers/UseTabController'
import UserContext from '../../../Contexts/User'
import { Select, SelectCheckbox } from '../Select'
import useEntityHandler from '../../../_helpers/useEntityHandler'
import {
    getGoogleCampaigns as getGoogleCampaignsRequest,
    createGoogleCampaign as createGoogleCampaignRequest,
    updateGoogleCampaign as updateGoogleCampaignRequest,
    removeGoogleCampaign as removeGoogleCampaignRequest
} from '../../../_services'
import { useLoader } from '../../../_helpers/Loader'

import GoogleLogo from '../../../images/G-Logo.png'

const AdChannelList = ({ googleCampaigns, setEntity, setActiveTab, goToUpdateGoogleCampaign }) => (
    <div className="ad-channel-list-container animated fadeInUp">
        <div className="ad-channel-list">
            { 
                googleCampaigns.length > 0
                  ? googleCampaigns.map((campaign, i) => (
                      <CardAdChannel
                        AdChannelName={campaign.name}
                        AdChannelStart={campaign.start_date}
                        AdChannelEnd={campaign.end_date}
                        AdAccountId={campaign.ad_account_id}
                        AdChannelBudget={campaign.base_daily_budget}
                        key={UUIDGenerator()}
                        handleUpdate={() => goToUpdateGoogleCampaign(campaign)}
                      />
                  ))
                  : <CreateNewCard 
                    title='There are no google campaigns' 
                    entity='Google Campaign' 
                    handleClick={() => {
                  setEntity({})
                  setActiveTab(2)
                  }}
                    />
            }
        </div>
    </div>
)

const MyAdChannels = ({ googleCampaigns, setEntity, setActiveTab, goToUpdateGoogleCampaign }) => (
    <>
        <SearchList animation="animated fadeInDown" searchPlaceholder="Search ad channels..." />
        <div className="ad-channel-list-container animated fadeInUp">
            <div className="ad-channel-list">
            { 
                googleCampaigns.length > 0
                  ? googleCampaigns.map((campaign, i) => (
                      <CardAdChannel
                        AdChannelName={campaign.name}
                        AdChannelStart={campaign.start_date}
                        AdChannelEnd={campaign.end_date}
                        AdAccountId={campaign.ad_account_id}
                        AdChannelBudget={campaign.base_daily_budget}
                        key={UUIDGenerator()}
                        handleUpdate={() => goToUpdateGoogleCampaign(campaign)}
                      />
                  ))
                  : <CreateNewCard 
                    title='There are no google campaigns' 
                    entity='Google Campaign' 
                    handleClick={() => {
                  setEntity({})
                  setActiveTab(2)
                  }}
                    />
            }
            </div>
        </div>
    </>
)

const AdChannelConfiguration = (props) => {
    const {
        adfluence_campaigns, isThereActiveEntity, entity, setEntity, update, setAlert,
        googleCampaigns, token
    } = props
    const loaders = {
        'create': useLoader(),
        'update': useLoader(),
        'remove': useLoader()
    }
    const [googleCampaign, setGoogleCampaign] = React.useState(() => {
        if (!isThereActiveEntity())
            return {
                name: '',
                start_date: null, 
                end_date: null, 
                ad_account_id: '', 
                base_daily_budget: '',
                copy_injection_template_tags: [],
                adfluenceCampaignId: null
            }
        else {
            return { ...entity(), adfluenceCampaignId: entity().campaign }
        }
    })
    const handleChange = event => {
        setGoogleCampaign({
            ...googleCampaign,
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
    const canCreate = () => {
        return googleCampaign.name && 
            googleCampaign.start_date && 
            googleCampaign.end_date &&
            googleCampaign.ad_account_id &&
            googleCampaign.base_daily_budget &&
            googleCampaign.adfluenceCampaignId
    }
    const createGoogleCampaign = () => {
        if (canCreate()) {
            loaders['create'].loading()
            createGoogleCampaignRequest(token, googleCampaign)
              .then(responseHandler.bind(this, 'The google campaign was succesfully created!'))
              .finally(loaders['create'].loaded)
        }

        return 0
    }
    const updateGoogleCampaign = () => {
        if (canCreate()) {
            loaders['update'].loading()
            updateGoogleCampaignRequest(token, googleCampaign)
              .then(responseHandler.bind(this, 'The google campaign was succesfully updated!'))
              .finally(loaders['update'].loaded)
        }

        return 0
    }
    const removeGoogleCampaign = () => {
        loaders['remove'].loading()
        removeGoogleCampaignRequest(token, googleCampaign.id)
          .then(responseHandler.bind(this, 'The google campaign was succesfully removed!'))
          .finally(loaders['remove'].loaded)
    }

    const [activeAdfluenceCampaign, setActiveAdfluenceCampaign] = React.useState(adfluence_campaigns.find(campaign => campaign.id === googleCampaign.adfluenceCampaignId))
    const handleOptionsChange = value => {
        setGoogleCampaign({
          ...googleCampaign,
          adfluenceCampaignId: adfluence_campaigns.find(campaign => campaign.name === value).id,
        })
        setActiveAdfluenceCampaign(adfluence_campaigns.find(campaign => campaign.name === value))
    }


    const injectionTest = ["Airfare", "Airline", "Destination city name", "Destination airport code", "Origin temperature", "Destination temperature", "Snow", "Origin city name", "Destination city name"]
    const campaignTest = ["Campaign #1", "Campaign #2"]

    return(
        <div className="ad-channel-config-container animated fadeInUp">
            <div className="card-container">
                <div className="row">
                    <label>Name:</label>
                    <input type="text" defaultValue={googleCampaign.name} name='name' onInput={handleChange} />
                </div>
                <div className="row">
                    <label>Start date:</label>
                    <input type="date" defaultValue={googleCampaign.start_date} name='start_date' onInput={handleChange} />
                </div>
                <div className="row">
                    <label>End date:</label>
                    <input type="date" defaultValue={googleCampaign.end_date} name='end_date' onInput={handleChange} />
                </div>
                <div className="row">
                    <label>Ad account ID:</label>
                    <input type="text" defaultValue={googleCampaign.ad_account_id} name='ad_account_id' onInput={handleChange} />
                </div>
                <div className="row">
                    <label>Base budget:</label>
                    <input type="text" defaultValue={googleCampaign.base_daily_budget} name='base_daily_budget' onInput={handleChange} />
                </div>
                <div className="ad-channel-selects">
                    <SelectCheckbox
                      title="Copy injection"
                      elementsName="Copy injections"
                      isSelectable
                      options={injectionTest}
                    />
                    <Select 
                      title="Campaigns"
                      elementsName="Campaigns"
                      isSelectable
                      options={adfluence_campaigns.map((campaign) => campaign.name)}
                      activeOption={activeAdfluenceCampaign ? activeAdfluenceCampaign.name : null}
                      handleOptionsChange={handleOptionsChange}
                    />
                </div>
            </div>
            <div className="crud-btn-container">
                {
                    !isThereActiveEntity()
                    ? <CardButton text='Create' iconClassName='far fa-file-plus' handleClick={createGoogleCampaign} isLoading={loaders['create'].isLoading} />
                    // eslint-disable-next-line react/jsx-fragments
                    : <> 
                        <CardButton text='Update' iconClassName='fas fa-sync-alt' isLoading={loaders['update'].isLoading} handleClick={updateGoogleCampaign} />
                        <CardButton text='Delete' iconClassName='fas fa-trash-alt' isLoading={loaders['remove'].isLoading} handleClick={removeGoogleCampaign} />
                      </>
                }
            </div>
        </div>
    )
}

export default ({ setAlert }) => {
    const token = localStorage.getItem('token')
    const { data, setData } = React.useContext(UserContext)
    const { googleCampaigns, adfluence_campaigns } = data
    const googleCampaignsTabs = [
        { name: 'Google campaigns list', Component: AdChannelList },
        { name: 'My google campaigns', Component: MyAdChannels },
        { name: 'Google campaign configuration', Component: AdChannelConfiguration }
    ]
    const { activeTab, isActiveTab, setActiveTab, tabs, activeIndex } = useTabController(googleCampaignsTabs)
    const ActiveTab = activeTab().Component
    const { entity, setEntity, isThereActiveEntity } = useEntityHandler({})
    const setMyGoogleCampaignsAsActive = () => {
        return getGoogleCampaignsRequest(token) 
          .then((response) => {
              setData({
                  ...data,
                  googleCampaigns: response.data
              })
              setActiveTab(1)
          })
    }
    const goToUpdateGoogleCampaign = (googleCampaign) => {
        setEntity(googleCampaign)
        setActiveTab(2)
    }

    return(
        <div className="ad-channel-section-container animated fadeInUp">
            <div className="ad-channel-section-menu">
                <div className="ad-channel-menu-box" style={tabs().length > 1 ? {} : { flexDirection: 'column', alignItems: 'center' }}>
                    { 
                      tabs().map((tab, index) => (
                          <button 
                            key={UUIDGenerator()} 
                            className={isActiveTab(index) ? 'active' : ''} 
                            onClick={() => {
                                if (index === 1)
                                    setEntity({})

                                if (activeIndex() !== index)
                                    setActiveTab(index)
                            }} 
                            title={tab.name}
                          > 
                            {tab.name} 
                          </button>
                      ))
                    }
                </div>
            </div>
            <ActiveTab
              token={token}
              googleCampaigns={googleCampaigns}
              adfluence_campaigns={adfluence_campaigns}
              entity={entity}
              setEntity={setEntity}
              setActiveTab={setActiveTab}
              update={setMyGoogleCampaignsAsActive}
              setAlert={setAlert}
              isThereActiveEntity={isThereActiveEntity}
              goToUpdateGoogleCampaign={goToUpdateGoogleCampaign}
            />
        </div>
    )
}
