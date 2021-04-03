import React from 'react'
import SearchList from '../SearchList'
import useTabController from '../../../_helpers/UseTabController'
import UserContext from '../../../Contexts/User'
import CardRules from '../CardRules'
import { Select } from '../Select'

const RulesList = () => (
    <div className="rules-list-container animated fadeInUp">
        <div className="rules-list">
            <CardRules
                ruleId="Test ID"
                ruleName="Saint Lucia Weather rule 1"
                blueBtnText="Update"
            />
            <CardRules
                ruleId="Test ID"
                ruleName="Saint Lucia Weather rule 1"
                blueBtnText="Update"
            />
            <CardRules
                ruleId="Test ID"
                ruleName="Saint Lucia Weather rule 1"
                blueBtnText="Update"
            />
            <CardRules
                ruleId="Test ID"
                ruleName="Saint Lucia Weather rule 1"
                blueBtnText="Update"
            />
            <CardRules
                ruleId="Test ID"
                ruleName="Saint Lucia Weather rule 1"
                blueBtnText="Update"
            />
            <CardRules
                ruleId="Test ID"
                ruleName="Saint Lucia Weather rule 1"
                blueBtnText="Update"
            />
            <CardRules
                ruleId="Test ID"
                ruleName="Saint Lucia Weather rule 1"
                blueBtnText="Update"
            />
            <CardRules
                ruleId="Test ID"
                ruleName="Saint Lucia Weather rule 1"
                blueBtnText="Update"
            />
            <CardRules
                ruleId="Test ID"
                ruleName="Saint Lucia Weather rule 1"
                blueBtnText="Update"
            />
            <CardRules
                ruleId="Test ID"
                ruleName="Saint Lucia Weather rule 1"
                blueBtnText="Update"
            />
            <CardRules
                ruleId="Test ID"
                ruleName="Saint Lucia Weather rule 1"
                blueBtnText="Update"
            />
            <CardRules
                ruleId="Test ID"
                ruleName="Saint Lucia Weather rule 1"
                blueBtnText="Update"
            />
        </div>
    </div>
)

const MyRules = () => (
    <>
        <SearchList animation="animated fadeInDown" searchPlaceholder="Search rules..." />
        <div className="rules-list-container animated fadeInUp">
            <div className="rules-list">
                <CardRules
                    ruleId="Test ID"
                    ruleName="Saint Lucia Weather rule 1"
                    blueBtnText="Update"
                />
                <CardRules
                    ruleId="Test ID"
                    ruleName="Saint Lucia Weather rule 1"
                    blueBtnText="Update"
                />
                <CardRules
                    ruleId="Test ID"
                    ruleName="Saint Lucia Weather rule 1"
                    blueBtnText="Update"
                />
                <CardRules
                    ruleId="Test ID"
                    ruleName="Saint Lucia Weather rule 1"
                    blueBtnText="Update"
                />
                <CardRules
                    ruleId="Test ID"
                    ruleName="Saint Lucia Weather rule 1"
                    blueBtnText="Update"
                />
                <CardRules
                    ruleId="Test ID"
                    ruleName="Saint Lucia Weather rule 1"
                    blueBtnText="Update"
                />
                <CardRules
                    ruleId="Test ID"
                    ruleName="Saint Lucia Weather rule 1"
                    blueBtnText="Update"
                />
                <CardRules
                    ruleId="Test ID"
                    ruleName="Saint Lucia Weather rule 1"
                    blueBtnText="Update"
                />
                <CardRules
                    ruleId="Test ID"
                    ruleName="Saint Lucia Weather rule 1"
                    blueBtnText="Update"
                />
                <CardRules
                    ruleId="Test ID"
                    ruleName="Saint Lucia Weather rule 1"
                    blueBtnText="Update"
                />
                <CardRules
                    ruleId="Test ID"
                    ruleName="Saint Lucia Weather rule 1"
                    blueBtnText="Update"
                />
                <CardRules
                    ruleId="Test ID"
                    ruleName="Saint Lucia Weather rule 1"
                    blueBtnText="Update"
                />
            </div>
        </div>
    </>
)

const RulesConfiguration = () => {

    const rulesTypeTest = ["Flight", "Weather"]
    const campaignTest = ["Campaign #1", "Campaign #2"]
    const mapsTest = ["Maps ID #1", "Maps ID #2"]

    return(
        <div className="rules-config-container animated fadeInUp">
        <div className="card-container">
            <div className="row">
                <label>Rule ID:</label>
                <input type="text" />
            </div>
            <div className="row">
                <label>Name:</label>
                <input type="text" />
            </div>
            <div className="rules-selects">
                <Select 
                    title="Rule Type"
                    elementsName="Rule Types"
                    isSelectable
                    options={rulesTypeTest}
                />
                <Select 
                    title="Campaigns"
                    elementsName="Campaigns"
                    isSelectable
                    options={campaignTest}
                />
            </div>
            <div className="rules-selects">
                <Select 
                    title="Maps"
                    elementsName="Maps"
                    isSelectable
                    options={mapsTest}
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

const RulesMyAccount = () => {
    const { data } = React.useContext(UserContext)
    const { tabs, activeTab, setActiveTab, isActiveTab } = useTabController([
        { name: 'Rules list', Component: RulesList },
        { name: 'My rules', Component: MyRules  },
        { name: 'Rules configuration', Component: RulesConfiguration  }
    ])
    const ActiveTab = activeTab()

    return(
        <div className="rules-section-container animated fadeInUp">
            <div className="rules-section-menu">
                <div className="rules-menu-box">
                    {
                        tabs().map((tab, index) => (
                            <button className={isActiveTab(index) ? 'active' : ''} onClick={() => setActiveTab(index)}> {tab.name} </button>
                        ))
                    }
                </div>
            </div>
            <ActiveTab.Component />
        </div>
    )
}

const RulesWizzard = () => (
    <div className="rules-section-container animated fadeInUp">
        <div className="rules-select-container animated fadeInUp">
            <div className="rules-list">
                <CardRules
                    ruleId="Test ID"
                    ruleName="Saint Lucia Weather rule 1"
                    blueBtnText="Select"
                />
                <CardRules
                    ruleId="Test ID"
                    ruleName="Saint Lucia Weather rule 1"
                    blueBtnText="Select"
                />
                <CardRules
                    ruleId="Test ID"
                    ruleName="Saint Lucia Weather rule 1"
                    blueBtnText="Select"
                />
                <CardRules
                    ruleId="Test ID"
                    ruleName="Saint Lucia Weather rule 1"
                    blueBtnText="Select"
                />
                <CardRules
                    ruleId="Test ID"
                    ruleName="Saint Lucia Weather rule 1"
                    blueBtnText="Select"
                />
                <CardRules
                    ruleId="Test ID"
                    ruleName="Saint Lucia Weather rule 1"
                    blueBtnText="Select"
                />
            </div>
        </div>
    </div>

)

export { RulesMyAccount, RulesWizzard }