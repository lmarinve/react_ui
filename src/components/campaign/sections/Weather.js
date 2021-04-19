import React from 'react'
import useTabController from '../../../_helpers/UseTabController'
import CardWeather from '../CardWeather'
import { Select } from '../Select'

const WeatherList = () =>{
    return(
        <div className="weather-list-container animated fadeInUp">
            <div className="weather-list">
                <CardWeather 
                    city="Chicago"
                />
                <CardWeather 
                    city="Miami"
                />
                <CardWeather 
                    city="Tampa"
                />
            </div>
        </div>
    )
}

const WeatherConfiguration = () =>{

    const campaignTest = ["campaign #1", "campaign #2"]
    const citiesTest = ["Chicago", "Miami", "New York", "Tampa"]

    return(
        <div className="weather-config-container animated fadeInUp">
            <div className="card-container">
                <div className="weather-selects">
                    <Select 
                        title="City"
                        elementsName="campaigns"
                        isSelectable
                        options={citiesTest}
                    />
                </div>
                <div className="weather-selects">
                    <Select 
                        title="Campaign"
                        elementsName="campaigns"
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

const Weather = () => {

    const { tabs, activeTab, setActiveTab, isActiveTab } = useTabController([
        { name: 'Weather list', Component: WeatherList },
        { name: 'Weather configuration', Component: WeatherConfiguration  }
    ])
    const ActiveTab = activeTab()

    return(
        <div className="weather-section-container">
             <div className="weather-section-menu">
                <div className="weather-menu-box">
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

export default Weather