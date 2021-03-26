import React from 'react'

const Types = (props) => {
    const {typeIcon, typeTitle} = props
    return(
        <div className={"types animated fadeInRight"}>
            <i className={typeIcon}></i>
            <div className="title">{typeTitle}</div>
        </div>
    )
}

export default Types