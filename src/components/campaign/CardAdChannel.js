import React from 'react'

import GoogleLogo from '../../images/G-Logo.png'


const CardAdChannel = (props) =>{
    const {AdChannelId, AdChannelName, AdChannelBudget, AdGroupId, AdAccountId, BaseAdId, AdId, AdCreativeId, PixelId, Headline, injectionId1, injectionId2, injectionId3, injectionId4, injectionId5, injectionId6, injectionId7, injectionId8, injectionId9} = props
    return(
        <div className="card-container">
            <div className="ad-initial-container">
                <div className="left">
                    <div className="row">   
                        <label>Ad channel ID:</label>
                        <label>{AdChannelId}</label>
                    </div>
                    <div className="row">
                        <label>Name:</label>
                        <label>{AdChannelName}</label>
                    </div>
                    <div className="row">
                        <label>Base budget:</label>
                        <label>${AdChannelBudget}</label>
                    </div>
                    <div className="row">
                        <label>Ad group ID:</label>
                        <label>{AdGroupId}</label>
                    </div>
                    <div className="row">
                        <label>Ad account ID:</label>
                        <label>{AdAccountId}</label>
                    </div>
                </div>
                <div className="right">
                    <div className="row">
                        <label>Base ad ID:</label>
                        <label>{BaseAdId}</label>
                    </div>
                    <div className="row">
                        <label>Ad ID:</label>
                        <label>{AdId}</label>
                    </div>
                    <div className="row">
                        <label>Ad creative ID:</label>
                        <label>{AdCreativeId}</label>
                    </div>
                    <div className="row">
                        <label>Pixel ID:</label>
                        <label>{PixelId}</label>
                    </div>
                    <div className="row">
                        <label>Headline:</label>
                        <label>{Headline}</label>
                    </div>
                </div>
            </div>
            <div className="ad-channel-selects">
                <div className="select-container">
                    <button className="select-btn">
                        Copy injection
                        <i className="select-icon fas fa-angle-down"></i>
                    </button>
                    <div className="list-container">
                        <div className="row"><input type="checkbox" id={injectionId1}/><label className="injection-option" htmlFor={injectionId1}>Airfare</label></div>
                        <div className="row"><input type="checkbox" id={injectionId2}/><label className="injection-option" htmlFor={injectionId2}>Airline</label></div>
                        <div className="row"><input type="checkbox" id={injectionId3}/><label className="injection-option" htmlFor={injectionId3}>Destination city name</label></div>
                        <div className="row"><input type="checkbox" id={injectionId4}/><label className="injection-option" htmlFor={injectionId4}>Destination airport code</label></div>
                        <div className="row"><input type="checkbox" id={injectionId5}/><label className="injection-option" htmlFor={injectionId5}>Origin temperature</label></div>
                        <div className="row"><input type="checkbox" id={injectionId6}/><label className="injection-option" htmlFor={injectionId6}>Destination temperature</label></div>
                        <div className="row"><input type="checkbox" id={injectionId7}/><label className="injection-option" htmlFor={injectionId7}>Snow</label></div>
                        <div className="row"><input type="checkbox" id={injectionId8}/><label className="injection-option" htmlFor={injectionId8}>Origin city name</label></div>
                        <div className="row"><input type="checkbox" id={injectionId9}/><label className="injection-option" htmlFor={injectionId9}>Destination city name</label></div>
                    </div>
                </div>
                <div className="select-container">
                    <button className="select-btn">
                        City
                        <i className="select-icon fas fa-angle-down"></i>
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
                        <i className="select-icon fas fa-angle-down"></i>
                    </button>
                    <div className="list-container channel-type">
                        <label><img className="google-icon" src={GoogleLogo} />Google</label>
                        <label><i className="facebook-icon fab fa-facebook-f"></i>Facebook</label>
                    </div>
                </div>
                <div className="select-container">
                    <button className="select-btn">
                        Action type
                        <i className="select-icon fas fa-angle-down"></i>
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
                        <i className="select-icon fas fa-angle-down"></i>
                    </button>
                    <div className="list-container">
                        <label>Campaign #1</label>
                        <label>Campaign #2</label>
                    </div>
                </div>
                <div className="select-container">
                    <button className="select-btn">
                        Rules
                        <i className="select-icon fas fa-angle-down"></i>
                    </button>
                    <div className="list-container">
                        <label>Rules #1</label>
                        <label>Rules #2</label>
                    </div>
                </div>
            </div>
            <div className="blue-btn-container">
                <button className="blue-btn">Update</button>
            </div>
        </div>
    )
}

export default CardAdChannel
