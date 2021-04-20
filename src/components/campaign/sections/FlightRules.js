/* eslint-disable react/jsx-fragments */
import React from 'react'
import SearchList from '../SearchList'
import useTabController from '../../../_helpers/UseTabController'
import UserContext from '../../../Contexts/User'
import CardFlightRules from '../CardFlightRules'
import { Select } from '../Select'
import CardButton from '../../CardButton'
import CreateNewCard from '../CreateNewCard'
import useEntityHandler from '../../../_helpers/useEntityHandler'
import {
    getFlightRules as getFlightRulesRequest,
    createFlightRule as createFlightRuleRequest,
    updateFlightRule as updateFlightRuleRequest,
    removeFlightRule as removeFlightRuleRequest
} from '../../../_services'
import { useLoader } from '../../../_helpers/Loader'

const FlightRulesList = ({ flightRules, setEntity, setActiveTab, goToUpdateFlightRule }) => (
    <div className="rules-list-container animated fadeInUp">
        <div className="rules-list">
            {
                flightRules.length > 0
                  ? flightRules.map((flightRule, i) => (
                    <CardFlightRules
                      key={UUIDGenerator()}
                      name={flightRule.name}
                      priority={flightRule.priority}
                      lowPrice={flightRule.low_price}
                      highPrice={flightRule.high_price}
                      percentChange={flightRule.percentage_change}
                      blueBtnText="Update"
                      handleUpdate={() => goToUpdateFlightRule(flightRule)}
                    />
                  ))
                  : <CreateNewCard 
                    title='There are no flight rules' 
                    entity='Flight Rule' 
                    handleClick={() => {
                          setEntity({})
                          setActiveTab(2)
                      }}
                    />
            }
        </div>
    </div>
)

