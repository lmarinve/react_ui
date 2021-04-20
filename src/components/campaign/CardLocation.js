import React from 'react'

const CardLocation = ({locationId, country, city}) => {
    return(
        <div className="card-container">
            <div className="row">
                <label>Location ID:</label>
                <label>{locationId}</label>
            </div>
            <div className="row">
                <label>Country:</label>
                <label>{country}</label>
            </div>
            <div className="row">
                <label>City:</label>
                <label>{city}</label>
            </div>
            <div className="blue-btn-container">
                <button className="blue-btn">Update</button>
            </div>
        </div>
    )
}

export default CardLocation