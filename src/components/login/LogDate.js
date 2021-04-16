import React, { useState }from 'react'

const LogDate = ({animation}) => {

    const [date, setDate] = useState({ value: '' })
    const [display, setDisplay] = useState({ status: false, label: 'display-block', input: 'display-none'})

    const dateOnInput = (e) => {
        setDate({value: e.target.value}) 
    }

    const dateOnClick = () => {
        if(display.status === false){
            setDisplay({
                status: true, label: 'display-none', input: 'display-block'
            })
        } 
    }

    const dateOnBlur = () => {
        if(date.value === '' && display.status === true){
            setDisplay({status: false, label: 'display-block', input: 'display-none'})
        }
    }

    return(
        <div className={`date-group-container ${animation}`} tabIndex="1" onClick={dateOnClick} onMouseLeave={dateOnBlur}>
            <i className="date-group-icon far fa-calendar-alt" />
            <label className={`${display.label}`}>Date of Born</label>
            <input className={`${display.input}`} type="date" id="dateOfBorn" name="dateOfBorn" onInput={dateOnInput} />
        </div>
    )
}

export default LogDate