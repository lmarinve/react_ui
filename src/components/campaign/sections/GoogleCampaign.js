import React from 'react'
import SearchList from '../SearchList'
import CardAdChannel from '../CardAdChannel'
import useTabController from '../../../_helpers/UseTabController'
import UserContext from '../../../Contexts/User'
import { Select, SelectCheckbox } from '../Select'

import GoogleLogo from '../../../images/G-Logo.png'

const AdChannelList = () => (
    <div className="ad-channel-list-container animated fadeInUp">
        <div className="ad-channel-list">
            <CardAdChannel
              AdChannelName="Google Adset Coconut Bay January 2021"
              AdChannelStart="10/10/2020"
              AdChannelEnd="20/12/2020"
              AdAccountId="Test ID"
              AdChannelBudget="5.00"
            />
            <CardAdChannel
              AdChannelName="Google Adset Coconut Bay January 2021"
              AdChannelStart="10/10/2020"
              AdChannelEnd="20/12/2020"
              AdAccountId="Test ID"
              AdChannelBudget="5.00"
            />
        </div>
    </div>
)

const MyAdChannels = () => (
    <>
        <SearchList animation="animated fadeInDown" searchPlaceholder="Search ad channels..." />
        <div className="ad-channel-list-container animated fadeInUp">
            <div className="ad-channel-list">
            <CardAdChannel
              AdChannelName="Google Adset Coconut Bay January 2021"
              AdChannelStart="10/10/2020"
              AdChannelEnd="20/12/2020"
              AdAccountId="Test ID"
              AdChannelBudget="5.00"
            />
            <CardAdChannel
              AdChannelName="Google Adset Coconut Bay January 2021"
              AdChannelStart="10/10/2020"
              AdChannelEnd="20/12/2020"
              AdAccountId="Test ID"
              AdChannelBudget="5.00"
            />
            </div>
        </div>
    </>
)

const AdChannelConfiguration = () => {

    const injectionTest = ["Airfare", "Airline", "Destination city name", "Destination airport code", "Origin temperature", "Destination temperature", "Snow", "Origin city name", "Destination city name"]
    const campaignTest = ["Campaign #1", "Campaign #2"]

    return(
        <div className="ad-channel-config-container animated fadeInUp">
            <div className="card-container">
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
                    <label>Ad account ID:</label>
                    <input type="text" />
                </div>
                <div className="row">
                    <label>Base budget:</label>
                    <input type="text" />
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
                        options={campaignTest}
                    />
                </div>
            </div>
            <div className="crud-btn-container">
                <button className="crud-btn"><i className="crud-icon far fa-file-plus" />Create</button>
                <button className="crud-btn"><i className="crud-icon fas fa-sync-alt" />Update</button>
                <button className="crud-btn"><i className="crud-icon fas fa-trash-alt" />Delete</button>
            </div>
        </div>
    )
}

export default () => {
    const { data } = React.useContext(UserContext)
    // const adChannelTabs = data.length && data[0].user_type === 2
    //   ? [
    //       { name: 'Ad channel list', Component: AdChannelList },
    //       { name: 'Ad channel configuration', Component: AdChannelConfiguration }
    //   ]
    //   : [
    //       { name: 'Ad channel configuration', Component: AdChannelConfiguration }
    //   ]
    const adChannelTabs = [
        { name: 'Google campaigns list', Component: AdChannelList },
        { name: 'My google campaigns', Component: MyAdChannels },
        { name: 'Google campaign configuration', Component: AdChannelConfiguration }
    ]
    const { activeTab, isActiveTab, setActiveTab, tabs } = useTabController(adChannelTabs)
    const ActiveTab = activeTab().Component

    return(
        <div className="ad-channel-section-container animated fadeInUp">
            <div className="ad-channel-section-menu">
                <div className="ad-channel-menu-box" style={tabs().length > 1 ? {} : { flexDirection: 'column', alignItems: 'center' }}>
                    { 
                      tabs().map((tab, index) => (
                          <button key={UUIDGenerator()} className={isActiveTab(index) ? 'active' : ''} onClick={() => setActiveTab(index)} title={tab.name}> {tab.name} </button>
                      ))
                    }
                </div>
            </div>
            <ActiveTab />
        </div>
    )
}
