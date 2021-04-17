import React from 'react'
import useTabController from '../../../_helpers/UseTabController'
import CardLocation from '../CardLocation'
import { Select } from '../Select'

const LocationList = () =>{
    return(
        <div className="location-list-container animated fadeInUp">
            <div className="location-list">
                <CardLocation 
                    locationId="Test location #1"
                    country="United States"
                    city="Chicago"
                />
                <CardLocation 
                    locationId="Test location #2"
                    country="United States"
                    city="Miami"
                />
                <CardLocation 
                    locationId="Test location #3"
                    country="United States"
                    city="New York"
                />
                <CardLocation 
                    locationId="Test location #3"
                    country="United States"
                    city="Los angeles"
                />
            </div>
        </div>
    )
}

const LocationConfiguration = () =>{
    const countriesTest = ["United States", "Canada", "Mexico"]
    const citiesTest = ["Chicago", "Miami", "New York", "Tampa"]

    return(
        <div className="location-config-container animated fadeInUp">
            <div className="card-container">
                <div className="row">
                    <label>Location ID:</label>
                    <input type="text" />
                </div>
                <div className="location-selects">
                    <Select 
                        title="Country"
                        elementsName="countries"
                        isSelectable
                        options={countriesTest}
                    />
                    <Select 
                        title="City"
                        elementsName="cities"
                        isSelectable
                        options={citiesTest}
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

const Location = () => {

    const { tabs, activeTab, setActiveTab, isActiveTab } = useTabController([
        { name: 'Location list', Component: LocationList },
        { name: 'Location configuration', Component: LocationConfiguration  }
    ])
    const ActiveTab = activeTab()

    return(
        <div className="location-section-container">
             <div className="location-section-menu">
                <div className="location-menu-box">
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

export default Location