const MyFlightRules = ({ flightRules, setEntity, setActiveTab, goToUpdateFlightRule }) => (
    <>
        <SearchList animation="animated fadeInDown" searchPlaceholder="Search rules..." />
        <div className="rules-list-container animated fadeInUp">
            <div className="rules-list">
            {
                flightRules.length > 0
                  ? flightRules.map((flightRule) => (
                    <CardFlightRules
                      key={UUIDGenerator()}
                      name={flightRule.name}
                      priority={flightRule.priority}
                      lowPrice={flightRule.low_price}
                      highPrice={flightRule.high_price}
                      percentChange={flightRule.percentage_change}
                      blueBtnText="Update"
                      handleUpdate={() => goToUpdateFlightRule(flightRule)}
                    />
                  ))
                  : <CreateNewCard 
                    title='There are no flight rules' 
                    entity='Flight Rule' 
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

const FlightRuleConfiguration = (props) => {
    const {
        adfluence_campaigns, flightRules, token, entity, setEntity, setActiveTab,
        update, isThereActiveEntity, setAlert
    } = props
    const loaders = {
        'create': useLoader(),
        'update': useLoader(),
        'remove': useLoader()
    }
    const [flightRule, setFlightRule] = React.useState(() => {
        if (!isThereActiveEntity()) {
            return { 
                name: '',
                priority: null,
                connector: null,
                low_price: null,
                logic: null,
                high_price: null,
                modifier_action: null,
                percentage_change: null,
                adfluenceCampaignId: null
            }
        } else {
            return { ...entity(), adfluenceCampaignId: entity().campaign }
        }
    })
    const handleChange = event => {
        setFlightRule({
            ...flightRule,
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

    const connectorOptions = ["none", "and", "or"]
    const handleConnectorChange = value => {
        setFlightRule({
            ...flightRule,
            connector: value
        })
    }
    const LogicOptions = ["<", "<=", ":", ">", ">="]
    const handleLogicChange = value => {
        setFlightRule({
            ...flightRule,
            logic: value
        })
    }
    const ModifierOptions = ["pause", "increase_budget", "decrease_budget"]
    const handleModifierChange = value => {
        setFlightRule({
            ...flightRule,
            modifier_action: value
        })
    }

    const canCreateOrUpdate = () => {
        return flightRule.name &&
          flightRule.priority &&
          flightRule.connector &&
          flightRule.low_price &&
          flightRule.high_price &&
          flightRule.logic &&
          flightRule.modifier_action &&
          flightRule.percentage_change
    }

    const createFlightRule = () => {
        if (canCreateOrUpdate()) {
            loaders['create'].loading()
            createFlightRuleRequest(token, flightRule)
              .then(responseHandler.bind(this, 'The flight rule was succesfully created!!'))
              .catch(console.error)
              .finally(loaders['create'].loaded)
        }

        return 0
    }
    
    const updateFlightRule = () => {
        if (canCreateOrUpdate()) {
            loaders['update'].loading()
            updateFlightRuleRequest(token, flightRule)
              .then(responseHandler.bind(this, 'The flight rule was succesfully updated!'))
              .catch(console.error)
              .finally(loaders['update'].loaded)
        }

        return 0
    }

    const removeFlightRule = () => {
        removeFlightRuleRequest(token, flightRule.id)
          .then(responseHandler.bind(this, 'The flight rule was removed'))
          .catch(console.error)
          .finally(loaders['remove'].loaded)
    }

    const [activeAdfluenceCampaign, setActiveAdfluenceCampaign] = React.useState(adfluence_campaigns.find(campaign => campaign.id === flightRule.adfluenceCampaignId))
    const handleOptionsChange = value => {
        setFlightRule({
          ...flightRule,
          adfluenceCampaignId: adfluence_campaigns.find(campaign => campaign.name === value).id,
        })
        setActiveAdfluenceCampaign(adfluence_campaigns.find(campaign => campaign.name === value))
    }
     
    
    return(
        <div className="rules-config-container animated fadeInUp">
            <div className="card-container">
                <div className="row">
                    <div className="box">
                        <label>Name:</label>
                        <input type="text" name='name' defaultValue={flightRule.name} onInput={handleChange} />
                    </div>
                    <div className="mid">
                        <label>Priority:</label>
                        <input type="text" name='priority' defaultValue={flightRule.priority} onInput={handleChange} />
                    </div>
                    <div className="box">
                        <Select 
                          title="Connector"
                          elementsName="Connectors"
                          isSelectable
                          options={connectorOptions}
                          activeOption={flightRule.connector}
                          handleOptionsChange={handleConnectorChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="box">
                        <label>Low price:</label>
                        <input type="text" name='low_price' defaultValue={flightRule.low_price} onInput={handleChange} />
                    </div>
                    <div className="mid">
                        <Select 
                          title="Logic"
                          elementsName="Opers"
                          isSelectable
                          options={LogicOptions}
                          activeOption={flightRule.logic}
                          handleOptionsChange={handleLogicChange}
                        />
                    </div>
                    <div className="box">
                        <label>High price:</label>
                        <input type="text" name='high_price' defaultValue={flightRule.high_price} onInput={handleChange} />
                    </div>
                </div>
                <div className="row">
                    <Select 
                      title="Modifier action"
                      elementsName="Modifier actions"
                      isSelectable
                      options={ModifierOptions}
                      activeOption={flightRule.modifier_action}
                      handleOptionsChange={handleModifierChange}
                    />
                    <div className="mid">
                        <label>% change:</label>
                        <input type="text" name='percentage_change' defaultValue={flightRule.percentage_change} onInput={handleChange} />
                    </div>
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
                    ? <CardButton text='Create' iconClassName='far fa-file-plus' handleClick={createFlightRule} isLoading={loaders['create'].isLoading} />
                    // eslint-disable-next-line react/jsx-fragments
                    : <> 
                        <CardButton text='Update' iconClassName='fas fa-sync-alt' isLoading={loaders['update'].isLoading} handleClick={updateFlightRule} />
                        <CardButton text='Delete' iconClassName='fas fa-trash-alt' isLoading={loaders['remove'].isLoading} handleClick={removeFlightRule} />
                      </>
                }
            </div>
        </div>
    )
}

const FlightRulesMyAccount = ({ setAlert }) => {
    const token = localStorage.getItem('token')
    const { data, setData } = React.useContext(UserContext)
    const { flightRules, adfluence_campaigns } = data
    const { tabs, activeTab, setActiveTab, isActiveTab,activeIndex } = useTabController([
        { name: 'Flight rules list', Component: FlightRulesList },
        { name: 'My flight rules', Component: MyFlightRules  },
        { name: 'Flight rule configuration', Component: FlightRuleConfiguration  }
    ])
    const ActiveTab = activeTab()
    const { entity, setEntity, isThereActiveEntity } = useEntityHandler({})
    const setMyFlightsRulesAsActive = () => {
        return getFlightRulesRequest(token) 
          .then((response) => {
              setData({
                  ...data,
                  flightRules: response.data
              })
              setActiveTab(1)
          })
    }
    const goToUpdateFlightRule = (flightRule) => {
        setEntity(flightRule)
        setActiveTab(2)
    }

    return(
        <div className="rules-section-container animated fadeInUp">
            <div className="rules-section-menu">
                <div className="rules-menu-box">
                    {
                        tabs().map((tab, index) => (
                            <button 
                              key={UUIDGenerator()} 
                              className={isActiveTab(index) ? 'active' : ''} 
                              onClick={() => {
                                  if (index === activeIndex())
                                    return 0

                                  if (index === 2)
                                      setEntity({})

                                  return setActiveTab(index)
                              }}
                            > 
                              {tab.name} 
                            </button>
                        ))
                    }
                </div>
            </div>
            <ActiveTab.Component
              token={token}
              flightRules={flightRules}
              adfluence_campaigns={adfluence_campaigns}
              entity={entity}
              setEntity={setEntity}
              setActiveTab={setActiveTab}
              update={setMyFlightsRulesAsActive}
              setAlert={setAlert}
              isThereActiveEntity={isThereActiveEntity}
              goToUpdateFlightRule={goToUpdateFlightRule}
            />
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