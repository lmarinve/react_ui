/* eslint-disable react/jsx-fragments */
import React from 'react'
import SearchList from '../SearchList'
import useTabController from '../../../_helpers/UseTabController'
import UserContext from '../../../Contexts/User'
import CardWeatherRules from '../CardWeatherRules'
import { Select } from '../Select'
import CardButton from '../../CardButton'
import CreateNewCard from '../CreateNewCard'
import useEntityHandler from '../../../_helpers/useEntityHandler'
import {
    getWeatherRules as getWeatherRulesRequest,
    createWeatherRule as createWeatherRuleRequest,
    updateWeatherRule as updateWeatherRuleRequest,
    removeWeatherRule as removeWeatherRuleRequest
} from '../../../_services'
import { useLoader } from '../../../_helpers/Loader'

const WeatherRulesList = ({ weatherRules, setEntity, setActiveTab, goToUpdateWeatherRule }) => (
    <div className="rules-list-container animated fadeInUp">
        <div className="rules-list">
            {
                weatherRules.length > 0
                  ? weatherRules.map((weatherRule, i) => (
                    <CardWeatherRules
                      key={UUIDGenerator()}
                      name={weatherRule.name}
                      priority={weatherRule.priority}
                      lowPrice={weatherRule.low_parameter}
                      highPrice={weatherRule.high_parameter}
                      percentChange={weatherRule.percentage_change}
                      blueBtnText="Update"
                      handleUpdate={() => goToUpdateWeatherRule(weatherRule)}
                      days={weatherRule.days}
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

const MyWeatherRules = ({ weatherRules, setEntity, setActiveTab, goToUpdateWeatherRule }) => (
    <>
        <SearchList animation="animated fadeInDown" searchPlaceholder="Search rules..." />
        <div className="rules-list-container animated fadeInUp">
            <div className="rules-list">
            {
                weatherRules.length > 0
                  ? weatherRules.map((weatherRule, i) => (
                    <CardWeatherRules
                      key={UUIDGenerator()}
                      name={weatherRule.name}
                      priority={weatherRule.priority}
                      lowPrice={weatherRule.low_parameter}
                      highPrice={weatherRule.high_parameter}
                      percentChange={weatherRule.percentage_change}
                      blueBtnText="Update"
                      handleUpdate={() => goToUpdateWeatherRule(weatherRule)}
                      days={weatherRule.days}
                    />
                  ))
                  : <CreateNewCard 
                    title='There are no weather rules' 
                    entity='Weather Rule' 
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

const WeatherRuleConfiguration = (props) => {
    const {
        adfluence_campaigns, weatherRules, token, entity, setEntity, setActiveTab,
        update, isThereActiveEntity, setAlert
    } = props
    const loaders = {
        'create': useLoader(),
        'update': useLoader(),
        'remove': useLoader()
    }
    const [weatherRule, setWeatherRule] = React.useState(() => {
        if (!isThereActiveEntity()) {
            return { 
                name: '',
                priority: null,
                connector: null,
                when: null,
                days: null,
                weather_trigger: null,
                low_parameter: null,
                logic: null,
                high_parameter: null,
                modifier_action: null,
                percentage_change: null,
                adfluenceCampaignId: null
            }
        } else {
            return { ...entity(), adfluenceCampaignId: entity().campaign }
        }
    })
    const handleChange = event => {
        setWeatherRule({
            ...weatherRule,
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
        setWeatherRule({
            ...weatherRule,
            connector: value
        })
    }
    const whenOptions = ["real_time", "forescast", "historical"]
    const handleWhenChange = value => {
        setWeatherRule({
            ...weatherRule,
            when: value
        })
    }
    const weatherTiggerOptions = ["temperature", "snow", "wind"]
    const handleWeatherTriggerChange = value => {
        setWeatherRule({
            ...weatherRule,
            weather_trigger: value
        })
    }
    const LogicOptions = ["<", "<=", ":", ">", ">="]
    const handleLogicChange = value => {
        setWeatherRule({
            ...weatherRule,
            logic: value
        })
    }
    const ModifierOptions = ["pause", "increase_budget", "decrease_budget"]
    const handleModifierChange = value => {
        setWeatherRule({
            ...weatherRule,
            modifier_action: value
        })
    }

    const [activeAdfluenceCampaign, setActiveAdfluenceCampaign] = React.useState(adfluence_campaigns.find(campaign => campaign.id === weatherRule.adfluenceCampaignId))
    const handleOptionsChange = value => {
        setWeatherRule({
          ...weatherRule,
          adfluenceCampaignId: adfluence_campaigns.find(campaign => campaign.name === value).id,
        })
        setActiveAdfluenceCampaign(adfluence_campaigns.find(campaign => campaign.name === value))
    }

    const canCreateOrUpdate = () => {
        return weatherRule.name &&
          weatherRule.priority &&
          weatherRule.connector &&
          weatherRule.when,
          weatherRule.days,
          weatherRule.weather_trigger,
          weatherRule.low_parameter &&
          weatherRule.high_parameter &&
          weatherRule.logic &&
          weatherRule.modifier_action &&
          weatherRule.percentage_change
    }

    const createWeatherRule = () => {
        if (canCreateOrUpdate()) {
            loaders['create'].loading()
            createWeatherRuleRequest(token, weatherRule)
              .then(responseHandler.bind(this, 'The weather rule was succesfully created!!'))
              .catch(console.error)
              .finally(loaders['create'].loaded)
        }

        return 0
    }
    const updateWeatherRule = () => {
        if (canCreateOrUpdate()) {
            loaders['update'].loading()
            updateWeatherRuleRequest(token, weatherRule)
              .then(responseHandler.bind(this, 'The weather rule was succesfully updated!'))
              .catch(console.error)
              .finally(loaders['update'].loaded)
        }

        return 0
    }
    const removeWeatherRule = () => {
        removeWeatherRuleRequest(token, weatherRule.id)
          .then(responseHandler.bind(this, 'The weather rule was removed'))
          .catch(console.error)
          .finally(loaders['remove'].loaded)
    }

    return(
        <div className="rules-config-container animated fadeInUp">
            <div className="card-container">
                <div className="row">
                    <div className="box">
                        <label>Name:</label>
                        <input type="text" name='name' defaultValue={weatherRule.name} onInput={handleChange} />
                    </div>
                    <div className="mid">
                        <label>Priority:</label>
                        <input type="text" name='priority' defaultValue={weatherRule.priority} onInput={handleChange} />
                    </div>
                    <div className="box">
                        <Select 
                          title="Connector"
                          elementsName="Connectors"
                          isSelectable
                          options={connectorOptions}
                          activeOption={weatherRule.connector}
                          handleOptionsChange={handleConnectorChange}
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
                          activeOption={weatherRule.when}
                          handleOptionsChange={handleWhenChange}
                        />
                    </div>
                    <div className="mid">
                        <label>Days:</label>
                        <input type="text" name='days' defaultValue={weatherRule.days} onInput={handleChange} />
                    </div>
                    <div className="box">
                        <Select 
                          title="Weather tigger"
                          elementsName="weather tiggers"
                          isSelectable
                          options={weatherTiggerOptions}
                          activeOption={weatherRule.weather_trigger}
                          handleOptionsChange={handleWeatherTriggerChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="box">
                        <label>Low parameter:</label>
                        <input type="text" name='low_parameter' defaultValue={weatherRule.low_parameter} onInput={handleChange} />
                    </div>
                    <div className="mid">
                        <Select 
                          title="Logic"
                          elementsName="Opers"
                          isSelectable
                          options={LogicOptions}
                          activeOption={weatherRule.logic}
                          handleOptionsChange={handleLogicChange}
                        />
                    </div>
                    <div className="box">
                        <label>High parameter:</label>
                        <input type="text" name='high_parameter' defaultValue={weatherRule.high_parameter} onInput={handleChange} />
                    </div>
                </div>
                <div className="row">
                    <Select 
                      title="Modifier action"
                      elementsName="Modifier actions"
                      isSelectable
                      options={ModifierOptions}
                      activeOption={weatherRule.modifier_action}
                      handleOptionsChange={handleModifierChange}
                    />
                    <div className="mid">
                        <label>% change:</label>
                        <input type="text" name='percentage_change' defaultValue={weatherRule.percentage_change} onInput={handleChange} />
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
                    ? <CardButton text='Create' iconClassName='far fa-file-plus' handleClick={createWeatherRule} isLoading={loaders['create'].isLoading} />
                    // eslint-disable-next-line react/jsx-fragments
                    : <> 
                        <CardButton text='Update' iconClassName='fas fa-sync-alt' isLoading={loaders['update'].isLoading} handleClick={updateWeatherRule} />
                        <CardButton text='Delete' iconClassName='fas fa-trash-alt' isLoading={loaders['remove'].isLoading} handleClick={removeWeatherRule} />
                      </>
                }
            </div>
        </div>
    )
}

const WeatherRulesMyAccount = ({ setAlert }) => {
    const token = localStorage.getItem('token')
    const { data, setData } = React.useContext(UserContext)
    const { weatherRules, adfluence_campaigns } = data
    const { tabs, activeTab, setActiveTab, isActiveTab, activeIndex } = useTabController([
        { name: 'Weather rules list', Component: WeatherRulesList },
        { name: 'My weather rules', Component: MyWeatherRules  },
        { name: 'Weather rule configuration', Component: WeatherRuleConfiguration  }
    ])
    const ActiveTab = activeTab()
    const { entity, setEntity, isThereActiveEntity } = useEntityHandler({})
    const setMyWeatherRulesAsActive = () => {
        return getWeatherRulesRequest(token) 
          .then((response) => {
              setData({
                  ...data,
                  weatherRules: response.data
              })
              setActiveTab(1)
          })
    }
    const goToUpdateWeatherRule = (weatherRule) => {
        setEntity(weatherRule)
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
              weatherRules={weatherRules}
              adfluence_campaigns={adfluence_campaigns}
              entity={entity}
              setEntity={setEntity}
              setActiveTab={setActiveTab}
              update={setMyWeatherRulesAsActive}
              setAlert={setAlert}
              isThereActiveEntity={isThereActiveEntity}
              goToUpdateWeatherRule={goToUpdateWeatherRule}
            />
        </div>
    )
}

const WeatherRulesWizzard = () => (
    <div className="rules-section-container animated fadeInUp">
        <div className="rules-select-container animated fadeInUp">
            <div className="rules-list">
            <CardWeatherRules
              name="Saint Lucia Weather rule 1"
              priority="1"
              days="10"
              lowPrice="5$"
              highPrice="20$" 
              percentChange="2"
              blueBtnText="Select"
            />
                <CardWeatherRules
                  name="Saint Lucia Weather rule 1"
                  priority="1"
                  days="10"
                  lowPrice="5$"
                  highPrice="20$" 
                  percentChange="2"
                  blueBtnText="Select"
                />
                <CardWeatherRules
                  name="Saint Lucia Weather rule 1"
                  priority="1"
                  days="10"
                  lowPrice="5$"
                  highPrice="20$" 
                  percentChange="2"
                  blueBtnText="Select"
                />
                <CardWeatherRules
                  name="Saint Lucia Weather rule 1"
                  priority="1"
                  days="10"
                  lowPrice="5$"
                  highPrice="20$" 
                  percentChange="2"
                  blueBtnText="Select"
                />
            </div>
        </div>
    </div>

)

export { WeatherRulesMyAccount, WeatherRulesWizzard }