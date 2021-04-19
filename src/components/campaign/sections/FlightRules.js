import React from 'react'
import SearchList from '../SearchList'
import useTabController from '../../../_helpers/UseTabController'
import UserContext from '../../../Contexts/User'
import CardFlightRules from '../CardFlightRules'
import { Select } from '../Select'

const FlightRulesList = () => (
    <div className="rules-list-container animated fadeInUp">
        <div className="rules-list">
            <CardFlightRules
                name="Saint Lucia Weather rule 1"
                priority="1"
                lowPrice="5$"
                highPrice="20$" 
                percentChange="2"
                blueBtnText="Update"
            />
            <CardFlightRules
                name="Saint Lucia Weather rule 1"
                priority="1"
                lowPrice="5$"
                highPrice="20$" 
                percentChange="2"
                blueBtnText="Update"
            />
            <CardFlightRules
                name="Saint Lucia Weather rule 1"
                priority="1"
                lowPrice="5$"
                highPrice="20$" 
                percentChange="2"
                blueBtnText="Update"
            />
            <CardFlightRules
                name="Saint Lucia Weather rule 1"
                priority="1"
                lowPrice="5$"
                highPrice="20$" 
                percentChange="2"
                blueBtnText="Update"
            />
        </div>
    </div>
)

const MyFlightRules = () => (
    <>
        <SearchList animation="animated fadeInDown" searchPlaceholder="Search rules..." />
        <div className="rules-list-container animated fadeInUp">
            <div className="rules-list">
            <CardFlightRules
                name="Saint Lucia Weather rule 1"
                priority="1"
                lowPrice="5$"
                highPrice="20$" 
                percentChange="2"
                blueBtnText="Update"
            />
            <CardFlightRules
                name="Saint Lucia Weather rule 1"
                priority="1"
                lowPrice="5$"
                highPrice="20$" 
                percentChange="2"
                blueBtnText="Update"
            />
            <CardFlightRules
                name="Saint Lucia Weather rule 1"
                priority="1"
                lowPrice="5$"
                highPrice="20$" 
                percentChange="2"
                blueBtnText="Update"
            />
            <CardFlightRules
                name="Saint Lucia Weather rule 1"
                priority="1"
                lowPrice="5$"
                highPrice="20$" 
                percentChange="2"
                blueBtnText="Update"
            />
            </div>
        </div>
    </>
)

const FlightRuleConfiguration = () => {

    const connectorOptions = ["None", "And", "Or"]
    const LogicOptions = ["<", "< =", ":", ">", "> ="]
    const ModifierOptions = ["Pause ad", "Increase budget", "Decrease budget"]
    
    return(
        <div className="rules-config-container animated fadeInUp">
            <div className="card-container">
                <div className="row">
                    <div className="box">
                        <label>Name:</label>
                        <input type="text" />
                    </div>
                    <div className="mid">
                        <label>Priority:</label>
                        <input type="text" />
                    </div>
                    <div className="box">
                        <Select 
                            title="Connector"
                            elementsName="Connectors"
                            isSelectable
                            options={connectorOptions}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="box">
                        <label>Low price:</label>
                        <input type="text" />
                    </div>
                    <div className="mid">
                        <Select 
                            title="Logic"
                            elementsName="Opers"
                            isSelectable
                            options={LogicOptions}
                        />
                    </div>
                    <div className="box">
                        <label>High price:</label>
                        <input type="text" />
                    </div>
                </div>
                <div className="row">
                    <Select 
                        title="Modifier action"
                        elementsName="Modifier actions"
                        isSelectable
                        options={ModifierOptions}
                    />
                    <div className="box">
                        <label>% change:</label>
                        <input type="text" />
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
}

const FlightRulesMyAccount = () => {
    const { data } = React.useContext(UserContext)
    const { tabs, activeTab, setActiveTab, isActiveTab } = useTabController([
        { name: 'Flight rules list', Component: FlightRulesList },
        { name: 'My flight rules', Component: MyFlightRules  },
        { name: 'Flight rule configuration', Component: FlightRuleConfiguration  }
    ])
    const ActiveTab = activeTab()

    return(
        <div className="rules-section-container animated fadeInUp">
            <div className="rules-section-menu">
                <div className="rules-menu-box">
                    {
                        tabs().map((tab, index) => (
                            <button key={UUIDGenerator()} className={isActiveTab(index) ? 'active' : ''} onClick={() => setActiveTab(index)}> {tab.name} </button>
                        ))
                    }
                </div>
            </div>
            <ActiveTab.Component />
        </div>
    )
}

const FlightRulesWizzard = () => (
    <div className="rules-section-container animated fadeInUp">
        <div className="rules-select-container animated fadeInUp">
            <div className="rules-list">
                <CardFlightRules
                    name="Saint Lucia Weather rule 1"
                    priority="1"
                    lowPrice="5$"
                    highPrice="20$" 
                    percentChange="2"
                    blueBtnText="Select"
                />
                <CardFlightRules
                    name="Saint Lucia Weather rule 1"
                    priority="1"
                    lowPrice="5$"
                    highPrice="20$" 
                    percentChange="2"
                    blueBtnText="Select"
                />
                <CardFlightRules
                    name="Saint Lucia Weather rule 1"
                    priority="1"
                    lowPrice="5$"
                    highPrice="20$" 
                    percentChange="2"
                    blueBtnText="Select"
                />
                <CardFlightRules
                    name="Saint Lucia Weather rule 1"
                    priority="1"
                    lowPrice="5$"
                    highPrice="20$" 
                    percentChange="2"
                    blueBtnText="Select"
                />
            </div>
        </div>
    </div>

)

export { FlightRulesMyAccount, FlightRulesWizzard }