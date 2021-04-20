/* eslint-disable react/jsx-fragments */
import React from 'react'
import SearchList from '../SearchList'
import CardAdChannel from '../CardAdChannel'
import CreateNewCard from '../CreateNewCard'
import CardButton from '../../CardButton'
import useTabController from '../../../_helpers/UseTabController'
import UserContext from '../../../Contexts/User'
import { Select, SelectCheckbox } from '../Select'
import useEntityHandler from '../../../_helpers/useEntityHandler'
import { useLoader } from '../../../_helpers/Loader'
import {
    getFacebookCampaigns as getFacebookCampaignsRequest,
    createFacebookCampaign as createFacebookCampaignRequest,
    updateFacebookCampaign as updateFacebookCampaignRequest,
    removeFacebookCampaign as removeFacebookCampaignRequest
} from '../../../_services'

const AdChannelList = ({ facebookCampaigns, setEntity, setActiveTab, goToUpdateFacebookCampaign }) => (
    <div className="ad-channel-list-container animated fadeInUp">
        <div className="ad-channel-list">
            { 
                facebookCampaigns.length > 0
                  ? facebookCampaigns.map((campaign, i) => (
                      <CardAdChannel
                        AdChannelName={campaign.name}
                        AdChannelStart={campaign.start_date}
                        AdChannelEnd={campaign.end_date}
                        AdAccountId={campaign.ad_account_id}
                        AdChannelBudget={campaign.base_daily_budget}
                        key={UUIDGenerator()}
                        handleUpdate={() => goToUpdateFacebookCampaign(campaign)}
                      />
                  ))
                  : <CreateNewCard 
                    title='There are no facebook campaigns' 
                    entity='Facebook Campaign' 
                    handleClick={() => {
                  setEntity({})
                  setActiveTab(2)
                  }}
                    />
            }
        </div>
    </div>
)

