import React from 'react'

const ErrorView = () => {
    return(
        <div className="error-box animated wobble">
            <p>An error has occurred</p>
            <i className="error-icon far fa-dizzy" />
            <p>Please reload the page and try it again</p>
        </div>
    )
}

export default ErrorView