import React from 'react'
import SearchList from '../SearchList'
import useTabController from '../../../_helpers/UseTabController'
import UserContext from '../../../Contexts/User'
import CardWeatherRules from '../CardWeatherRules'
import { Select } from '../Select'

const WeatherRulesList = () => (
    <div className="rules-list-container animated fadeInUp">
        <div className="rules-list">
            <CardWeatherRules
                name="Saint Lucia Weather rule 1"
                priority="1"
                days="10"
                lowPrice="5$"
                highPrice="20$" 
                percentChange="2"
                blueBtnText="Update"
            />
            <CardWeatherRules
                name="Saint Lucia Weather rule 1"
                priority="1"
                days="10"
                lowPrice="5$"
                highPrice="20$" 
                percentChange="2"
                blueBtnText="Update"
            />
            <CardWeatherRules
                name="Saint Lucia Weather rule 1"
                priority="1"
                days="10"
                lowPrice="5$"
                highPrice="20$" 
                percentChange="2"
                blueBtnText="Update"
            />
            <CardWeatherRules
                name="Saint Lucia Weather rule 1"
                priority="1"
                days="10"
                lowPrice="5$"
                highPrice="20$" 
                percentChange="2"
                blueBtnText="Update"
            />
        </div>
    </div>
)

const MyWeatherRules = () => (
    <>
        <SearchList animation="animated fadeInDown" searchPlaceholder="Search rules..." />
        <div className="rules-list-container animated fadeInUp">
            <div className="rules-list">
                <CardWeatherRules
                    name="Saint Lucia Weather rule 1"
                    priority="1"
                    days="10"
                    lowPrice="5$"
                    highPrice="20$" 
                    percentChange="2"
                    blueBtnText="Update"
                />
                <CardWeatherRules
                    name="Saint Lucia Weather rule 1"
                    priority="1"
                    days="10"
                    lowPrice="5$"
                    highPrice="20$" 
                    percentChange="2"
                    blueBtnText="Update"
                />
                <CardWeatherRules
                    name="Saint Lucia Weather rule 1"
                    priority="1"
                    days="10"
                    lowPrice="5$"
                    highPrice="20$" 
                    percentChange="2"
                    blueBtnText="Update"
                />
                <CardWeatherRules
                    name="Saint Lucia Weather rule 1"
                    priority="1"
                    days="10"
                    lowPrice="5$"
                    highPrice="20$" 
                    percentChange="2"
                    blueBtnText="Update"
                />
            </div>
        </div>
    </>
)

const WeatherRuleConfiguration = () => {

    const connectorOptions = ["None", "And", "Or"]
    const whenOptions = ["Real time", "Forescast", "Historical"]
    const weatherTiggerOptions = ["temperature", "snow", "wind"]
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
                        <Select 
                            title="When"
                            elementsName="when"
                            isSelectable
                            options={whenOptions}
                        />
                    </div>
                    <div className="mid">
                        <label>Days:</label>
                        <input type="text" />
                    </div>
                    <div className="box">
                        <Select 
                            title="Weather tigger"
                            elementsName="weather tiggers"
                            isSelectable
                            options={weatherTiggerOptions}
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

const WeatherRulesMyAccount = () => {
    const { data } = React.useContext(UserContext)
    const { tabs, activeTab, setActiveTab, isActiveTab } = useTabController([
        { name: 'Weather rules list', Component: WeatherRulesList },
        { name: 'My weather rules', Component: MyWeatherRules  },
        { name: 'Weather rule configuration', Component: WeatherRuleConfiguration  }
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

const WeatherRulesWizzard = () => (
    <div className="rules-section-container animated fadeInUp">
        <div className="rules-select-container animated fadeInUp">
            <div className="rules-list">
                <CardWeatherRules
                  ruleId="Test ID"
                  ruleName="Saint Lucia Weather rule 1"
                  blueBtnText="Select"
                />
                <CardWeatherRules
                  ruleId="Test ID"
                  ruleName="Saint Lucia Weather rule 1"
                  blueBtnText="Select"
                />
                <CardWeatherRules
                  ruleId="Test ID"
                  ruleName="Saint Lucia Weather rule 1"
                  blueBtnText="Select"
                />
                <CardWeatherRules
                  ruleId="Test ID"
                  ruleName="Saint Lucia Weather rule 1"
                  blueBtnText="Select"
                />
                <CardWeatherRules
                  ruleId="Test ID"
                  ruleName="Saint Lucia Weather rule 1"
                  blueBtnText="Select"
                />
                <CardWeatherRules
                  ruleId="Test ID"
                  ruleName="Saint Lucia Weather rule 1"
                  blueBtnText="Select"
                />
            </div>
        </div>
    </div>

)

export { WeatherRulesMyAccount, WeatherRulesWizzard }