const MyAdChannels = ({ facebookCampaigns, setEntity, setActiveTab, goToUpdateFacebookCampaign }) => (
    <>
        <SearchList animation="animated fadeInDown" searchPlaceholder="Search ad channels..." />
        <div className="ad-channel-list-container animated fadeInUp">
            <div className="ad-channel-list">
            { 
                facebookCampaigns.length > 0
                  ? facebookCampaigns.map((campaign, i) => (
                      <CardAdChannel
                        AdChannelName={campaign.name}
                        AdChannelStart={campaign.start_date}
                        AdChannelEnd={campaign.end_date}
                        AdAccountId={campaign.ad_account_id}
                        AdChannelBudget={campaign.base_daily_budget}
                        key={UUIDGenerator()}
                        handleUpdate={() => goToUpdateFacebookCampaign(campaign)}
                      />
                  ))
                  : <CreateNewCard 
                    title='There are no facebook campaigns' 
                    entity='Facebook Campaign' 
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
        facebookCampaigns, token
    } = props
    const loaders = {
        'create': useLoader(),
        'update': useLoader(),
        'remove': useLoader()
    }
    const [facebookCampaign, setFacebookCampaign] = React.useState(() => {
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
        setFacebookCampaign({
            ...facebookCampaign,
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
        return facebookCampaign.name && 
            facebookCampaign.start_date && 
            facebookCampaign.end_date &&
            facebookCampaign.ad_account_id &&
            facebookCampaign.base_daily_budget &&
            facebookCampaign.adfluenceCampaignId
    }
    const createFacebookCampaign = () => {
        if (canCreate()) {
            loaders['create'].loading()
            createFacebookCampaignRequest(token, facebookCampaign)
              .then(responseHandler.bind(this, 'The facebook campaign was succesfully created!'))
              .finally(loaders['create'].loaded)
        }

        return 0
    }
    const updateFacebookCampaign = () => {
        if (canCreate()) {
            loaders['update'].loading()
            updateFacebookCampaignRequest(token, facebookCampaign)
              .then(responseHandler.bind(this, 'The facebook campaign was succesfully updated!'))
              .finally(loaders['update'].loaded)
        }

        return 0
    }
    const removeFacebookCampaign = () => {
        loaders['remove'].loading()
        removeFacebookCampaignRequest(token, facebookCampaign.id)
          .then(responseHandler.bind(this, 'The facebook campaign was succesfully removed!'))
          .finally(loaders['remove'].loaded)
    }

    const [activeAdfluenceCampaign, setActiveAdfluenceCampaign] = React.useState(adfluence_campaigns.find(campaign => campaign.id === facebookCampaign.adfluenceCampaignId))
    const handleOptionsChange = value => {
        setFacebookCampaign({
          ...facebookCampaign,
          adfluenceCampaignId: adfluence_campaigns.find(campaign => campaign.name === value).id,
        })
        setActiveAdfluenceCampaign(adfluence_campaigns.find(campaign => campaign.name === value))
    }


    const injectionTest = ["Airfare", "Airline", "Destination city name", "Destination airport code", "Origin temperature", "Destination temperature", "Snow", "Origin city name", "Destination city name"]
    const cityTest = ["Miami, FL", "Phoenix, AZ", "Austin, TX"]
    const actionTypeTest = ["Action Type #1", "Action Type #2"]
    const campaignTest = ["Campaign #1", "Campaign #2"]
    const rulesTest = ["Rules #1", "Rules #2"]

    return(
        <div className="ad-channel-config-container animated fadeInUp">
            <div className="card-container">
                <div className="row">
                    <label>Name:</label>
                    <input type="text" defaultValue={facebookCampaign.name} name='name' onInput={handleChange}  />
                </div>
                <div className="row">
                    <label>Start date:</label>
                    <input type="date" defaultValue={facebookCampaign.start_date} name='start_date' onInput={handleChange} />
                </div>
                <div className="row">
                    <label>End date:</label>
                    <input type="date" defaultValue={facebookCampaign.end_date} name='end_date' onInput={handleChange} />
                </div>
                <div className="row">
                    <label>Ad account ID:</label>
                    <input type="text" defaultValue={facebookCampaign.ad_account_id} name='ad_account_id' onInput={handleChange} />
                </div>
                <div className="row">
                    <label>Base budget:</label>
                    <input type="text" defaultValue={facebookCampaign.base_daily_budget} name='base_daily_budget' onInput={handleChange} />
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
                    ? <CardButton text='Create' iconClassName='far fa-file-plus' handleClick={createFacebookCampaign} isLoading={loaders['create'].isLoading} />
                    // eslint-disable-next-line react/jsx-fragments
                    : <> 
                        <CardButton text='Update' iconClassName='fas fa-sync-alt' isLoading={loaders['update'].isLoading} handleClick={updateFacebookCampaign} />
                        <CardButton text='Delete' iconClassName='fas fa-trash-alt' isLoading={loaders['remove'].isLoading} handleClick={removeFacebookCampaign} />
                      </>
                }
            </div>
        </div>
    )
}

export default ({ setAlert }) => {
    const token = localStorage.getItem('token')
    const { data, setData } = React.useContext(UserContext)
    const { facebookCampaigns, adfluence_campaigns } = data
    const { entity, setEntity, isThereActiveEntity } = useEntityHandler({})
    const facebookCampaignTabs = [
        { name: 'Facebook campaigns list', Component: AdChannelList },
        { name: 'My facebook campaigns', Component: MyAdChannels },
        { name: 'Facebook campaign configuration', Component: AdChannelConfiguration }
    ]
    const { activeTab, isActiveTab, setActiveTab, tabs, activeIndex } = useTabController(facebookCampaignTabs)
    const ActiveTab = activeTab().Component
    const setMyFacebookCampaignsAsActive = () => {
        return getFacebookCampaignsRequest(token) 
          .then((response) => {
              setData({
                  ...data,
                  facebookCampaigns: response.data
              })
              setActiveTab(1)
          })
    }
    const goToUpdateFacebookCampaign = (FacebookCampaign) => {
        setEntity(FacebookCampaign)
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
                                if (index === 2)
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
              facebookCampaigns={facebookCampaigns}
              adfluence_campaigns={adfluence_campaigns}
              entity={entity}
              setEntity={setEntity}
              setActiveTab={setActiveTab}
              update={setMyFacebookCampaignsAsActive}
              setAlert={setAlert}
              isThereActiveEntity={isThereActiveEntity}
              goToUpdateFacebookCampaign={goToUpdateFacebookCampaign}
            />
        </div>
    )
}
