import React, { useState } from 'react'


const Select = ({title, isSelectable, elementsName, options}) => {
    let selectableStatus = ''
    const [show, setShow] = useState({status: false, list: "", icon: ""})

    if(isSelectable){
        selectableStatus = "selectable"
    }

    const onBlur = () => {
        if(show.status === true){
            setShow({status: false, list: "", icon: ""})
        }
    }

    const onClick = () => {
       if(show.status === false){
            setShow({status: true, list: "deploy", icon: "rotate"})
        }
       else{
            setShow({status: false, list: "", icon: ""})
       }
    }


    return(
        <div className={`select-container ${selectableStatus}`} onClick={onClick} onMouseLeave={onBlur}>
            <button className="select-btn">
                {title}
                <div className={`select-icon-container ${show.icon}`}>
                    <i className={`fas fa-angle-right`} />
                </div>
            </button>
            <div className={`list-container ${show.list}`}>
            {
                options.length
                ? options.map((element, i) => (
                    <label className="" key={i}>{element}</label>
                ))
                : <label> There are no {elementsName} </label>
            }
            </div>
        </div>
    )
}

const SelectCheckbox = ({title, isSelectable, elementsName, options}) => {
    let selectableStatus = ''
    const [show, setShow] = useState({status: false, list: "", icon: ""})

    if(isSelectable){
        selectableStatus = "selectable"
    }

    const onBlur = () => {
        if(show.status === true){
            setShow({status: false, list: "", icon: ""})
        }
    }

    const onClick = () => {
       if(show.status === false){
            setShow({status: true, list: "deploy", icon: "rotate"})
        }
       else{
            setShow({status: false, list: "", icon: ""})
       }
    }

    return(
        <div className={`select-container ${selectableStatus}`} onClick={onClick} onMouseLeave={onBlur}>
            <button className="select-btn" >
                {title}
                <div className={`select-icon-container ${show.icon}`}>
                    <i className={`fas fa-angle-right`} />
                </div>
            </button>
            <div className={`list-container ${show.list}`}>
            {
                options.length
                ? options.map((element, i) => (
                    <div key={i} className="row"><input type="checkbox"/><label className="check-option">{element}</label></div>
                ))
                : <label> There are no {elementsName} </label>
            }
            </div>
        </div>
    )
}

export {Select, SelectCheckbox}