import React, { useState } from 'react'

const LogSelect = ({title, animation, icon, elementsName, options, value, onChange}) => {
    const [show, setShow] = useState({status: false, list: "", icon: "", border: ""})

    const onBlur = () => {
        if(show.status === true){
            setShow({status: false, list: "", icon: "", border: ""})
        }
    }

    const onClick = () => {
       if(show.status === false){
            setShow({status: true, list: "deploy", icon: "rotate", border: "red-border"})
        }
       else{
            setShow({status: false, list: "", icon: "", border: ""})
       }
    }

    const handleOptionChange = (e, value) => {
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        onChange(value)
        setShow({status: false, list: "", icon: "", border: ""})
    }

    return(
        <div className="select-group-container" onClick={onClick} onMouseLeave={onBlur}>
            <div className={`select-group ${animation} ${show.border}`}>
                <i className={`select-group-icon-l ${icon}`} />
                <label>{value || title}</label>
                <div className={`select-group-icon-r ${show.icon}`}>
                    <i className="fas fa-angle-right" />                
                </div>
            </div>
            <div className={`option-container ${show.list}`}>
                {
                    options.length
                    ? options.map((element, i) => (
                        <label key={i} onClick={(e) => handleOptionChange(e, element)}>{element}</label>
                    ))
                    : <label> There are no {elementsName} </label>
                }
            </div>
        </div>
    )
}

export default LogSelect