/* eslint-disable react/jsx-fragments */
import React from 'react'
import SearchList from '../SearchList'
import CardCampaign from '../CardCampaign'
import UseTabController from '../../../_helpers/UseTabController'
import UserContext from '../../../Contexts/User'

import CampaignPhoto from '../../../images/lucia3.jpg'

const CampaignsList = ({ adfluence_campaigns }) => (
  <div className="campaign-list-container animated fadeInUp">
    <div className="campaign-list">
        <CardCampaign 
          campaignImage={CampaignPhoto}
          CampaignId="Test ID" 
          CampaignName="Coconut Bay January 2021"
          CampaignStart="2021-01-19"
          CampaignEnd="2021-10-19"
          CampaignBudget="5.00"
          CampaignStatus="Active"
          blueBtnText="Update"
        />                    
        <CardCampaign 
          campaignImage={CampaignPhoto}
          CampaignId="Test ID" 
          CampaignName="Coconut Bay January 2021"
          CampaignStart="2021-01-19"
          CampaignEnd="2021-10-19"
          CampaignBudget="5.00"
          CampaignStatus="Active"
          blueBtnText="Update"
        />
        {
            adfluence_campaigns.map((campaign, i) => (
                <CardCampaign 
                  campaignImage={CampaignPhoto}
                  CampaignId="Test ID" 
                  CampaignName={campaign.name}
                  CampaignStart="2021-01-19"
                  CampaignEnd="2021-10-19"
                  CampaignBudget="5.00"
                  CampaignStatus="Active"
                  blueBtnText="Update"
                  key={campaign.id}
                />
            ))
        }
    </div> 
  </div>
)

const MyCampaigns = ({ adfluence_campaigns }) => (
  <>
    <SearchList animation="animated fadeInDown" searchPlaceholder="Search campaigns..." />
    <div className="campaign-list-container animated fadeInUp">
      <div className="campaign-list">
        <CardCampaign 
          campaignImage={CampaignPhoto}
          CampaignId="Test ID" 
          CampaignName="Coconut Bay January 2021"
          CampaignStart="2021-01-19"
          CampaignEnd="2021-10-19"
          CampaignBudget="5.00"
          CampaignStatus="Active"
          blueBtnText="Update"
        />                    
        <CardCampaign 
          campaignImage={CampaignPhoto}
          CampaignId="Test ID" 
          CampaignName="Coconut Bay January 2021"
          CampaignStart="2021-01-19"
          CampaignEnd="2021-10-19"
          CampaignBudget="5.00"
          CampaignStatus="Active"
          blueBtnText="Update"
        />
        {
            adfluence_campaigns.map((campaign, i) => (
                <CardCampaign 
                  campaignImage={CampaignPhoto}
                  CampaignId="Test ID" 
                  CampaignName={campaign.name}
                  CampaignStart="2021-01-19"
                  CampaignEnd="2021-10-19"
                  CampaignBudget="5.00"
                  CampaignStatus="Active"
                  blueBtnText="Update"
                  key={campaign.id}
                />
            ))
        }
      </div>
    </div>
  </>
)

const CampaignConfiguration = () => (
    <div className="campaign-config-container animated fadeInUp">
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
                <label>Campaign ID:</label>
                <input type="text" />
            </div>
            <div className="row">
                <label>Name:</label>
                <input type="text" />
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
                <div className="select-container">
                    <button className="select-btn">
                        Client
                        <i className="select-icon fas fa-angle-down" />
                    </button>
                    <div className="list-container">
                        <label>Client ID</label>
                        <label>Client ID</label>
                        <label>Client ID</label>
                    </div>
                </div>
                <div className="select-container">
                    <button className="select-btn">
                        Copy injection tags
                        <i className="select-icon fas fa-angle-down" />
                    </button>
                    <div className="list-container">
                        <label>Copy injection tags #1</label>
                        <label>Copy injection tags #2</label>
                        <label>Copy injection tags #3</label>
                    </div>
                </div>
            </div>
            <div className="campaign-selects">
                <div className="select-container">
                    <button className="select-btn">
                        Ad channel
                        <i className="select-icon fas fa-angle-down" />
                    </button>
                    <div className="list-container">
                        <label>Ad channel #1</label>
                        <label>Ad channel #2</label>
                    </div>
                </div>
                <div className="select-container">
                    <button className="select-btn">
                        Users
                        <i className="select-icon fas fa-angle-down" />
                    </button>
                    <div className="list-container">
                        <label>lmarinvera@mediagistic.com</label>
                        <label>lmarinve@gmail.com</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="crud-btn-container">
      <button className="crud-btn"><i className="crud-icon far fa-file-plus" />Create</button>
      <button className="crud-btn"><i className="crud-icon fas fa-sync-alt" />Update</button>
      <button className="crud-btn"><i className="crud-icon fas fa-trash-alt" />Delete</button>
    </div>
    </div>
)

const CampaignMyAccount = () => {
    const { data } = React.useContext(UserContext)
    const { adfluence_campaigns } = data

    const campaignTabs = [
            { name: 'Campaigns list', Component: CampaignsList },
            { name: 'My campaigns', Component: MyCampaigns },
            { name: 'Campaign configuration', Component: CampaignConfiguration }
          ]
    const { activeTab, isActiveTab, tabs, setActiveTab } = UseTabController(campaignTabs)

    const ActiveTab = activeTab().Component

    return(
        <div className="campaign-section-container animated fadeInUp">
            <div className="campaign-section-menu">
                <div className="campaign-menu-box" style={tabs().length > 1 ? {} : { flexDirection: 'column', alignItems: 'center' }}>
                    {tabs().map((tab, index) => (
                        <button className={isActiveTab(index) ? 'active' : ''} onClick={() => setActiveTab(index)}> {tab.name} </button>
                    ))}
                </div>
            </div>
           <ActiveTab  adfluence_campaigns={adfluence_campaigns} />
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