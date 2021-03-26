import React from 'react'
import SearchList from '../SearchList'
import CardAdChannel from '../CardAdChannel'
import useTabController from '../../../_helpers/UseTabController'
import UserContext from '../../../Contexts/User'

import GoogleLogo from '../../../images/G-Logo.png'

const AdChannelList = () => (
    <div className="ad-channel-list-container animated fadeInUp">
        <div className="ad-channel-list">
            <CardAdChannel
              AdChannelId="Test ID"
              AdChannelName="Facebook Adset Coconut Bay January 2021"
              AdChannelBudget="5.00"
              AdGroupId="Test ID"
              AdAccountId="Test ID"
              BaseAdId="Test ID"
              AdId="Test ID"
              AdCreativeId="Test ID"
              Headline=" Test Headline"
              PixelId="Test ID"
              injectionId1="1"
              injectionId2="2"
              injectionId3="3"
              injectionId4="4"
              injectionId5="5"
              injectionId6="6"
              injectionId7="7"
              injectionId8="8"
              injectionId9="9"
            />
            <CardAdChannel
              AdChannelId="Test ID"
              AdChannelName="Facebook Adset Coconut Bay January 2021"
              AdChannelBudget="5.00"
              AdGroupId="Test ID"
              AdAccountId="Test ID"
              BaseAdId="Test ID"
              AdId="Test ID"
              AdCreativeId="Test ID"
              Headline=" Test Headline"
              PixelId="Test ID"
              injectionId1="10"
              injectionId2="11"
              injectionId3="12"
              injectionId4="13"
              injectionId5="14"
              injectionId6="15"
              injectionId7="16"
              injectionId8="17"
              injectionId9="18"
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
                AdChannelId="Test ID"
                AdChannelName="Facebook Adset Coconut Bay January 2021"
                AdChannelBudget="5.00"
                AdGroupId="Test ID"
                AdAccountId="Test ID"
                BaseAdId="Test ID"
                AdId="Test ID"
                AdCreativeId="Test ID"
                Headline=" Test Headline"
                PixelId="Test ID"
                injectionId1="1"
                injectionId2="2"
                injectionId3="3"
                injectionId4="4"
                injectionId5="5"
                injectionId6="6"
                injectionId7="7"
                injectionId8="8"
                injectionId9="9"
                />
                <CardAdChannel
                AdChannelId="Test ID"
                AdChannelName="Facebook Adset Coconut Bay January 2021"
                AdChannelBudget="5.00"
                AdGroupId="Test ID"
                AdAccountId="Test ID"
                BaseAdId="Test ID"
                AdId="Test ID"
                AdCreativeId="Test ID"
                Headline=" Test Headline"
                PixelId="Test ID"
                injectionId1="10"
                injectionId2="11"
                injectionId3="12"
                injectionId4="13"
                injectionId5="14"
                injectionId6="15"
                injectionId7="16"
                injectionId8="17"
                injectionId9="18"
                />
            </div>
        </div>
    </>
)

