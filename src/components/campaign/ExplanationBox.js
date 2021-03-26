import React from 'react'

const ExplanationBox = (props) => {
    const {title, text} = props
    return(
        <div className="explanation-container">
            <span className="explanation-header" >Explain this section<i className="explanation-icon fas fa-caret-up"></i></span>
            <div className="explanation-body">
                <h1>{title}</h1>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default ExplanationBox