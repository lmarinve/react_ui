import React from 'react'
import useTabController from '../../../_helpers/UseTabController'

const Flights = () => (
    <div className="collector-list-container animated fadeInUp">
        <div className="collector-list">
            <span><label>Atlanta to Vieux Fort</label></span>
            <span><label>Boston to Vieux Fort</label></span>
            <span><label>Charlotte to Vieux Fort</label></span>
            <span><label>Dallas to Vieux Fort</label></span>
            <span><label>London to Vieux Fort</label></span>
            <span><label>Miami to Vieux Fort</label></span>
            <span><label>New York to Vieux Fort</label></span>
            
        </div>
    </div>
)

const Weather = () => (
    <div className="collector-list-container animated fadeInUp">
        <div className="collector-list">
            <span><label>Sunny</label></span>
            <span><label>Partly Sunny</label></span>
            <span><label>Partly cloudly</label></span>
            <span><label>Sun & Rain</label></span>
            <span><label>Raining</label></span>
            <span><label>Thunderstorms</label></span>
            <span><label>Snowing</label></span>
            <span><label>Cloudly</label></span>
            <span><label>Windy</label></span>
            <span><label>Clear</label></span>
        </div>
    </div>
)

const Collector = () => {
    const { tabs, activeTab, isActiveTab, setActiveTab  } = useTabController([
        { name: 'Flights', Component: Flights},
        { name: 'Weather', Component: Weather}
    ])

    const ActiveTab = activeTab().Component

    return(
        <div className="collector-section-container animated fadeInUp">
            <div className="collector-section-menu">
                <div className="collector-menu-box">
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

export default Collector