const AdChannelConfiguration = () => (
    <div className="ad-channel-config-container animated fadeInUp">
        <div className="card-container">
            <div className="ad-initial-container">
                <div className="left">
                    <div className="row">   
                        <label>Ad channel ID:</label>
                        <input type="text" />
                    </div>
                    <div className="row">
                        <label>Name:</label>
                        <input type="text" />
                    </div>
                    <div className="row">
                        <label>Base budget:</label>
                        <input type="text" />
                    </div>
                    <div className="row">
                        <label>Ad group ID:</label>
                        <input type="text" />
                    </div>
                </div>
                <div className="right">
                    <div className="row">
                        <label>Ad account ID:</label>
                        <input type="text" />
                    </div>
                    <div className="row">
                        <label>Base ad ID:</label>
                        <input type="text" />
                    </div>
                    <div className="row">
                        <label>Ad ID:</label>
                        <input type="text" />
                    </div>
                    <div className="row">
                        <label>Ad creative ID:</label>
                        <input type="text" />
                    </div>
                </div>
            </div>
            <div className="ad-description-container">
                <div className="row">
                    <label>Headline:</label>
                    <input type="text" />
                </div>
                <div className="row">
                    <label>Headline 2:</label>
                    <input type="text" />
                </div>
                <div className="row">
                    <label>Headline 3:</label>
                    <input type="text" />
                </div>
                <div className="row">
                    <label>Description:</label>
                    <input type="text" />
                </div>
                <div className="row">
                    <label>Description 2:</label>
                    <input type="text" />
                </div>
            </div>
            <div className="ad-channel-selects-container">
                <div className="ad-channel-selects">
                    <div className="select-container">
                        <button className="select-btn">
                            Copy injection
                            <i className="select-icon fas fa-angle-down" />
                        </button>
                        <div className="list-container">
                            <div className="row"><input type="checkbox" id="31" /><label className="injection-option" htmlFor="31">Airfare</label></div>
                            <div className="row"><input type="checkbox" id="32" /><label className="injection-option" htmlFor="32">Airline</label></div>
                            <div className="row"><input type="checkbox" id="33" /><label className="injection-option" htmlFor="33">Origin airport code</label></div>
                            <div className="row"><input type="checkbox" id="34" /><label className="injection-option" htmlFor="34">Destination airport code</label></div>
                            <div className="row"><input type="checkbox" id="35" /><label className="injection-option" htmlFor="35">Origin temperature</label></div>
                            <div className="row"><input type="checkbox" id="36" /><label className="injection-option" htmlFor="36">Destination temperature</label></div>
                            <div className="row"><input type="checkbox" id="37" /><label className="injection-option" htmlFor="37">Snow</label></div>
                            <div className="row"><input type="checkbox" id="38" /><label className="injection-option" htmlFor="38">Origin city name</label></div>
                            <div className="row"><input type="checkbox" id="39" /><label className="injection-option" htmlFor="39">Destination city name</label></div>
                        </div>
                    </div>
                    <div className="select-container">
                        <button className="select-btn">
                            City
                            <i className="select-icon fas fa-angle-down" />
                        </button>
                        <div className="list-container">
                            <label>Miami, FL</label>
                            <label>Phoenix, AZ</label>
                            <label>Austin, TX</label>
                        </div>
                    </div>
                </div>
                <div className="ad-channel-selects">
                    <div className="select-container">
                        <button className="select-btn">
                            Channel type
                            <i className="select-icon fas fa-angle-down" />
                        </button>
                        <div className="list-container channel-type">
                            <label><img className="google-icon" src={GoogleLogo} />Google</label>
                            <label><i className="facebook-icon fab fa-facebook-f" />Facebook</label>
                        </div>
                    </div>
                    <div className="select-container">
                        <button className="select-btn">
                            Action type
                            <i className="select-icon fas fa-angle-down" />
                        </button>
                        <div className="list-container">
                            <label>Action type #1</label>
                            <label>Action type #2</label>
                        </div>
                    </div>
                </div>
                <div className="ad-channel-selects">
                    <div className="select-container">
                        <button className="select-btn">
                            Campaigns
                            <i className="select-icon fas fa-angle-down" />
                        </button>
                        <div className="list-container">
                            <label>Campaign #1</label>
                            <label>Campaign #2</label>
                        </div>
                    </div>
                    <div className="select-container">
                        <button className="select-btn">
                            Rules
                            <i className="select-icon fas fa-angle-down" />
                        </button>
                        <div className="list-container">
                            <label>Rules #1</label>
                            <label>Rules #2</label>
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
        { name: 'Ad channel list', Component: AdChannelList },
        { name: 'My ad channels', Component: MyAdChannels },
        { name: 'Ad channel configuration', Component: AdChannelConfiguration }
    ]
    const { activeTab, isActiveTab, setActiveTab, tabs } = useTabController(adChannelTabs)
    const ActiveTab = activeTab().Component

    return(
        <div className="ad-channel-section-container animated fadeInUp">
            <div className="ad-channel-section-menu">
                <div className="ad-channel-menu-box" style={tabs().length > 1 ? {} : { flexDirection: 'column', alignItems: 'center' }}>
                    { 
                      tabs().map((tab, index) => (
                          <button className={isActiveTab(index) ? 'active' : ''} onClick={() => setActiveTab(index)}> {tab.name} </button>
                      ))
                    }
                </div>
            </div>
            <ActiveTab />
        </div>
    )
}
