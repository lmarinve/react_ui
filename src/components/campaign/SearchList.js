import React from 'react'

export default ({animation, searchPlaceholder}) => {
    return(
        <div className={`search-container ${animation}`}>
            <div className="search-box">
                <input type="text" placeholder={searchPlaceholder} className="search" description="Search Clients"/>
                <i className="search-icon fal fa-search" />
            </div>
        </div>
    )
}